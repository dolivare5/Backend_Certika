import { RegistrosDeUsuarios, Parametro, ValorParametro, Usuario } from '../../entities';

import {
    IRepositorioParametro,
    IRepositorioValorParametro,
    IRepositorioUsuario,
    IRepositorioRegistrosDeUsuarios
} from ".";


export abstract class IBaseDeDatosAbstract {
    public abstract readonly parametro: IRepositorioParametro<Parametro>;
    public abstract readonly valorParametro: IRepositorioValorParametro<ValorParametro>;
    public abstract readonly usuario: IRepositorioUsuario<Usuario>;
    public abstract readonly registrosDeUsuarios: IRepositorioRegistrosDeUsuarios<RegistrosDeUsuarios>;
}