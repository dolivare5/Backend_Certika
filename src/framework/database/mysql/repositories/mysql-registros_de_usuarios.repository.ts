import { IRepositorioGenerico } from '../core/abstract/repositorio-generico.abstract';
import { MysqlRepositorioGenerico } from './mysql-generico.repository';
import { IRepositorioRegistrosDeUsuarios } from '../core/abstract';


export class MysqlRepositorioRegistrosDeUsuarios<T> extends MysqlRepositorioGenerico<T> implements IRepositorioRegistrosDeUsuarios<T> {}