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
import { Prestamo, Libro } from './';

@Entity({ name: 'detalles_prestamo' })
export class DetallesPrestamo {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada detalle de prestamo',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del prestamo',
    })
    @ManyToOne(() => Prestamo, prestamo => prestamo.detallesPrestamos)
    @JoinColumn({ name: 'id_prestamo' })
    id_prestamo!: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del libro',
    })
    @ManyToOne(() => Libro, libro => libro.detalles_prestamos)
    @JoinColumn({ name: 'id_libro' })
    id_libro!: number;

    @ApiProperty({
        example: 1,
        description: 'Cantidad de libros',
    })
    @Column('bigint', {
        nullable: false,
    })
    cantidad!: number;

    @ApiProperty({
        example: 1,
        description: 'Estado del detalle de prestamo',
    })
    @Column('bigint', {
        nullable: false,
    })
    estado!: number;

    @ApiProperty({
        example: '2023-01-01 00:00:00',
        description: 'Fecha de devolución',
    })
    @Column('datetime', {
        nullable: false,
    })
    fecha_devolucion!: Date;

    @ApiProperty({
        description: 'Observaciones',
        example: 'Observaciones',
    })
    @Column('text', {
        nullable: true,
    })
    observaciones?: string;

    @ApiProperty({
        example: true,
        description: 'Libro devuelto',
    })
    @Column('boolean', {
        nullable: false,
    })
    devuelto!: boolean;

    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: 'Fecha en la que el usuario devolvió el libro',
    })
    @Column('datetime', {
        nullable: true,
    })
    fecha_devolucion_real?: Date;
}