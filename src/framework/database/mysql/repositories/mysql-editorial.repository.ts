import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioAutor } from "../core/abstract";

@Injectable()
export class MysqlRepositorioEditorial<T> extends MysqlRepositorioGenerico<T> implements IRepositorioAutor<T> {
   
}