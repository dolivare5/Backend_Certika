import { IRepositorioGenerico } from './repositorio-generico.abstract';
import { DeepPartial } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

export abstract class IRepositorioUsuario<T> extends IRepositorioGenerico<T> {

    public abstract registrarUsuario(usuario: DeepPartial<T>, mailerService: MailerService): Promise<Object>;

    public abstract iniciarSesion(usuario: DeepPartial<T>, jwtService: JwtService): Promise<Object>;

    public abstract updateUser(user: T): Promise<T>;

    public abstract deleteUser(user: T): Promise<T>;

    public abstract getUser(user: T): Promise<T>;

    public abstract getUsers(): Promise<T[]>;

    public abstract getUserByToken(token: string): Promise<T>;

    public abstract existsUser(user: T): Promise<boolean>;

    public abstract exportUsers(): Promise<T[]>;

    public abstract confirmarCuenta(codigoDeVerificacion: string): Promise<Object>;
}