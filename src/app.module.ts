import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MysqlDatabaseModule } from './framework/database/mysql/mysql-data.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import { ParameterValueModule } from './modules/parameter_value/parameter_value.module';

@Module({
	imports: [
		ConfigModule.forRoot({
            load: [EnvConfiguration],
            validationSchema: JoiValidationSchema
        }),
		MysqlDatabaseModule,
		ParameterModule,
		ParameterValueModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
