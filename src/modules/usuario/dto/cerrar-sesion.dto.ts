import { IsNotEmpty, IsString, Matches } from 'class-validator';


export class CerrarSesionDto {
    @IsString()
    // Se crea una expresión regular para validar que el token tenga el formato correcto
    @Matches(/^[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*$/, {
        message: 'El token no tiene el formato correcto',
    })
    @IsNotEmpty({ message: 'El token no puede estar vacío' })
    token: string;
}