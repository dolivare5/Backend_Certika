import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';


export class DevolverPrestamoDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada prestamo',
    })
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}