import { PartialType } from '@nestjs/swagger';
import { CreateParameterValueDto } from './create-parameter_value.dto';

export class UpdateParameterValueDto extends PartialType(CreateParameterValueDto) {}
