import {Module} from "@nestjs/common";
import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {EnvConfiguration} from "../../config/env.config";
import {join} from 'path';

@Module({
    
    imports: [
        MailerModule.forRootAsync({
            
            useFactory: () => ({
                
                transport: {
                    host: EnvConfiguration().emailHost,
                    port: EnvConfiguration().emailPort,
                    secure: false, // Adds STARTTLS support para mandar correos desde gmail
                    auth: {
                        user: EnvConfiguration().emailUser,
                        pass: EnvConfiguration().emailPassword,
                    },
                },
                defaults: {
                    from: `"No Reply" <liberiacertika@gmail.com>`,
                },
                template: {
                    dir: join(__dirname, '/template'),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter()
                    options: {
                        strict: true,
                    }
                }
            })
        })
    ],
})
export class NodeMailerModule {
}
