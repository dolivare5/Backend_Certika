import {
    Parametro, ValorParametro,
} from "../../entities";

import {
    IRepositorioParametro,
    IRepositorioValorParametro,
} from ".";


export abstract class IBaseDeDatosAbstract {
    public abstract readonly parametro: IRepositorioParametro<Parametro>;
    public abstract readonly valorParametro: IRepositorioValorParametro<ValorParametro>;
}