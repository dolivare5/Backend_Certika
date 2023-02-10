import { Injectable, Patch } from '@nestjs/common';
import { MysqlRepositorioGenerico } from './';
import { IRepositorioUsuario } from '../core/abstract';
import { DeepPartial } from 'typeorm';
import { CrearUsuarioDto } from '../../../../modules/usuario/dto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';
import { generateCodeAuth } from '../../../../helpers/generateCodeAuth';
import { Usuario } from '../entities/';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvConfiguration } from "src/config/env.config";
import { methods, SendEmailInterface } from '../../../../modules/mail/interfaces/sendMail.interface';
import { IniciarSesionDto } from '../../../../modules/usuario/dto/iniciar_sesion.dto';
import { JwtPayload } from '../../../../modules/usuario/interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class MysqlRepositorioUsuario<T> extends MysqlRepositorioGenerico<T> implements IRepositorioUsuario<T>{
    public async registrarUsuario(usuario: DeepPartial<T>, mailerService: MailerService): Promise<Object> {
        const { password, ...datosDelUsuario } = usuario as CrearUsuarioDto;
        console.log('====================================');
        console.log('datosDelUsuario', datosDelUsuario);
        console.log('====================================');
        // @ts-ignore
        const existTypeDocument = (await this.executeQuery(`SELECT * FROM valor_parametro WHERE id = ${datosDelUsuario.id_tipo_documento}`))[0];
        if(existTypeDocument){
            if(!(await this.existsUser(usuario))){
                const usuarioARegistrar ={
                    ...datosDelUsuario,
                    codigo_de_verificacion: generateCodeAuth(),
                    codigo_de_usuario: this.generateCodeUuId(),
                    password: bcrypt.hashSync(password, 10),
                    estado: 1,
                    id_rol: 1
                };
                // @ts-ignore
                await this.create(usuarioARegistrar);
                delete usuarioARegistrar.password;
                const mail : SendEmailInterface = {
                    mail: usuarioARegistrar.correo,
                    from_email: `Equipo de desarrollo <${EnvConfiguration().emailFrom}>`,
                    action: 'confirmar_cuenta',
                    subject: 'Un paso más para completar tu registro en Library Store! Confirma tu correo',
                    template: 'account_confirmation',
                    name: usuarioARegistrar.nombre,
                    codigo_de_verificacion: usuarioARegistrar.codigo_de_verificacion,
                    method: methods.patch
                }
        
                await this.sendMail(mail, mailerService);
                return { usuario: usuarioARegistrar, message: 'Usuario registrado exitosamente, revise su correo para confirmar su cuenta'};
            }
        }
    }

    public async iniciarSesion(usuario: DeepPartial<T>, jwtService: JwtService): Promise<Object> {
        const { correo, password, token } = usuario as IniciarSesionDto;
        let usuarioAIniciarSesion: Usuario;
        if(correo && password){
            // @ts-ignore
            usuarioAIniciarSesion = await this.findOne({ where: { correo}}) as Usuario;
            if(!usuarioAIniciarSesion || !bcrypt.compareSync(password, usuarioAIniciarSesion.password)){
                throw new Error('Datos de inicio de sesión incorrectos');
            }
            // @ts-ignore
            if(usuarioAIniciarSesion.estado !== 1){
                this.exceptions.forbiddenException({ message:'Su cuenta no ha sido eliminada o desactivada. Por favor, contacte con el administrador del sistema'});
            }
        }

        if(token){
            // Verificar si el token es válido y si pertenece a un usuario de google o facebook
        }

        const token_auth = this.getToken({uuid: usuarioAIniciarSesion.uuid}, jwtService);
        delete usuarioAIniciarSesion.password;
        return { ...usuarioAIniciarSesion, token_auth };

    }
    public updateUser(user: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public deleteUser(user: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public getUser(user: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public getUsers(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    public getUserByToken(token: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public async existsUser(user: DeepPartial<T>): Promise<boolean> {
        const { correo, nombre, apellido, nro_documento } = user as Usuario;
        const exist = await this.executeQuery(`
            SELECT * FROM usuario 
            WHERE correo = '${correo}' 
            OR (nombre = '${nombre}' AND apellido = '${apellido}'
            OR nro_documento = '${nro_documento}')
        `)
        return exist.length > 0;
    }
    public exportUsers(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    

    public async confirmarCuenta(codigoDeVerificacion: string): Promise<Object> {
        const usuario = (await this.executeQuery(`
            SELECT * FROM usuario 
            WHERE codigo_de_verificacion = '${codigoDeVerificacion}'
        `))[0] as Usuario;

        if(usuario){
            // @ts-ignore
            const usuarioActualizado : Usuario = await this.update(usuario.uuid, { is_active: true, codigo_de_verificacion: generateCodeAuth() });
            return { usuario: usuarioActualizado, message: 'Cuenta confirmada exitosamente'};
        }
        this.exceptions.forbiddenException({ message: 'El código de verificación no es válido' });
    }


    public getToken(payload: JwtPayload, jwtService: JwtService) : string {
        return jwtService.sign(payload, {algorithm: 'HS512'});
    }
    
}