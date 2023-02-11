import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Libro } from './libro.entity';

@Entity({ name: 'inventario' })
export class Inventario {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada inventario',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del libro',
    })
    @ManyToOne(() => Libro, libro => libro.inventarios)
    @JoinColumn({ name: 'id_libro' })
    id_libro!: number;

    @ApiProperty({
        example: 1,
        description: 'Cantidad de libros',
    })
    @Column('bigint', {
        nullable: false,
    })
    libros_totales!: number;


    @ApiProperty({
        example: 1,
        description: 'Cantidad de libros prestados',
    })
    @Column('bigint', {
        nullable: false,
        default: 0,
    })
    libros_prestados!: number;

    @ApiProperty({
        example: 1,
        description: 'Cantidad de libros disponibles',
    })
    @Column('bigint', {
        nullable: false,
    })
    libros_disponibles!: number;


    @ApiProperty({
        example: '2021-01-01',
        description: 'Fecha de ingreso del libro',
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_de_creacion!: Date;


    @ApiProperty({
        example: '2021-01-01',
        description: 'Fecha de actualización del libro',
    })
    @Column('timestamp', {
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP()',
    })
    fecha_de_actualizacion!: Date;

    @ApiProperty({
        example: 1,
        description: 'Estado del inventario',
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })
    estado?: number;

}