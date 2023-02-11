import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { MysqlDatabaseModule } from "../../framework/database/mysql/mysql-data.module";

@Module({
  controllers: [PrestamoController],
  providers: [PrestamoService],
  exports: [PrestamoService],
  imports: [MysqlDatabaseModule]
})
export class PrestamoModule {}
