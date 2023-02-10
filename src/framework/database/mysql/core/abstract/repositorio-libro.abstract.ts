import { IRepositorioGenerico } from './repositorio-generico.abstract';

export abstract class IRepositorioLibro<T> extends IRepositorioGenerico<T> {
    public abstract getLibros(): Promise<Object[]>;
}