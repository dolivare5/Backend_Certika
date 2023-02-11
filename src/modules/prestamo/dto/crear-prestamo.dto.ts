import {IsInt, IsNumber, IsOptional, IsString, Matches, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class CrearLibroDto {

    @ApiProperty({
        example: 1,
        description: 'Identificador único del libro',
    })
    @IsNumber({}, {message: 'El id del libro debe ser un número'})
    id_libro!: number;

    @ApiProperty({
        example: 1,
        description: 'Cantidad de libros',
    })
    @IsInt({message: 'La cantidad de libros debe ser un número entero'})
    cantidad!: number;

    @ApiProperty({
        example: '2023-01-01 00:00:00',
        description: 'Fecha de devolución',
    })
    @IsString({message: 'La fecha de devolución debe ser una cadena de texto'})
    // Expresión regular para validar la fecha y hora
    @Matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {message: 'La fecha de devolución debe tener el formato yyyy-mm-dd hh:mm:ss'})
    fecha_devolucion!: string;


    @IsString({message: 'Las observaciones deben ser un texto'})
    @IsOptional()
    observaciones?: string;

}
