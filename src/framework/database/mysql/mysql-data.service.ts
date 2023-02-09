import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import {
    IRepositorioValorParametro,
    IRepositorioParametro,
} from "./core/abstract";


import {
    MysqlRepositorioParametro, MysqlRepositorioValorParametro,
} from "./repositories";


import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
    Parametro, ValorParametro,
} from "./entities";

import {ExceptionsService} from "../../../config/exceptions/exceptions.service";
import { IBaseDeDatosAbstract } from "./core/abstract/base_de_datos.abstract";


@Injectable()
export class MysqlDatabaseService implements IBaseDeDatosAbstract, OnApplicationBootstrap {
    
    public parametro: IRepositorioParametro<Parametro>;
    public valorParametro: IRepositorioValorParametro<ValorParametro>;
    
    constructor(
        @InjectRepository(Parametro) private readonly repositorioParametro: Repository<Parametro>,
        @InjectRepository(ValorParametro) private readonly repositorioValorParametro: Repository<ValorParametro>,
        private readonly dataSource: DataSource
    ) {
    }
    
    
    public onApplicationBootstrap() {
        this.parametro = new MysqlRepositorioParametro(this.repositorioParametro, this.dataSource, new ExceptionsService());
        this.valorParametro = new MysqlRepositorioValorParametro(this.repositorioValorParametro, this.dataSource, new ExceptionsService());
    };
}
