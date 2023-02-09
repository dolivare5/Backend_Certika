import { Injectable } from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { IBaseDeDatosAbstract } from "../../framework/database/mysql/core/abstract";
import { Parametro } from "../../framework/database/mysql/entities";

@Injectable()
export class ParameterService {
    constructor( private readonly baseDeDatos: IBaseDeDatosAbstract) {}
    
    
    async create(createParameterDto: CreateParameterDto) : Promise<Parametro> {
        return await this.baseDeDatos.parametro.create(createParameterDto);
    }
    
    async findAll() {
        return await this.baseDeDatos.parametro.findAll();
    }
    
    async findOne(id: number) {
        const parameter =  await this.baseDeDatos.parametro.findOne({where: {id}}, 'Parámetro');
        return {parameter};
    }
    
    async update(id: number, updateParameterDto: UpdateParameterDto) : Promise<Parametro> {
        return await this.baseDeDatos.parametro.update(id, updateParameterDto);
    }
}
