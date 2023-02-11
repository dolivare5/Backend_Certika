import {IsInt, IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class CrearLibroDto {

    @ApiProperty({
        example: 'Libro 1',
        description: 'Nombre del libro',
        nullable: false,
    })
    @IsString()
    @MinLength(3)
    nombre!: string;

    @ApiProperty({
        example: 'Libro 1',
        description: 'Descripción del libro',
        nullable: true,
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del libro',
        nullable: true,
    })
    @IsString()
    @IsOptional()
    portada?: string;


    @ApiProperty({
        example: 543,
        description: 'Total de páginas del libro',
        nullable: false,
    })
    @IsInt({message: 'El total de páginas debe ser un número entero'})
    total_paginas!: number;


    @ApiProperty({
        example: 2023,
        description: 'Año de publicación del libro',
        nullable: false,
    })
    @IsInt({message: 'El año de publicación debe ser un número entero'})
    anio_de_publicacion!: number;


    @ApiProperty({
        example: 'Barranquilla - Colombia',
        description: 'Lugar de edición del libro',
        nullable: false,
    })
    @IsString({message: 'El lugar de edición debe ser un texto'})
    lugar_de_edicion!: string;


    @ApiProperty({
        example: 'De papel',
        description: 'Tipo de libro',
        nullable: false,
    })
    @IsString({message: 'El tipo de libro debe ser un texto'})
    tipo_de_libro_str!: string;


    @ApiProperty({
        example: 'Jose Perez',
        description: 'Nombre del autor',
        nullable: false,
    })
    @IsString({message: 'El nombre del autor debe ser un texto'})
    autor_nombre!: string;


    @ApiProperty({
        example: 'Alfa Omega',
        description: 'Nombre de la editorial',
        nullable: false,
    })
    @IsString({message: 'El nombre de la editorial debe ser un texto'})
    editorial_nombre!: string;


    @ApiProperty({
        example: 'Ciencia Ficción',
        description: 'Nombre de la categoria',
        nullable: false,
    })
    @IsString({message: 'El nombre de la categoria debe ser un texto'})
    categoria_nombre!: string;


    @ApiProperty({
        example: '1234v67-89',
        description: 'ISBN del libro',
        nullable: false,
    })
    @IsString({message: 'El ISBN debe ser un texto'})
    codigo_isbn!: string;


    @ApiProperty({
        example: 30,
        description: 'Cantidad de libros adquiridos',
        nullable: false,
    })
    @IsInt({message: 'La cantidad de libros adquiridos debe ser un número entero'})
    cantidad!: number;

}
