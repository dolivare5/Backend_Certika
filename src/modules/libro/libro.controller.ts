import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from "@nestjs/common";
import { LibroService } from './libro.service';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { ActualizarLibroDto } from './dto/actualizar-libro.dto';
import { ApiResponse, ApiTags} from "@nestjs/swagger";
import {Libro} from "../../framework/database/mysql/entities";
import { Auth } from '../usuario/decorators/auth.decorator';
import { RolesPermitidos } from '../usuario/interfaces/roles-permitidos';

@ApiTags("Libros")
@Controller('libros')
@Auth()
export class LibroController {

    constructor(private readonly libroService: LibroService) {}

    @Auth(RolesPermitidos.administrador)
    @ApiResponse({status: 201, description: 'El libro ha sido creado correctamente', type: Libro})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario no existe'})
    @Post()
    crearLibro(@Body() crearLibroDto: CrearLibroDto) {
        return this.libroService.crearLibro(crearLibroDto);
    }

    @ApiResponse({status: 200, description: 'Listado de libros obtenidos correctamente',})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario no existe'})
    @Get()
    obtenerLibros() {
        return this.libroService.obtenerTodosLosLibros();
    }

    @ApiResponse({status: 200, description: 'El libro ha sido obtenido correctamente', type: Libro})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario no existe'})
    @Get(':id')
    obtenerLibro(@Param('id', ParseIntPipe) id: number) {
        return this.libroService.obtenerLibro(id);
    }


    @Auth(RolesPermitidos.administrador)
    @ApiResponse({status: 200, description: 'El libro ha sido actualizado correctamente', type: Libro})
    @ApiResponse({status: 400, description: 'Bad Request: Verifique los datos de entrada'})
    @ApiResponse({status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción'})
    @ApiResponse({status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.'})
    @ApiResponse({status: 404, description: 'Not Found: El código de usuario no existe'})
    @Patch(':id')
    actualizarLibro(@Param('id', ParseIntPipe) id: number, @Body() actualizarLibroDto: ActualizarLibroDto) {
        return this.libroService.actualizarLibro(id, actualizarLibroDto);
    }

}
