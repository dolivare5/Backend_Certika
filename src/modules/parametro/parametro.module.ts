import { Module } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { ParametroController } from './parametro.controller';
import { MysqlDatabaseModule } from "../../framework/database/mysql/mysql-data.module";

@Module({
  controllers: [ParametroController],
  providers: [ParametroService],
  exports: [ParametroService],
  imports: [MysqlDatabaseModule]
})
export class ParametroModule {}
