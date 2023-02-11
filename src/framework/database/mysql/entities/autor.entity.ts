import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Libro } from './libro.entity';

@Entity({ name: 'autor' })
export class Autor {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada autor',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;


    @ApiProperty({
        example: 'Autor 1',
        description: 'Nombre del autor',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        unique: true,
    })
    nombre!: string;


    @ApiProperty({
        example: 'Autor 1',
        description: 'Descripción del autor',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })

    descripcion?: string;


    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del autor',
        nullable: true,
    })

    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    img?: string;


    @ApiProperty({
        description: 'Estado del autor',
        nullable: false,
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })

    estado?: number;


    @ApiProperty({
        description: 'Fecha de creación del autor',
        nullable: false,
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'ON INSERT CURRENT_TIMESTAMP()'
    })
    fecha_de_creacion?: Date;


    @ApiProperty({
        description: 'Fecha de actualización del autor',
        nullable: true,
    })
    @Column('timestamp', {
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP()',
    })
    fecha_de_actualizacion?: Date;


    @BeforeInsert()
    @BeforeUpdate()
    upperCase() {
        this.nombre = this.nombre.toUpperCase();
    }

    @OneToMany(() => Libro, libro => libro.id_autor)
    libros?: Libro[];
}