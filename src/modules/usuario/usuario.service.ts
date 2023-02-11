import { Injectable, BadRequestException } from '@nestjs/common';
import { IBaseDeDatosAbstract } from '../../framework/database/mysql/core/abstract/base_de_datos.abstract';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { IniciarSesionDto } from './dto/iniciar_sesion.dto';
import { EnvConfiguration } from '../../config/env.config';
import { RegistrosDeUsuarios } from '../../framework/database/mysql/entities/registros_de_usuarios.entity';
import { CerrarSesionDto } from './dto/cerrar-sesion.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import * as excel from 'exceljs';
import { Usuario } from '../../framework/database/mysql/entities/usuario.entity';

@Injectable()
export class UsuarioService {
   
    constructor(
        private readonly baseDeDatos: IBaseDeDatosAbstract,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService
    ) {}

    
    public async registrarUsuario(usuario: CrearUsuarioDto): Promise<Object> {
        const usuarioARegistrar = await this.baseDeDatos.usuario.registrarUsuario(usuario, this.mailerService);
        return usuarioARegistrar;
    }

    public async confirmarCuenta(codigoDeVerificacion: string) {
        const usuario = await this.baseDeDatos.usuario.confirmarCuenta(codigoDeVerificacion);
        return usuario;
    }


    public async iniciarSesion(usuario: IniciarSesionDto, clientIp: string): Promise<Object> {
        const usuarioAIniciarSesion = await this.baseDeDatos.usuario.iniciarSesion(usuario, this.jwtService);
        // @ts-ignore
        const {token_auth, id, is_admin} = usuarioAIniciarSesion;
        await this.guardarInformacionDelToken(token_auth, clientIp, id);
        return {
            token: token_auth,
            msj: 'Sesión iniciada correctamente',
            is_admin
        };

    }

    public async cerrarSesion(token: string): Promise<Object> {
        const existeToken: RegistrosDeUsuarios = await this.baseDeDatos.registrosDeUsuarios.findOne({ where: { token } }, 'Tokem');
        if(existeToken){
            if (existeToken.fecha_salida !== null) {
                throw new BadRequestException('El token ya fue cerrado');
            }
            await this.baseDeDatos.registrosDeUsuarios.update(+existeToken.id, { fecha_salida: new Date() });
            return { msj: 'Sesión cerrada correctamente' };
        }

        throw new BadRequestException('El token no existe');
        
    }

    recuperarTodosLosUsuarios() {
        return this.baseDeDatos.usuario.findAll();
    }



    async exportarSesiones(id_usuario: number) {
        const user: Usuario = await this.baseDeDatos.usuario.findOne({ where: { id: id_usuario } }, 'Usuario');
        const sesiones_del_usuario : RegistrosDeUsuarios[] = await this.baseDeDatos.registrosDeUsuarios.findBy({ id_usuario }, {});
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sesiones');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Apellido', key: 'apellido', width: 30 },
            { header: 'Correo', key: 'correo', width: 30 },
            { header: 'Fecha de ingreso', key: 'fecha_ingreso', width: 30 },
            { header: 'Fecha de expiración', key: 'fecha_expiracion', width: 30 },
            { header: 'IP', key: 'ip', width: 30 },
        ];

        sesiones_del_usuario.forEach((sesion) => {
            worksheet.addRow({
                id: sesion.id,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                fecha_ingreso: sesion.fecha_ingreso,
                fecha_expiracion: sesion.fecha_expiracion,
                ip: sesion.ip
            });
        });

        return workbook;

    }


    async exportarSesionesTodos() {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sesiones de todos los usuarios');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Apellido', key: 'apellido', width: 30 },
            { header: 'Correo', key: 'correo', width: 30 },
            { header: 'Fecha de ingreso', key: 'fecha_ingreso', width: 30 },
            { header: 'Fecha de expiración', key: 'fecha_expiracion', width: 30 },
            { header: 'IP', key: 'ip', width: 30 },
        ];

        const sesionesDeTodosLosUsuarios: Object[] = await this.baseDeDatos.registrosDeUsuarios.findBy({}, {});
        
        sesionesDeTodosLosUsuarios.forEach( async (sesion) => {
            // @ts-ignore
            const {fecha_ingreso, fecha_expiracion, ip} = sesion;
            // @ts-ignore
            const {id, nombre, apellido, correo} = sesion.id_usuario;
            

            worksheet.addRow({ id, nombre, apellido, correo, fecha_ingreso, fecha_expiracion, ip });
        });

        return workbook;

    }



    actualizarDatos(crearUsuarioDto: ActualizarUsuarioDto, id: number) {
        const {nro_documento, ...usuarioAActualizar} = crearUsuarioDto;
        return this.baseDeDatos.usuario.update(+id, usuarioAActualizar);
    }


    private async guardarInformacionDelToken(token: string, clientIp: string, id: number ) {
        // @ts-ignore
        const { exp } = await this.obtenerInformacionDelToken(token);

        await this.baseDeDatos.registrosDeUsuarios.create({
            fecha_ingreso: ((new Date())), 
            fecha_expiracion: ((new Date(exp * 1000))), 
            ip: clientIp, 
            token, 
            id_usuario: id 
        });

    }

    private async obtenerInformacionDelToken(token: string) {
        // @ts-ignore
        const { exp, uuid } = this.jwtService.verify(token, EnvConfiguration().jwtSecret);
        return { exp, uuid };
    }

}