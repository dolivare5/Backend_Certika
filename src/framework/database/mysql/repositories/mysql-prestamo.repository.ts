import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioPrestamo } from "../core/abstract";

@Injectable()
export class MysqlRepositorioPrestamo<T> extends MysqlRepositorioGenerico<T> implements IRepositorioPrestamo<T> {}