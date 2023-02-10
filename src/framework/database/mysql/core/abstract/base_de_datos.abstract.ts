import { RegistrosDeUsuarios, Parametro, ValorParametro, Usuario, Autor, Categoria, Libro, Editorial } from '../../entities';

import {
    IRepositorioParametro,
    IRepositorioValorParametro,
    IRepositorioUsuario,
    IRepositorioRegistrosDeUsuarios,
    IRepositorioAutor,
    IRepositorioEditorial,
    IRepositorioLibro,
    IRepositorioCategoria
} from ".";


export abstract class IBaseDeDatosAbstract {
    public abstract readonly parametro: IRepositorioParametro<Parametro>;
    public abstract readonly valorParametro: IRepositorioValorParametro<ValorParametro>;
    public abstract readonly usuario: IRepositorioUsuario<Usuario>;
    public abstract readonly registrosDeUsuarios: IRepositorioRegistrosDeUsuarios<RegistrosDeUsuarios>;
    public abstract readonly autor: IRepositorioAutor<Autor>;
    public abstract readonly editorial: IRepositorioEditorial<Editorial>;
    public abstract readonly libro: IRepositorioLibro<Libro>;
    public abstract readonly categoria: IRepositorioCategoria<Categoria>;
}