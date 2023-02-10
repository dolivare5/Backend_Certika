import { Module } from '@nestjs/common';
import { ValorParametroService } from './valor_parametro.service';
import { ValorParametroController } from './valor_parametro.controller';
import { MysqlDatabaseModule } from "../../framework/database/mysql/mysql-data.module";

@Module({
  controllers: [ValorParametroController],
  providers: [ValorParametroService],
  exports: [ValorParametroService],
  imports: [MysqlDatabaseModule]
})
export class ValorParametroModule {}
