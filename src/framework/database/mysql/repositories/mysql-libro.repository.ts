import { Injectable } from "@nestjs/common";
import { MysqlRepositorioGenerico } from "./mysql-generico.repository";
import { IRepositorioLibro } from "../core/abstract";

@Injectable()
export class MysqlRepositorioLibro<T> extends MysqlRepositorioGenerico<T> implements IRepositorioLibro<T> {
    public getLibros(): Promise<Object[]> {
        throw new Error("Method not implemented.");
    }
}