import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import {ValorParametro} from "./index";

@Entity({name: 'parametro'})
export class Parametro {
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada parámetro',
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
        unique: true,
    })
    nombre!: string;
    
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
        description: 'Estado del parámetro',
        example: 1,
        default: 1,
    })
    @Column('int', {
        nullable: false,
        default: 1,
    })
    estado!: number;
    

    @OneToMany(() => ValorParametro, relacionParametros => relacionParametros.id_parametro, {eager: true})
    valores_parametros?: ValorParametro[];
    
    @BeforeInsert()  @BeforeUpdate()
    beforeInsert() {
        this.nombre = this.nombre.toUpperCase();
        this.descripcion = this.descripcion?.toUpperCase();
    }
    
}
