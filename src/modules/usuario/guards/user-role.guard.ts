import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { IBaseDeDatosAbstract } from "../../../framework/database/mysql/core/abstract";
import { Usuario } from "../../../framework/database/mysql/entities";
import {ExceptionsService} from "../../../config/exceptions/exceptions.service";

@Injectable()
export class UserRoleGuard implements CanActivate {
    private readonly exceptionService: ExceptionsService = new ExceptionsService();
    constructor(private readonly servicioDeBaseDeDatos: IBaseDeDatosAbstract) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const asyncFunction = async () => {
            const pathUrl = context.switchToHttp().getRequest().url;
            const user = context.switchToHttp().getRequest().user as Usuario;
            const token = context.switchToHttp().getRequest().rawHeaders[1].split(' ')[1];
            const tipoDeUsuario = (await this.servicioDeBaseDeDatos.usuario.executeQuery(`
                SELECT vp.id, LOWER(vp.nombre) AS rol FROM usuario u
                JOIN valor_parametro vp ON u.id_rol = vp.id
                JOIN registros_de_usuarios ru ON u.id = ru.id_usuario
                WHERE ru.token = '${token}' AND ru.fecha_salida IS NULL
                
            `))[0] ;
            if (tipoDeUsuario && (tipoDeUsuario.rol === 'admin' || tipoDeUsuario.rol === 'superadmin' || tipoDeUsuario.rol === 'usuario convencional')){
                return true;
            }
            else {
                this.exceptionService.forbiddenException({message: 'No tienes permisos para acceder a este recurso'});
                return false;
            }        
        };
        return asyncFunction();
    }
}
