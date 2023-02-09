import {BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import { ValorParametroService } from './valor_parametro.service';
import { CrearValorParametroDto } from './dto/crear-valor_parametro.dto';
import { ActualizarValorParametroDto } from './dto/actualizar-valor_parametro.dto';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ValorParametro} from "../../framework/database/mysql/entities";

@ApiTags("Valores Parámetros")
@Controller('valores_parametros')
export class ValorParametroController {
    constructor(private readonly valorParametroService: ValorParametroService) {}
    
    @ApiResponse({ status: 201, description: 'Valor Parámetro creado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Post()
    create(@Body() crearValorParametroDto: CrearValorParametroDto) {
        return this.valorParametroService.create(crearValorParametroDto);
    }
    

    @ApiResponse({ status: 201, description: 'Valor Parámetro encontrado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.valorParametroService.findOne(id);
    }

    
    @ApiResponse({ status: 201, description: 'Valor Parámetro actualizado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El valor parámetro no existe.' })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id : number, @Body() actualizarValorParametroDto: ActualizarValorParametroDto) {
        return this.valorParametroService.update(+id, actualizarValorParametroDto);
    }
}
