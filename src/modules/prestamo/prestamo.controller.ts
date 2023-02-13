import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CrearLibroDto } from './dto/crear-prestamo.dto';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Prestamo} from "../../framework/database/mysql/entities";
import { Auth } from '../usuario/decorators/auth.decorator';
import { RolesPermitidos } from '../usuario/interfaces/roles-permitidos';

@ApiTags("Prestamos")
@Controller('prestamos')
@Auth()
export class PrestamoController {

    constructor(private readonly prestamoService: PrestamoService) {}

    @ApiResponse({status: 201, description: 'El prestamo ha sido creado correctamente.', type: Prestamo})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario o el código de libro no existe.'})
    @ApiResponse({status: 500, description: 'Internal Server Error: Error interno del servidor.'})
    @Post()
    async crearPrestamo(@Body() crearPrestamoDto: CrearLibroDto, @Req() req) {        
        return this.prestamoService.crearPrestamo(crearPrestamoDto, +req.user.id);
    }

    @ApiResponse({status: 200, description: 'El prestamo ha sido devuelto correctamente.', type: Prestamo})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario o el código de libro no existe.'})
    @ApiResponse({status: 500, description: 'Internal Server Error: Error interno del servidor.'})
    @Patch(':id')
    async devolverPrestamo(@Param('id', ParseIntPipe) id: number) {
        return this.prestamoService.devolverPrestamo(id);
    }

    @ApiResponse({status: 200, description: 'La lista de prestamos ha sido devuelta correctamente.', type: Prestamo, isArray: true})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario o el código de libro no existe.'})
    @ApiResponse({status: 500, description: 'Internal Server Error: Error interno del servidor.'})
    @Get()
    async obtenerPrestamosDeUsuario(@Req() req) {
        return this.prestamoService.obtenerPrestamosDeUnUsuario(+req.user.id);
    }

    @Auth(RolesPermitidos.administrador)
    @ApiResponse({status: 200, description: 'La lista de prestamos ha sido devuelta correctamente.', type: Prestamo, isArray: true})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario o el código de libro no existe.'})
    @ApiResponse({status: 500, description: 'Internal Server Error: Error interno del servidor.'})
    @ApiQuery({
        name: 'obtener', 
        required: false, 
        description: `
            Si no se envía este parámetro, se devolverán todos los prestamos. 
            Si se envía el parámetro "devueltos", se devolverán los prestamos devueltos. 
            Si se envía el parámetro "no-devueltos", se devolverán los prestamos no devueltos. 
            Si se envia el parametro "prestamos-usuario", se devolverán los prestamos de un usuario en específico. 
            Si se envia el parametro "prestamos-no-devueltos-usuario", se devolverán los prestamos no devueltos de un usuario en específico.
            Si se envia el parametro "prestamos-devueltos-usuario", se devolverán los prestamos devueltos de un usuario en específico.
            Si se envia el parametro "prestamos-libro", se devolverán los prestamos de un libro en específico.',
            Si se envia el parametro "prestamos-devueltos-libro", se devolverán los prestamos devueltos de un libro en específico.',
            Si se envia el parametro "prestamos-no-devueltos-libro", se devolverán los prestamos no devueltos de un libro en específico.',
        `
    })
    @ApiQuery({
        name: 'id_libro',
        required: false,
        description: `De acuerdo al parámetro "obtener", se debe enviar el id_lobro o no. Todo depende de lo que se quiera obtener.`
    })
    @Get('listar')
    async obtenerPrestamos(@Query('obtener') obtener: string, @Query('id_libro') id_libro: number, @Req() req) {
        if(!obtener) return this.prestamoService.obtenerTodosLosPrestamos();
        switch(obtener) {
            case 'devueltos':
                return this.prestamoService.obtenerPrestamosDevueltos();
            case 'no-devueltos':
                return this.prestamoService.obtenerPrestamosNoDevueltos();
            case 'prestamos-usuario':
                return this.prestamoService.obtenerPrestamosDeUnUsuario(+req.user.id);
            case 'prestamos-no-devueltos-usuario':
                return this.prestamoService.obtenerPrestamosNoDevueltosPorUnUsuario(+req.user.id);
            case 'prestamos-devueltos-usuario':
                return this.prestamoService.obtenerPrestamosDevueltosPorUnUsuario(+req.user.id);
            case 'prestamos-libro':
                if(!id_libro) throw new BadRequestException('Debe enviar el id_libro');
                return this.prestamoService.obtenerPrestamosPorLibro(id_libro);
            case 'prestamos-devueltos-libro':
                if(!id_libro) throw new BadRequestException('Debe enviar el id_libro');
                return this.prestamoService.obtenerPrestamosDevueltosPorUnLibro(id_libro);
            case 'prestamos-no-devueltos-libro':
                if(!id_libro) throw new BadRequestException('Debe enviar el id_libro');
                return this.prestamoService.obtenerPrestamosNoDevueltosPorUnLibro(id_libro);
            default:
                throw new BadRequestException('El parámetro "obtener" no es válido');   
        }

        
    }

}
