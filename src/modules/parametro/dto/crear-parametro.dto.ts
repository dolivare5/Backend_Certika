import {IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class CrearParametroDto {
    
    @ApiProperty({
        example: 'Perfiles',
        description: 'Nombre del parámetro',
        nullable: false,
    })
    @IsString({message: "El nombre de cada parámetro debe ser un texto"})
    @MinLength(3, {message: "El nombre de cada parámetro debe tener al menos 3 caracteres"})
    nombre!: string;
    
    
    @ApiProperty({
        example: 'Información extra',
        description: 'Descripción del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La descripción de cada parámetro debe ser un texto"})
    @MinLength(3, {message: "La descripción de cada parámetro debe tener al menos 3 caracteres"})
    descripcion?: string;
    
    
    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La imagen de cada parámetro debe ser un texto"})
    @MinLength(3, {message: "La imagen de cada parámetro debe tener al menos 3 caracteres"})
    img?: string;
}
