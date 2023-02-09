import { Injectable } from '@nestjs/common';
import { CreateParameterValueDto } from './dto/create-parameter_value.dto';
import { UpdateParameterValueDto } from './dto/update-parameter_value.dto';
import { IBaseDeDatosAbstract } from "../../framework/database/mysql/core/abstract";
import {ValorParametro} from "../../framework/database/mysql/entities";

@Injectable()
export class ParameterValueService {
    constructor( private readonly baseDeDatos: IBaseDeDatosAbstract) {}
    
    
    async create(createParameterValueDto: CreateParameterValueDto) : Promise<ValorParametro> {
        return await this.baseDeDatos.valorParametro.create(createParameterValueDto);
    }
    
    async findAll() {
        return await this.baseDeDatos.valorParametro.findAll();
    }

    async update(id: number, updateParameterValueDto: UpdateParameterValueDto) : Promise<ValorParametro> {
        return await this.baseDeDatos.valorParametro.update(id, updateParameterValueDto);
    }
}
