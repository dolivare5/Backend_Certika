import {PartialType} from "@nestjs/swagger";

import {CreateRelationParamsValuesDto} from "./create-relations_params_values.dto";



export class UpdateRelationParamsValuesDto extends PartialType(CreateRelationParamsValuesDto) {}
