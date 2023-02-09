import { ValorParametroModule } from './modules/valor_parametro/valor_parametro.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MysqlDatabaseModule } from './framework/database/mysql/mysql-data.module';
import { ParametroModule } from './modules/parametro/parametro.module';
import { SwaggerConfig } from './config/swagger/swagger';

@Module({
	imports: [
		ConfigModule.forRoot({
            load: [EnvConfiguration],
            validationSchema: JoiValidationSchema
        }),
		SwaggerConfig,
		MysqlDatabaseModule,
		ParametroModule,
		ValorParametroModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
