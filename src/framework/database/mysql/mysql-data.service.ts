import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import {
    IRepositorioValorParametro,
    IRepositorioParametro,
    IRepositorioUsuario,
    IRepositorioRegistrosDeUsuarios,
    IRepositorioAutor,
    IRepositorioLibro,
    IRepositorioEditorial,
    IRepositorioCategoria,
    IRepositorioPrestamo,
    IRepositorioInventario
} from "./core/abstract";


import {
    MysqlRepositorioParametro, 
    MysqlRepositorioValorParametro, 
    MysqlRepositorioUsuario, 
    MysqlRepositorioRegistrosDeUsuarios,
    MysqlRepositorioAutor,
    MysqlRepositorioLibro,
    MysqlRepositorioEditorial,
    MysqlRepositorioCategoria,
    MysqlRepositorioPrestamo,
    MysqlRepositorioInventario
} from "./repositories";


import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
    Parametro, 
    ValorParametro, 
    Usuario, 
    RegistrosDeUsuarios,
    Autor,
    Libro,
    Editorial,
    Categoria,
    Prestamo,
    Inventario
} from "./entities";

import {ExceptionsService} from "../../../config/exceptions/exceptions.service";
import { IBaseDeDatosAbstract } from "./core/abstract/base_de_datos.abstract";

@Injectable()
export class MysqlDatabaseService implements IBaseDeDatosAbstract, OnApplicationBootstrap {
    
    public parametro: IRepositorioParametro<Parametro>;
    public valorParametro: IRepositorioValorParametro<ValorParametro>;
    public usuario: IRepositorioUsuario<Usuario>;
    public registrosDeUsuarios: IRepositorioRegistrosDeUsuarios<RegistrosDeUsuarios>;
    public autor: IRepositorioAutor<Autor>;
    public libro: IRepositorioLibro<Libro>;
    public editorial: IRepositorioEditorial<Editorial>;
    public categoria: IRepositorioCategoria<Categoria>;
    public prestamo: IRepositorioPrestamo<Prestamo>;
    public inventario: IRepositorioInventario<Inventario>;

    
    constructor(
        @InjectRepository(Parametro) private readonly repositorioParametro: Repository<Parametro>,
        @InjectRepository(ValorParametro) private readonly repositorioValorParametro: Repository<ValorParametro>,
        @InjectRepository(Usuario) private readonly repositorioUsuario: Repository<Usuario>,
        @InjectRepository(RegistrosDeUsuarios) private readonly repositorioRegistrosDeUsuarios: Repository<RegistrosDeUsuarios>,
        @InjectRepository(Autor) private readonly repositorioAutor: Repository<Autor>,
        @InjectRepository(Libro) private readonly repositorioLibro: Repository<Libro>,
        @InjectRepository(Editorial) private readonly repositorioEditorial: Repository<Editorial>,
        @InjectRepository(Categoria) private readonly repositorioCategoria: Repository<Categoria>,
        @InjectRepository(Prestamo) private readonly repositorioPrestamo: Repository<Prestamo>,
        @InjectRepository(Inventario) private readonly repositorioInventario: Repository<Inventario>,
        private readonly dataSource: DataSource
    ) {
    }
    
    
    public onApplicationBootstrap() {
        this.parametro = new MysqlRepositorioParametro(this.repositorioParametro, this.dataSource, new ExceptionsService());
        this.valorParametro = new MysqlRepositorioValorParametro(this.repositorioValorParametro, this.dataSource, new ExceptionsService());
        this.usuario = new MysqlRepositorioUsuario(this.repositorioUsuario, this.dataSource, new ExceptionsService());
        this.registrosDeUsuarios = new MysqlRepositorioRegistrosDeUsuarios(this.repositorioRegistrosDeUsuarios, this.dataSource, new ExceptionsService());
        this.autor = new MysqlRepositorioAutor(this.repositorioAutor, this.dataSource, new ExceptionsService());
        this.libro = new MysqlRepositorioLibro(this.repositorioLibro, this.dataSource, new ExceptionsService());
        this.editorial = new MysqlRepositorioEditorial(this.repositorioEditorial, this.dataSource, new ExceptionsService());
        this.categoria = new MysqlRepositorioCategoria(this.repositorioCategoria, this.dataSource, new ExceptionsService());
        this.prestamo = new MysqlRepositorioPrestamo(this.repositorioPrestamo, this.dataSource, new ExceptionsService());
        this.inventario = new MysqlRepositorioInventario(this.repositorioInventario, this.dataSource, new ExceptionsService());
    };
}
