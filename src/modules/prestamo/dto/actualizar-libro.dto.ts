import { PartialType } from '@nestjs/swagger';
import { CrearLibroDto } from './crear-prestamo.dto';

export class ActualizarLibroDto extends PartialType(CrearLibroDto) {}
