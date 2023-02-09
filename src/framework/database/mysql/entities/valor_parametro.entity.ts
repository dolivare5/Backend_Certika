import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import {Parametro} from "./index";

@Entity({name: 'valor_parametro'})
export class ValorParametro {
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada valor de parámetro',
    })
    @PrimaryGeneratedColumn('increment')
    id?: number;
    
    
    @ApiProperty({
        example: 'Perfiles',
        description: 'Nombre del parámetro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    nombre!: string;
    
    @ApiProperty({
        example: 'CC',
        description: 'Valor corto del parámetro',
        nullable: true,
    })
    @Column('varchar', {
        nullable: true,
        length: 10,
    })
    short?: string;
    
    @ApiProperty({
        example: 'Información extra',
        description: 'Descripción del parámetro',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    descripcion?: string;
    
    
    @ApiProperty({
        example: 'imagen.png',
        description: 'Imagen del parámetro',
        nullable: true,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
    })
    img?: string;
    
    @ApiProperty({
        description: 'Estado del valor del parámetro',
        example: 1,
        default: 1,
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })
    estado?: number;

    
    @ManyToOne(() => Parametro, parametro => parametro.valores_parametros)
    @JoinColumn({name: 'id_parametro'})
    id_parametro: number;
    
    
    
    
    @BeforeInsert()  @BeforeUpdate()
    beforeInsert() {
        this.nombre = this.nombre.toUpperCase();
    }
}
