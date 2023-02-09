import {BadRequestException, Body, Controller, Get,  Patch, Post, Query} from "@nestjs/common";
import { ParameterService } from './parameter.service';
import { CreateParameterDto } from './dto/create-parameter.dto';
import {UpdateParameterDto} from './dto/update-parameter.dto';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Parametro} from "../../framework/database/mysql/entities";

@ApiTags("Parameters")
@Controller('parameters')
export class ParameterController {
    constructor(private readonly parameterService: ParameterService) {}
    
    @ApiResponse({ status: 201, description: 'Parámetro creado correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Post()
    create(@Body() createParameterDto: CreateParameterDto) {
        return this.parameterService.create(createParameterDto);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetros encontrados correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Get()
    findAll() {
        return this.parameterService.findAll();
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetro encontrado correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Get()
    @ApiQuery({ name: 'id', required: true, type: Number })
    findOne(query: any) {
        const { id } = query;
        if (id && id > 0) {
            return this.parameterService.findOne(+id);
        }else{
            throw new BadRequestException('El id del parámetro es requerido');
        }
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.', type: Parametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch()
    @ApiQuery({ name: 'id', required: true, type: Number })
    update(@Query() query, @Body() updateParameterDto: UpdateParameterDto) {
        const { id } = query;
        if (id && +id > 0) {
            console.log(updateParameterDto);
            return this.parameterService.update(+id, updateParameterDto);
        }else{
            throw new BadRequestException('El id del parámetro es requerido');
        }
    }
}
