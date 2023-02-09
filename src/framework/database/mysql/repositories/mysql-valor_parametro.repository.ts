import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioValorParametro } from "../core/abstract";

@Injectable()
export class MysqlRepositorioValorParametro<T> extends MysqlRepositorioGenerico<T> implements IRepositorioValorParametro<T>
{
    
   
}
