import { Module } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterController } from './parameter.controller';
import { MysqlDatabaseModule } from "../../framework/database/mysql/mysql-data.module";

@Module({
  controllers: [ParameterController],
  providers: [ParameterService],
  exports: [ParameterService],
  imports: [MysqlDatabaseModule]
})
export class ParameterModule {}
