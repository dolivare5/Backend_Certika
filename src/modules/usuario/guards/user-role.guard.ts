import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { IBaseDeDatosAbstract } from "../../../framework/database/mysql/core/abstract";
import {ExceptionsService} from "../../../config/exceptions/exceptions.service";
import {Reflector} from "@nestjs/core";
import {META_ROLES} from "../decorators/role-protected.decorator";
import { RolesPermitidos } from '../interfaces/roles-permitidos';
import { Usuario } from "../../../framework/database/mysql/entities";

@Injectable()
export class UserRoleGuard implements CanActivate {
    private readonly exceptionService: ExceptionsService = new ExceptionsService();
    constructor(
        private readonly servicioDeBaseDeDatos: IBaseDeDatosAbstract,
        private readonly reflector: Reflector
    ) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const asyncFunction = async () => {
            let roles_permitidos: string[] = this.reflector.get(META_ROLES, context.getHandler());
            console.log(context.switchToHttp().getRequest());
            const pathUrl = context.switchToHttp().getRequest().url;
            const user = context.switchToHttp().getRequest().user as Usuario;
            context.switchToHttp().getRequest().url;
            const token = context.switchToHttp().getRequest().rawHeaders[1].split(' ')[1];
            console.log('token', token);
            const tipoDeUsuario = (await this.servicioDeBaseDeDatos.usuario.executeQuery(`
                SELECT vp.id, LOWER(vp.nombre) AS rol FROM usuario u
                JOIN valor_parametro vp ON u.id_rol = vp.id
                JOIN registros_de_usuarios ru ON u.id = ru.id_usuario
                WHERE ru.token = '${token}' AND ru.fecha_salida IS NULL
                
            `))[0] ;
            console.log('tipoDeUsuario', tipoDeUsuario);
            
            if(!roles_permitidos || roles_permitidos.length === 0) roles_permitidos = [RolesPermitidos.usuario_conencional];
            if(roles_permitidos.includes(tipoDeUsuario.rol)) return true;

            this.exceptionService.forbiddenException({message: 'No tienes permisos para acceder a este recurso'});
            return false;
            
        };
        return asyncFunction();
        
        
    }
}
