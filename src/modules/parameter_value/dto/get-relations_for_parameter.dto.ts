import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";


export class GetRelationsForParameter {
    
    @ApiProperty({
        example: 1,
        description: 'Id del valor o dato del cual quiere saber los elementos relacionados con el',
        nullable: false
    })
    @IsNumber({}, {message: 'El id del valor o dato debe ser un número'})
    @IsNotEmpty({message: 'El id del valor o dato es requerido'})
    id_parameter_value1: number;
    
    @ApiProperty({
        example: 1,
        description: 'Id del tipo de parámetro asociado al valor o dato',
        nullable: false
    })
    @IsNumber({}, {message: 'El id del tipo de parámetro debe ser un número'})
    @IsNotEmpty({message: 'El id del tipo de parámetro es requerido'})
    id_parameter_father: number;
}
