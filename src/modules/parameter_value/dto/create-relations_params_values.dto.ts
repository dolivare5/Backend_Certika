import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRelationParamsValuesDto {
    
    @ApiProperty({
        example: 1,
        description: 'Identificador que hace referencia a la opción principal seleccionada por el usuario. Es decir, el parámetro que tiene muchos valores y el otro tiene uno. Ejemplo: Si el usuario selecciona categorías de automotores, el parámetro que tiene muchos valores es categoría y el que tiene uno es subcategoría',
    })
    @IsNumber({}, {message: 'El id_parameter_value1 debe ser un número'})
    @IsNotEmpty({message: 'El id_param_1 es requerido'})
    id_parameter_value1: number;
    
    @ApiProperty({
        example: 1,
        description: 'Identificador que hace referencia a la opción secundaria seleccionada por el usuario. Es decir, el parámetro que tiene un valor y el otro tiene muchos. Ejemplo: Si el usuario una vez ha seleccionado una categoría de automotores y le interesa ver las subcategorías, el parámetro que tiene muchos valores es categoría y el que tiene uno es subcategoría',
    })
    @IsNumber({}, {message: 'El id_param_2 debe ser un número'})
    @IsNotEmpty({message: 'El id_param_2 es requerido'})
    id_parameter_value2: number;
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único del tipo de parámetro al que pertenece el valor de id_parameter_value1. ¿Qué opción ha seleccionado el usuario?',
    })
    @IsNumber({}, {message: 'El id_param_1 debe ser un número'})
    id_param_1: number;
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único del tipo de parámetro al que pertenece el valor de id_parameter_value2. ¿De la opción que ha seleccionado el usuario Qué opciones le quieres mostrar cuando se seleccione la opción con el id_param_1?',
    })
    @IsNumber({}, {message: 'El id_param_2 debe ser un número'})
    id_param_2: number;
    
    
    
    @ApiProperty({
        example: 'Información extra',
        description: 'Descripción de la relación',
        nullable: true,
    })
    @IsString({message: 'La descripción debe ser un texto'})
    @IsOptional()
    description?: string;
    
    
    @ApiProperty({
        example: 1,
        description: 'Estado de la relación',
        default: 1,
    })
    @IsOptional()
    @IsNumber({}, {message: 'El state debe ser un número'})
    @IsNotEmpty({message: 'El state es requerido'})
    state: number;
    
}
