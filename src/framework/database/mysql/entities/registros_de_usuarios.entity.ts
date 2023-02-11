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
import { Usuario } from './usuario.entity';

@Entity({ name: 'registros_de_usuarios' })
export class RegistrosDeUsuarios {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada registro de usuario',
    })
    @PrimaryGeneratedColumn('increment', { type: 'bigint'})
    id?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del usuario',
    })
    @ManyToOne(() => Usuario, usuario => usuario.registrosDeUsuarios, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    id_usuario!: number;

    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: 'Fecha de ingreso al sistema',
    })
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_ingreso!: Date;

    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: 'Fecha de salida del sistema',
    })
    @Column('timestamp', {
        nullable: true,
    })
    fecha_salida?: Date;


    @ApiProperty({
        description: 'Token de acceso',
        example: 'tjnkjb-3j4n3-4j3n4-3j4n3-4j3n4',
    })
    @Column('varchar', {
        nullable: false,
        length: 500,
    })
    token!: string;


    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: 'Fecha de expiración del token',
    })
    @Column('timestamp', {
        nullable: false,
    })
    fecha_expiracion!: Date;


    @ApiProperty({
        example: '1.987.654.321',
        description: 'IP del usuario',
    })
    @Column('varchar', {
        nullable: false,
        length: 500,
    })
    ip!: string;
}