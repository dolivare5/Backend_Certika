import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Prestamo, RegistrosDeUsuarios } from "./";

@Entity({ name: 'usuario' })
export class Usuario {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada usuario',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;

    @ApiProperty({
        example: 'ggrvs-123456789',
        description: 'Código de verificación de cada usuario',	
    })
    @Column('varchar', {
        nullable: true,
        length: 100,
        unique: true,
    })
    codigo_de_verificacion?: string;

    @ApiProperty({
        example: 'ggrvs-bnmjbvnjb-hghgffdgfhg',
        description: 'Código único de cada usuario (UUID)',	
    })
    @Column('varchar', {
        nullable: true,
        length: 100,
        unique: true,
    })
    uuid?: string;

    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    nombre!: string;

    @ApiProperty({
        example: 'Perez',
        description: 'Apellido del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    apellido!: string;

    @ApiProperty({
        example: 19,
        description: 'Edad del usuario',
    })
    @Column('int', {
        nullable: false,
    })
    edad!: number;

    @ApiProperty({
        example: '105378654',
        description: 'Número de documento del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 10,
        unique: true,
    })
    nro_documento!: string;


    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada tipo de documento',
    })
    @Column('bigint', {
        nullable: false,
    })
    id_tipo_documento!: number;

    @ApiProperty({
        example: 'correo@correo.com',
        description: 'Correo del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        unique: true,
    })
    correo!: string;

    @ApiProperty({
        example: 'Masculino',
        description: 'Género del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 10,
    })
    genero!: string;

    @Column('boolean', {
        nullable: false,
        default: false,
    })
    loging_google?: boolean;


    @Column('boolean', {
        nullable: false,
        default: false,
    })
    loging_facebook?: boolean;

    @ApiProperty({
        example: '123456',
        description: 'Contraseña del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    password!: string;


    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del usuario',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    img?: string;

    @Column('bigint', {
        nullable: false,
    })
    id_rol!: number;

    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de creación del usuario',
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_de_creacion?: Date;

    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de actualización del usuario',
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fecha_de_actualizacion?: Date;

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada estado',
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })
    estado?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único que indica si el usuario está activo o no',
    })
    @Column('int', {
        nullable: false,
        default: false,
    })
    is_active?: boolean;

    @OneToMany(() => RegistrosDeUsuarios, registrosDeUsuarios => registrosDeUsuarios.id_usuario)
    registrosDeUsuarios?: RegistrosDeUsuarios[];

    @OneToMany(() => Prestamo, prestamo => prestamo.id_usuario)
    prestamos?: Prestamo[];
}


