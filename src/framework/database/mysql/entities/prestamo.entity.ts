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
import {DetallesPrestamo, Usuario} from '.'

@Entity({ name: 'pestamo' })
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
        example: '2021-01-01',
        description: 'Fecha de prestamo',
    })
    @Column('date', {
        nullable: false,
    })
    fecha_prestamo!: Date;

    @ApiProperty({
        example: 1,
        description: 'Estado del prestamo',
    })
    @Column('bigint', {
        nullable: false,
    })
    estado!: number;

    @OneToMany(() => DetallesPrestamo, detallesPrestamo => detallesPrestamo.id_prestamo)
    detallesPrestamos!: DetallesPrestamo[];

    @ApiProperty({
        example: 'Observaciones',
        description: 'Observaciones',
    })
    @Column('text', {
        nullable: true,
    })
    observaciones!: string;
    

}