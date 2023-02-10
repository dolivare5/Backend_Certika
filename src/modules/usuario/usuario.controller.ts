import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { Controller, Post, Body, Query, BadRequestException, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../framework/database/mysql/entities/usuario.entity';
import { IniciarSesionDto } from './dto/iniciar_sesion.dto';

@Controller('usuarios')
@ApiTags('Usuario')
export class UsuarioController {

    constructor( private readonly usuarioService: UsuarioService ) {}

    @ApiResponse({ status: 201, description: 'Usuario registrado correctamente', type: Usuario })
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El código de usuario no existe' })
    @Post()
    registrarUsuario(@Body() crearUsuarioDto: CrearUsuarioDto) {
        return this.usuarioService.registrarUsuario(crearUsuarioDto);
    }


    @ApiResponse({ status: 201, description: 'Cuenta de usuario verificada correctamente', type: Usuario })
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El código de usuario no existe' })
    @ApiQuery({ name: 'codigo_de_verificacion', required: true, type: String })
    @Post('confirmar_cuenta')
    confirmarCuenta(@Query('codigo_de_verificacion') codigo_de_verificacion) {
        if (codigo_de_verificacion) {
            return this.usuarioService.confirmarCuenta(codigo_de_verificacion);
        }else{
            throw new BadRequestException('El código de verificación es requerido');
        }
    }


    @ApiResponse({ status: 201, description: 'Sesión iniciada correctamente', type: Usuario })
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El código de usuario no existe' })
    @Post('iniciar_sesion')
    iniciarSesion(@Body() iniciarSesionDto: IniciarSesionDto, @Req() req) {
        return this.usuarioService.iniciarSesion(iniciarSesionDto, req.ip);
    }


    @ApiResponse({ status: 201, description: 'Sesión cerrada correctamente', type: Usuario })
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El código de usuario no existe' })
    @Post('cerrar_sesion')
    // Obtener el token de autenticación desde el header de la petición
    cerrarSesion(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.usuarioService.cerrarSesion(token);
    }
}