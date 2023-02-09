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
import { DetallesPrestamo, Inventario, Editorial, Categoria, Autor } from './';

@Entity({ name: 'libro' })
export class Libro {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada libro',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;


    @ApiProperty({
        example: 'Libro 1',
        description: 'Nombre del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        unique: true,
    })
    nombre!: string;


    @ApiProperty({
        example: 'Libro 1',
        description: 'Descripción del libro',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    descripcion?: string;


    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del libro',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    portada?: string;


    @ApiProperty({
        example: 543,
        description: 'Total de páginas del libro',
        nullable: false,
    })
    @Column('int', {
        nullable: false,
    })
    total_paginas!: number;


    @ApiProperty({
        example: 2023,
        description: 'Año de publicación del libro',
        nullable: false,
    })
    @Column('int', {
        nullable: false,
    })

    anio_de_publicacion!: number;


    @ApiProperty({
        example: 'Barranquilla - Colombia',
        description: 'Lugar de edición del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    lugar_de_edicion!: string;


    @ApiProperty({
        example: 1,
        description: 'Tipo de libro',
        nullable: false,
    })
    @Column('int', {
        nullable: false,
    })
    tipo_de_libro!: number;


    @ApiProperty({
        example: 1,
        description: 'Id del autor',
        nullable: false,
    })
    @ManyToOne(() => Autor, autor => autor.libros)
    @JoinColumn({ name: 'id_autor' })
    id_autor!: number;


    @ApiProperty({
        example: 1,
        description: 'Id de la editorial',
        nullable: false,
    })
    @ManyToOne(() => Editorial, editorial => editorial.libros)
    @JoinColumn({ name: 'id_editorial' })
    id_editorial!: number;


    @ApiProperty({
        example: 1,
        description: 'Id de la categoria',
        nullable: false,
    })
    @ManyToOne(() => Categoria, categoria => categoria.libros)
    @JoinColumn({ name: 'id_categoria' })
    id_categoria!: number;

    @OneToMany(() => DetallesPrestamo, detalles_prestamo => detalles_prestamo.id_libro)
    detalles_prestamos?: DetallesPrestamo[];


    @ApiProperty({
        example: "84VXXNGGFVGG-HVXWRSWRTTS-4VXWRSWRTTS",
        description: 'Código ISBN del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        unique: true,
    })
    codigo_isbn!: string;

    @OneToMany(() => Inventario, inventario => inventario.id_libro)
    inventarios?: Inventario[];


    @ApiProperty({
        example: '2021-05-05',
        description: 'Fecha de creación del libro',
        nullable: false,
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_de_creacion!: Date;


    @ApiProperty({
        example: '2021-05-05',
        description: 'Fecha de actualización del libro',
        nullable: false,
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_de_actualizacion!: Date;


    @BeforeInsert()
    @BeforeUpdate()
    upperCase() {
        this.nombre = this.nombre.toUpperCase();
        this.descripcion = this.descripcion.toUpperCase();
        this.portada = this.portada.toUpperCase();
        this.lugar_de_edicion = this.lugar_de_edicion.toUpperCase();
        this.codigo_isbn = this.codigo_isbn.toUpperCase();
    }
}


