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

@Entity({ name: 'editorial' })
export class Editorial {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada editorial',
    })
    @PrimaryGeneratedColumn('increment')
    id?: number;


    @ApiProperty({
        example: 'Editorial 1',
        description: 'Nombre de la editorial',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        unique: true,
    })
    nombre!: string;


    @ApiProperty({
        example: 'Editorial 1',
        description: 'Descripción de la editorial',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    descripcion?: string;


    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen de la editorial',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    img?: string;


    @ApiProperty({
        description: 'Estado de la editorial',
        example: 1,
        nullable: false,
    })
    @Column('tinyint', {
        nullable: false,
        default: 1,
    })
    estado?: number;


    @ApiProperty({
        description: 'Fecha de creación de la categoría',
        example: '2021-01-01 00:00:00',
        nullable: false,
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'ON INSERT CURRENT_TIMESTAMP()',
    })

    fecha_de_creacion?: Date;



    @ApiProperty({
        description: 'Fecha de actualización de la categoría',
        example: '2021-01-01 00:00:00',
        nullable: true,
    })
    @Column('timestamp', {
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP()',
    })

    fecha_de_actualizacion?: Date;


    @OneToMany(() => Libro, libro => libro.id_editorial)
    libros?: Libro[];


    @BeforeInsert()
    @BeforeUpdate()
    uppercase() {
        this.nombre = this.nombre.toUpperCase();
    }


}

