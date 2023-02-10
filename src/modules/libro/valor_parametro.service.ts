import { Injectable } from '@nestjs/common';
import { CrearValorParametroDto } from './dto/crear-valor_parametro.dto';
import { ActualizarValorParametroDto } from './dto/actualizar-libro.dto';
import { IBaseDeDatosAbstract } from "../../framework/database/mysql/core/abstract";
import {ValorParametro} from "../../framework/database/mysql/entities";

@Injectable()
export class ValorParametroService {
    constructor( private readonly baseDeDatos: IBaseDeDatosAbstract) {}
    
    
    async create(crearValorParametroDto: CrearValorParametroDto) : Promise<ValorParametro> {
        return await this.baseDeDatos.valorParametro.create(crearValorParametroDto);
    }
    

    async findOne(id: number) {
        return await this.baseDeDatos.valorParametro.findOne( {where: {id}}, 'Valor Parámetro');
    }

    async update(id: number, actualizarValorParametroDto: ActualizarValorParametroDto) : Promise<ValorParametro> {
        return await this.baseDeDatos.valorParametro.update(id, actualizarValorParametroDto);
    }
}
