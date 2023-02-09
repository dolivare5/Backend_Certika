import { Module } from '@nestjs/common';
import { ParameterValueService } from './parameter_value.service';
import { ParameterValueController } from './parameter_value.controller';
import { MysqlDatabaseModule } from "../../framework/database/mysql/mysql-data.module";

@Module({
  controllers: [ParameterValueController],
  providers: [ParameterValueService],
  exports: [ParameterValueService],
  imports: [MysqlDatabaseModule]
})
export class ParameterValueModule {}
