import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';


export class CrearUsuarioDto {

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan',
        required: true,
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Perez',
        required: true,
    })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    apellido: string;

    @ApiProperty({
        description: 'Edad del usuario',
        example: 20,
        required: true,
    })
    @IsNumber({}, { message: 'La edad debe ser un número' })
    @IsNotEmpty({ message: 'La edad no puede estar vacía' })
    edad: number;

    @ApiProperty({
        description: 'Documento del usuario',
        example: '123456789',
        required: true,
    })
    @IsString({ message: 'El documento debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El documento no puede estar vacío' })
    @MinLength(6, { message: 'El documento debe tener al menos 6 caracteres' })
    nro_documento: string;

    @ApiProperty({
        description: 'Tipo de documento del usuario',
        example: 1,
        required: true,
    })
    @IsNumber({}, { message: 'El tipo de documento debe ser un número' })
    @IsNotEmpty({ message: 'El tipo de documento no puede estar vacío' })
    id_tipo_documento: number;

    @ApiProperty({
        description: 'Correo del usuario',
        example: 'correo@correo.com',
        required: true,
    })
    @IsString({ message: 'El correo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    @MinLength(3, { message: 'El correo debe tener al menos 3 caracteres' })
    @IsEmail({}, { message: 'El correo debe ser un correo válido' })
    correo: string;

    @ApiProperty({
        description: 'Sexo del usuario',
        example: 'Masculino',
        required: true,
    })
    @IsString({ message: 'El sexo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El sexo no puede estar vacío' })
    @MinLength(3, { message: 'El sexo debe tener al menos 3 caracteres' })
    genero: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '123456',
        required: true,
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, { message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número' })
    password: string;


    @ApiProperty({
        description: 'Imagen del usuario',
        example: 'imagen.jpg',
        required: true,
    })
    @IsString({ message: 'La imagen debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
    @MinLength(3, { message: 'La imagen debe tener al menos 3 caracteres' })
    @IsOptional()
    img: string;

}