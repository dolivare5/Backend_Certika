import { Injectable } from '@nestjs/common';
import { CrearParametroDto } from './dto/crear-parametro.dto';
import { ActualizarParametroDto } from './dto/actualizar-parametro.dto';
import { IBaseDeDatosAbstract } from "../../framework/database/mysql/core/abstract";
import { Parametro } from "../../framework/database/mysql/entities";

@Injectable()
export class ParametroService {
    constructor( private readonly baseDeDatos: IBaseDeDatosAbstract) {}
    
    
    async create(crearParametroDto: CrearParametroDto) : Promise<Parametro> {
        return await this.baseDeDatos.parametro.create(crearParametroDto);
    }
    
    async findAll() {
        return await this.baseDeDatos.parametro.findAll();
    }
    
    async findOne(id: number) {
        const parameter =  await this.baseDeDatos.parametro.findOne({where: {id}}, 'Parámetro');
        return {parameter};
    }
    
    async update(id: number, actualizarParametroDto: ActualizarParametroDto) : Promise<Parametro> {
        return await this.baseDeDatos.parametro.update(id, actualizarParametroDto);
    }
}
