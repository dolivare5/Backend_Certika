import {IsInt, IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class CreateParameterValueDto {
    
    @ApiProperty({
        example: 'Perfiles',
        description: 'Nombre del valor de parámetro',
        nullable: false,
    })
    @IsString({message: "El nombre de cada valor parámetro debe ser un texto"})
    @MinLength(3, {message: "El nombre de cada valor parámetro debe tener al menos 3 caracteres"})
    name!: string;
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada parámetro',
        nullable: false,
    })
    @IsInt({message: "El id de cada parámetro debe ser un número"})
    id_parameter!: number;
    
    
    @ApiProperty({
        example: 'CC',
        description: 'Valor corto del parámetro',
        nullable: true,
    })
    @IsString({message: "El valor corto de cada valor parámetro debe ser un texto"})
    @IsOptional()
    short?: string;
    
    
    @ApiProperty({
        example: 'Información extra',
        description: 'Descripción del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La descripción de cada valor parámetro debe ser un texto"})
    @MinLength(3, {message: "La descripción de cada parámetro debe tener al menos 3 caracteres"})
    description?: string;
    
    
    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La imagen de cada valor parámetro debe ser un texto"})
    @MinLength(3, {message: "La imagen de cada parámetro debe tener al menos 3 caracteres"})
    img?: string;

    @ApiProperty({
        description: 'Estado del valor del parámetro',
        example: 1,
        default: 1,
    })
    @IsInt({message: "El estado de cada parámetro debe ser un número entero"})
    @IsOptional()
    state?: number;
}
