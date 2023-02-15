import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { DeepPartial, FindOneOptions } from "typeorm";
import {SendEmailInterface} from "../../../../../modules/mail/interfaces/sendMail.interface";
import {MailerService} from "@nestjs-modules/mailer";
import {ResponseInterface} from "../../../../../interfaces/response.interface";

export abstract class IRepositorioGenerico<T> {
    
    public abstract findAll(where?:object,relations?:string[]): Promise<T[]>;
    
    public abstract findFromCode(code:string): Promise<T>;
    
    public abstract findOne(options: FindOneOptions<T>, entity: string, lanzarExepcion?:boolean): Promise<T | null>;
    
    public abstract searchPaginatedCondition(page: number, limit: number, where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<[T[], number]>;
    
    public abstract findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]>;
    
    public abstract searchAll(value: string, column: string, order?: string, limit?: number, page?: number): Promise<Object>;
    
    public abstract create(entity: DeepPartial<T>): Promise<T>;
    
    public abstract update(id: string | number, entity: DeepPartial<T>): Promise<T>;
    
    public abstract executeQuery(query: string): Promise<any>;
    
    public abstract isSuperAdmin(code: string): Promise<boolean>;
    
    public abstract getRegistersPaginated(limit: number, page: number, table: string): Promise<ResponseInterface>;
    
    public abstract getNames(): Promise<string[]>;
    
    public abstract checkHour(hour: string): boolean;

    public abstract sendMail(sendEmail: SendEmailInterface, mailerService: MailerService, ruta:string) : Promise<any>;

    public abstract validateDate(date: Date, time: any): Date;
    
    public abstract validatePageAndLimit(page: number, limit: number, total:number): boolean;
    
    public abstract generateCodeUuId(): string;
}
