import {BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import { ParameterValueService } from './parameter_value.service';
import { CreateParameterValueDto } from './dto/create-parameter_value.dto';
import {UpdateParameterValueDto} from './dto/update-parameter_value.dto';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ValorParametro} from "../../framework/database/mysql/entities";

@ApiTags("Parameters Values")
@Controller('parameter_value')
export class ParameterValueController {
    constructor(private readonly parameterValueService: ParameterValueService) {}
    
    @ApiResponse({ status: 201, description: 'Valor Parámetro creado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Post()
    create(@Body() createParameterValueDto: CreateParameterValueDto) {
        return this.parameterValueService.create(createParameterValueDto);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Valor Parámetro actualizado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El valor parámetro no existe.' })
    @Patch(':id')
    update(@Query() query, @Body() updateParameterValueDto: UpdateParameterValueDto) {
        let {id} = query;
        if (id && +id > 0){
            return this.parameterValueService.update(+id, updateParameterValueDto);
        }else{
            throw new BadRequestException('El parámetro id es requerido y debe ser mayor a 0');
        }
    }
}
