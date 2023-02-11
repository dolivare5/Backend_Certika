import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { MysqlDatabaseModule } from "../../framework/database/mysql/mysql-data.module";

@Module({
  controllers: [LibroController],
  providers: [LibroService],
  exports: [LibroService],
  imports: [MysqlDatabaseModule]
})
export class LibroModule {}
