import { Injectable, BadRequestException } from '@nestjs/common';
import { IBaseDeDatosAbstract } from '../../framework/database/mysql/core/abstract/base_de_datos.abstract';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { IniciarSesionDto } from './dto/iniciar_sesion.dto';
import { EnvConfiguration } from '../../config/env.config';
import { RegistrosDeUsuarios } from '../../framework/database/mysql/entities/registros_de_usuarios.entity';
import { CerrarSesionDto } from './dto/cerrar-sesion.dto';


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
        console.log('====================================');
        const usuario = await this.baseDeDatos.usuario.confirmarCuenta(codigoDeVerificacion);
        return usuario;
    }

    public async iniciarSesion(usuario: IniciarSesionDto, clientIp: string): Promise<Object> {
        const usuarioAIniciarSesion = await this.baseDeDatos.usuario.iniciarSesion(usuario, this.jwtService);
        // @ts-ignore
        const {token_auth, id} = usuarioAIniciarSesion;
        await this.guardarInformacionDelToken(token_auth, clientIp, id);
        return {
            token: token_auth,
            msj: 'Sesión iniciada correctamente',

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