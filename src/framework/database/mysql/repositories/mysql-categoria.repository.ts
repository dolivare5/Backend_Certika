import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioCategoria } from "../core/abstract";

@Injectable()
export class MysqlRepositorioCategoria<T> extends MysqlRepositorioGenerico<T> implements IRepositorioCategoria<T> {
}