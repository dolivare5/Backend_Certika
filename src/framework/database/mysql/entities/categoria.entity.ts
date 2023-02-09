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

@Entity({ name: 'categoria' })
export class Categoria {
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada categoría',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;


    @ApiProperty({
        example: 'Categoría 1',
        description: 'Nombre de la categoría',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        unique: true,
    })
    nombre!: string;


    @ApiProperty({
        example: 'Categoría 1',
        description: 'Descripción de la categoría',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    descripcion?: string;


    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen de la categoría',
        nullable: true,
    })

    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    img?: string;


    @ApiProperty({
        description: 'Estado de la categoría',
        example: 1,
        nullable: false,
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })
    estado!: number;


    @ApiProperty({
        description: 'Fecha de creación de la categoría',
        example: '2021-01-01 00:00:00',
        nullable: false,
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })

    fecha_de_creacion!: Date;



    @ApiProperty({
        description: 'Fecha de actualización de la categoría',
        example: '2021-01-01 00:00:00',
        nullable: true,
    })
    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })

    fecha_de_actualizacion?: Date;


    @OneToMany(() => Libro, libro => libro.id_categoria)
    libros?: Libro[];


    @BeforeInsert()
    @BeforeUpdate()
    uppercase() {
        this.nombre = this.nombre.toUpperCase();
    }

}