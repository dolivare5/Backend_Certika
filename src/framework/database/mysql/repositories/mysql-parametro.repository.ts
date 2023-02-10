import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioParametro } from "../core/abstract";

@Injectable()
export class MysqlRepositorioParametro<T> extends MysqlRepositorioGenerico<T> implements IRepositorioParametro<T>
{}
