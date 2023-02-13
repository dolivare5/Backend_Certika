import { Injectable } from '@nestjs/common';
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
        // @ts-ignore
        const existTypeDocument = (await this.executeQuery(`SELECT * FROM valor_parametro WHERE id = ${datosDelUsuario.id_tipo_documento} AND id_parametro = 3`)).length > 0;
        if(existTypeDocument){     
            if(!(await this.existsUser(usuario))){
                const usuarioARegistrar ={
                    ...datosDelUsuario,
                    codigo_de_verificacion: generateCodeAuth(),
                    uuid: this.generateCodeUuId(),
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
                return { message: 'Usuario registrado exitosamente, revise su correo para confirmar su cuenta'};
            }
        }
        this.exceptions.badRequestException({ message: 'Datos de registro incorrectos'});
    }

    public async iniciarSesion(usuario: DeepPartial<T>, jwtService: JwtService): Promise<Object> {
        const { correo, password, token } = usuario as IniciarSesionDto;

        let usuarioAIniciarSesion: Usuario;
        if(correo && password){
            // @ts-ignore
            usuarioAIniciarSesion = await this.findOne({ where: { correo}}) as Usuario;
            console.log(usuarioAIniciarSesion);
            // Muestro la contraseña pero desencriptada
            console.log(bcrypt.compareSync(password, usuarioAIniciarSesion.password));
            if(!usuarioAIniciarSesion || !bcrypt.compareSync(password, usuarioAIniciarSesion.password)){
                this.exceptions.badRequestException({message: 'Datos de inicio de sesión incorrectos'});
            }
            // @ts-ignore
            if(usuarioAIniciarSesion.estado !== 1){
                this.exceptions.forbiddenException({ message:'Su cuenta no ha sido eliminada o desactivada. Por favor, contacte con el administrador del sistema'});
            }

            if(!usuarioAIniciarSesion.is_active){
                this.exceptions.forbiddenException({ message:'Su cuenta no ha sido activada. Por favor, revise su correo para activar su cuenta'});
            }
        }

        if(token){
            // Verificar si el token es válido y si pertenece a un usuario de google o facebook
        }


        if(correo === undefined && password === undefined && token === undefined){
            this.exceptions.badRequestException({ message: 'Debe enviar los datos de inicio de sesión'});
        }

        if(correo !== undefined && password === undefined && token === undefined){
            this.exceptions.badRequestException({ message: 'Debe enviar la contraseña'});
        }

        if(correo === undefined && password !== undefined && token === undefined){
            this.exceptions.badRequestException({ message: 'Debe enviar el correo'});
        }

        const token_auth = this.getToken({uuid: usuarioAIniciarSesion.uuid}, jwtService);
        const is_admin = usuarioAIniciarSesion.id_rol === 1;
        return { ...usuarioAIniciarSesion, token_auth, is_admin  };

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
            await this.update(usuario.uuid, { is_active: true, codigo_de_verificacion: generateCodeAuth() });
            return { message: 'Cuenta confirmada exitosamente'};
        }
        this.exceptions.forbiddenException({ message: 'El código de verificación no es válido' });
    }


    public getToken(payload: JwtPayload, jwtService: JwtService) : string {
        return jwtService.sign(payload, {algorithm: 'HS512'});
    }
    
}
