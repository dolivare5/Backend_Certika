import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { EnvConfiguration } from "../../config/env.config";
import {NodeMailerModule} from "../mail/mail.module";
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { MysqlDatabaseModule } from '../../framework/database/mysql/mysql-data.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, JwtStrategy],
    exports:  [UsuarioService, JwtStrategy, PassportModule, JwtModule],
    imports: [
        MysqlDatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => {
                return {
                    secret: EnvConfiguration().jwtSecret,
                    signOptions: { expiresIn: '7d', algorithm: 'HS512' }
                }
            }
        }),
        NodeMailerModule
    ],
    
})
export class UsuarioModule {}
