import { IsEmail, IsOptional } from "class-validator";


export class IniciarSesionDto {
    @IsEmail({}, { message: 'El correo no es válido' })
    @IsOptional()
    correo: string;

    @IsOptional()
    password: string;

    @IsOptional()
    token: string;
}