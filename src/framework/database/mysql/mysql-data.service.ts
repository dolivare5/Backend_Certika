import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import {
    IRepositorioValorParametro,
    IRepositorioParametro,
    IRepositorioUsuario,
    IRepositorioRegistrosDeUsuarios
} from "./core/abstract";


import {
    MysqlRepositorioParametro, MysqlRepositorioValorParametro, MysqlRepositorioUsuario, MysqlRepositorioRegistrosDeUsuarios
} from "./repositories";


import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
    Parametro, ValorParametro, Usuario
} from "./entities";

import {ExceptionsService} from "../../../config/exceptions/exceptions.service";
import { IBaseDeDatosAbstract } from "./core/abstract/base_de_datos.abstract";
import { RegistrosDeUsuarios } from './entities/registros_de_usuarios.entity';

@Injectable()
export class MysqlDatabaseService implements IBaseDeDatosAbstract, OnApplicationBootstrap {
    
    public parametro: IRepositorioParametro<Parametro>;
    public valorParametro: IRepositorioValorParametro<ValorParametro>;
    public usuario: IRepositorioUsuario<Usuario>;
    public registrosDeUsuarios: IRepositorioRegistrosDeUsuarios<RegistrosDeUsuarios>;

    
    constructor(
        @InjectRepository(Parametro) private readonly repositorioParametro: Repository<Parametro>,
        @InjectRepository(ValorParametro) private readonly repositorioValorParametro: Repository<ValorParametro>,
        @InjectRepository(Usuario) private readonly repositorioUsuario: Repository<Usuario>,
        @InjectRepository(RegistrosDeUsuarios) private readonly repositorioRegistrosDeUsuarios: Repository<RegistrosDeUsuarios>,
        private readonly dataSource: DataSource
    ) {
    }
    
    
    public onApplicationBootstrap() {
        this.parametro = new MysqlRepositorioParametro(this.repositorioParametro, this.dataSource, new ExceptionsService());
        this.valorParametro = new MysqlRepositorioValorParametro(this.repositorioValorParametro, this.dataSource, new ExceptionsService());
        this.usuario = new MysqlRepositorioUsuario(this.repositorioUsuario, this.dataSource, new ExceptionsService());
        this.registrosDeUsuarios = new MysqlRepositorioRegistrosDeUsuarios(this.repositorioRegistrosDeUsuarios, this.dataSource, new ExceptionsService());
    };
}
