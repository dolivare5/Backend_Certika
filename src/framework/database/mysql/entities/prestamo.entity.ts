import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import {Usuario, Libro} from '.'

@Entity({ name: 'prestamo' })
export class Prestamo {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada prestamo',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del usuario',
    })
    @ManyToOne(() => Usuario, usuario => usuario.prestamos)
    @JoinColumn({ name: 'id_usuario' })
    id_usuario!: number;


    @ApiProperty({
        example: 1,
        description: 'Identificador único del libro',
    })
    @ManyToOne(() => Libro, libro => libro.prestamos)
    @JoinColumn({ name: 'id_libro' })
    id_libro!: number;

    

    @ApiProperty({
        example: 1,
        description: 'Cantidad de libros',
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })
    cantidad!: number;


    @ApiProperty({
        example: 1,
        description: 'Estado del prestamo',
    })
    @Column('int', {
        default: 1,
        nullable: false,
    })
    estado?: number;


    @ApiProperty({
        example: '2023-01-01 00:00:00',
        description: 'Fecha de devolución',
    })
    @Column('datetime', {
        nullable: false,
    })
    fecha_devolucion!: Date;


    
    @ApiProperty({
        example: true,
        description: 'Libro devuelto',
    })
    @Column('boolean', {
        nullable: false,
        default: false,
    })
    devuelto?: boolean;



    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: 'Fecha en la que el usuario devolvió el libro',
    })
    @Column('timestamp', {
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP()',
    })
    fecha_devolucion_real?: Date;


    @ApiProperty({
        example: '2021-01-01',
        description: 'Fecha de prestamo',
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP()',
    })
    fecha_prestamo?: Date;

    
    @ApiProperty({
        example: 'Observaciones',
        description: 'Observaciones',
    })
    @Column('text', {
        nullable: true,
    })
    observaciones?: string;
}