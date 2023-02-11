import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioInventario } from "../core/abstract";

@Injectable()
export class MysqlRepositorioInventario<T> extends MysqlRepositorioGenerico<T> implements IRepositorioInventario<T> {}