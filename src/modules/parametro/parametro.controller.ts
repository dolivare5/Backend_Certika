import { BadRequestException, Body, Controller, Get, Patch, Post, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { CrearParametroDto } from './dto/crear-parametro.dto';
import { ActualizarParametroDto } from './dto/actualizar-parametro.dto';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Parametro} from "../../framework/database/mysql/entities";

@ApiTags("Parametros")
@Controller('parametros')
export class ParametroController {
    constructor(private readonly parametroService: ParametroService) {}
    
    @ApiResponse({ status: 201, description: 'Parámetro creado correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Post()
    create(@Body() crearParametroDto: CrearParametroDto) {
        return this.parametroService.create(crearParametroDto);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetros encontrados correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Get()
    findAll() {
        return this.parametroService.findAll();
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetro encontrado correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Get('find-one')
    @ApiQuery({ name: 'id', required: true, type: Number })
    findOne(@Query() query) {
        const { id } = query;
        if (id && id > 0) {
            return this.parametroService.findOne(+id);
        }else{
            throw new BadRequestException('El id del parámetro es requerido');
        }
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() actualizarParametroDto: ActualizarParametroDto) {
        return this.parametroService.update(+id, actualizarParametroDto);
    }
}
