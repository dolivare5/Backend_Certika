import { DataSource, DeepPartial, FindOneOptions, QueryRunner, Repository } from "typeorm";
import { IRepositorioGenerico } from "../core/abstract";
import { ExceptionsService } from "../../../../config/exceptions/exceptions.service";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import {isNumber} from "class-validator";
import {v4 as uuidv4} from 'uuid';
import {SendEmailInterface} from "../../../../modules/mail/interfaces/sendEmail.interface";
import {MailerService} from "@nestjs-modules/mailer";
import {EnvConfiguration} from "../../../../config/env.config";
import {ResponseInterface} from "../../../../interfaces/response.interface";

export class MysqlRepositorioGenerico<T> implements IRepositorioGenerico<T> {
    public _repository: Repository<T>;
    public exceptions: ExceptionsService;
    constructor( repository: Repository<T>, private readonly dataSource: DataSource, exceptions: ExceptionsService) {
        this._repository = repository
        this.exceptions = exceptions;
    }
    
    public async findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]> {
        return await this._repository.find({ where, select: options.select });
    }
    
    /**
     * Método que convierte el dto en una entidad de la base de datos.
     * @param entity
     */
    async create(entity: DeepPartial<T>): Promise<T> {
        try {
            /**
             * Se crea una nueva instancia de la entidad que se recibe como parámetro.
             * */
            const entityInstance: T = this._repository.create(entity);
            console.log('Se creó la instancia de la entidad: ', entityInstance);
            /**
             * Se guarda la nueva instancia de la entidad en la base de datos.
             */
            await this._repository.save(entityInstance);
            
            /**
             * Se retorna la nueva instancia de la entidad que se acaba de guardar en la base de datos.
             */
            return entityInstance;
        } catch (error) {
            /**
             * Si ocurre un error, se maneja el error.
             */
            this.handleDBExceptions(error);
        }
    }
    
    
    async findOne(options: FindOneOptions<T>, entity: string, ignoreAuth:boolean = false): Promise<T> | null {
        const entityInstance: T = await this._repository.findOne(options);
        if (!entityInstance) this.exceptions.notFoundException({message: `${entity} no se encontró en la base de datos.`});
        // @ts-ignore
        if (entityInstance.state === 0) this.exceptions.notFoundException({message: `El recurso solicitado no se encuentra disponible por el momento. Contacte al administrador.`});
        if(!ignoreAuth){
            // @ts-ignore
            if (entityInstance.isActive === 0) this.exceptions.forbiddenException({message: 'Por favor, verifique su correo electrónico para activar su cuenta.'});
        }
        return entityInstance;
    }
    
    
    async findAll(where?:FindOptionsWhere<T>,relations?:string[]): Promise<T[]> {
        const relationArray = relations ? relations : [];
        const records: T[] = await this._repository.find({where, relations: relationArray});
        console.log(records);
        if (!records) {
            this.exceptions.notFoundException({message: `No se encontraron registros en la base de datos.`});
        }
        return records;
    }
    
    async findFromCode(code:string): Promise<T> {
        // @ts-ignore
        const records: T = await this._repository.findOne({ where: { code: code} });
        if (!records) {
            this.exceptions.notFoundException({message: `No se encontraron registros en la base de datos.`});
        }
        return records;
    }
    
    async getRegistersPaginated(limit: number, page: number, table:string) : Promise<ResponseInterface> {
        if (!page) page = 1;
        if (!limit) limit = 10;
        const countFieldsTotal = (await this.executeQuery(`SELECT COUNT(id) as count FROM ${table} `))[0].count;
        /**
         * Si el número de página es mayor al número de páginas que existen, se mostrará la última página.
         * Math.ceil() redondea un número hacia arriba.
         */
        if(this.validatePageAndLimit(page, limit, countFieldsTotal)) {
            if (page > Math.ceil(countFieldsTotal / limit)) page = Math.ceil(countFieldsTotal / limit);
            const countFieldsPaginate = await this._repository.query(`SELECT COUNT(*) as count FROM ${table} LIMIT ${limit} OFFSET ${page}`);
            const results : Object[] = await this._repository.query(`SELECT * FROM ${table} LIMIT ${limit} OFFSET ${page}`);
            return {
                countFieldsTotal,
                countFieldsPaginate,
                results,
            };
        }
    }
    
    async searchPaginatedCondition(limit: number, page: number, where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<[T[], number]> {
        const queryBuilder = this._repository.createQueryBuilder();
        /**
         * queryBuilder.where() es el método que se utiliza para agregar condiciones a la consulta.
         * En este caso, se utiliza para agregar la condición where. as any es necesario para evitar un error de compilación.
         * El error se debe a que el tipo de la variable where no es compatible con el tipo de la variable where de
         * queryBuilder.where().
         */
        if (!page) page = 1;
        if (!limit) limit = 1000000;
        if (page > Math.ceil((await this._repository.count({ where })) / limit)) page = Math.ceil((await this._repository.count({ where })) / limit);
        queryBuilder.where(where as any);
        queryBuilder.skip((page - 1) * limit);
        queryBuilder.take(limit);
        queryBuilder.orderBy('id', 'ASC');
        /**
         * queryBuilder.getManyAndCount() es el método que se utiliza para obtener los registros de la página actual y el
         * número total de registros. Este método retorna un arreglo de dos elementos, el primero es el número total de
         * registros y el segundo es el arreglo de registros de la página actual.
         */
        return await queryBuilder.getManyAndCount();
    }
    
    
    async searchAll(value: string, column:string, order?: string, limit?: number, page?: number) : Promise<Object> {
        if (!page) page = 1;
        if (!limit) limit = 10000000;
        /**
         * Se obtiene el número total de registros de la tabla.
         * Si el número de página es mayor al número de páginas que existen, se mostrará la última página.
         */
        const countFieldsTotal = (await this.executeQuery(`SELECT COUNT(id) as count FROM ${this._repository.metadata.tableName} WHERE ${column} LIKE '%${value}%'`))[0].count;
        if (this.validatePageAndLimit(page, limit, countFieldsTotal)) {
            page = Math.ceil(countFieldsTotal / limit);
            if (page > Math.ceil(countFieldsTotal / limit)) page = Math.ceil(countFieldsTotal / limit);
            /**
             * Se obtiene el número total de registros de la página actual.
             */
            const countFieldsPaginate = (await this.executeQuery(`SELECT COUNT(*) as count FROM ${this._repository.metadata.tableName} WHERE ${column} LIKE '%${value}%' LIMIT ${limit} OFFSET ${page}`))[0].count;
            /**
             * Se obtienen los registros de la página actual.
             */
            const results : Object[] = await this._repository.query(`SELECT * FROM ${this._repository.metadata.tableName} WHERE ${column} LIKE '%${value}%' LIMIT ${limit} OFFSET ${page}`);
            return {
                countFieldsTotal,
                countFieldsPaginate,
                results,
            }
        }
    }
    
    
    async update(id: string | number , entity: DeepPartial<T>): Promise<T> {
        
        /**
         * Se hace uso del dataSource para obtener la conexión a la base de datos.
         * El queryRunner permite ejecutar queries en la base de datos.
         */
        const queryRunner = this.dataSource.createQueryRunner();
        /**
         * Se realiza la conexión a la base de datos.
         */
        await queryRunner.connect();
        
        /**
         * Se inicia una transacción. Esto permite que si ocurre un error en el
         * proceso, se deshaga lo que se haya hecho.
         */
        await queryRunner.startTransaction();
        let entityInstance : T;
        if(typeof id === 'string'){
            // @ts-ignore
            const code_table = await this._repository.findOne({ where: { code: id } });
            if (!code_table) {
                this.exceptions.notFoundException({message: `No se encontró el registro`});
            }
            // @ts-ignore
            entityInstance = await this._repository.preload({id: code_table.id, ...entity});
        }else{
            entityInstance = await this._repository.preload({ id, ...entity});
        }
        /**
         * Si no se encuentra la acción de permiso, se lanza una excepción.
         */
        if (!entityInstance) {
            this.exceptions.notFoundException({message: `Los datos del registro a actualizar no son válidos. Intente nuevamente.`});
        }
        try {
            await queryRunner.manager.save(entityInstance);
            /**
             * Se confirman los cambios en la base de datos.
             */
            await queryRunner.commitTransaction();
            /**
             * Se cierra la conexión a la base de datos.
             */
            await queryRunner.release();
            /**
             * Se devuelve la acción de permiso actualizada.
             */
            return entityInstance;
        } catch (error) {
            /**
             * Si ocurre un error, se deshacen los cambios en la base de datos.
             */
            await queryRunner.rollbackTransaction();
            /**
             * Se maneja el error.
             */
            this.handleDBExceptions(error);
        } finally {
            /**
             * Se cierra la conexión a la base de datos.
             */
            await queryRunner.release();
        }
    }
    
    
    async executeQuery(query: string): Promise<any> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const queryExecute = await queryRunner.query(query);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return queryExecute;
        }catch (e) {
            this.handleDBExceptions(e);
        } finally {
            await queryRunner.release();
        }
    }
    
    async getNames(): Promise<any> {
        const query = `SELECT ${this._repository.metadata.tableName}.name FROM ${this._repository.metadata.tableName}`;
        return await this.executeQuery(query);
    }
    
    async isSuperAdmin(code_number): Promise<boolean> {
        return (await this.executeQuery(`
            SELECT EXISTS (SELECT * FROM user u
            JOIN permission_role pr ON u.id_rol = pr.id
            WHERE u.code='${code_number}' AND pr.name = 'Super Admin'
            AND pr.name = 'Super Admin') as exist
        `))[0].exist;
    }
    
    generateCodeUuId(): string {
        return uuidv4();
    }
    
    
    validateDate(date: Date, time): Date {
        try {
            const dateValidate = new Date(date);
            dateValidate.setHours(parseInt(time.split(':')[0]));
            dateValidate.setMinutes(parseInt(time.split(':')[1]));
            dateValidate.setSeconds(0);
            // Se manda un error si la fecha no es válida
            return isNaN(dateValidate.getTime()) ? undefined : dateValidate;
        } catch (e) {
            return undefined;
        }
    }
    
    
    async sendMail(sendEmail: SendEmailInterface, mailerService: MailerService) {
        const {mail, action, subject, template, name, code_auth, from_email, method} = sendEmail;
        const url = `${EnvConfiguration().hostAPI}/users/${action}/${code_auth}`;
        await mailerService.sendMail({
            to: `${mail}`,
            from: ` "Support Team"  <${from_email}>`,
            subject: subject,
            template: template,
            context: {
                name: `${name}`,
                url,
                method,
                code_auth,
            }
        });
    }
    
    public validatePageAndLimit(page: number, limit: number, total:number): boolean {
        if (total === 0){
            this.exceptions.notFoundException({message: 'No se encontraron registros.'});
        }
        if (page > total){
            this.exceptions.badRequestException({message: 'El número de página es mayor al número de páginas'});
        }
        
        if (page <= 0 || limit <= 0) {
            this.exceptions.badRequestException({message: 'El número de página y límite deben ser mayor a 0'});
        }
        if (limit > total) {
            this.exceptions.badRequestException({message: 'El límite debe ser menor o igual al número de registros totales'});
        }
        
        if (page > total) {
            this.exceptions.badRequestException({message: 'El número de página debe ser menor o igual al número de páginas'});
        }
        
        return true;
    }
    
    
    checkHour(hour: string): boolean {
        const hourArray = hour.split(':');
        if (hourArray.length === 2) {
            if (hourArray[0].length === 2 && isNumber(hourArray[0]) && hourArray[1].length === 2 && isNumber(hourArray[1])) {
                return true;
            }
        }
        this.exceptions.badRequestException({message: `La hora ${hour} no es válida. Intente nuevamente.`});
    }
    
    /**
     * Método para manejar las excepciones que puede generar la base de datos.
     * @param error
     * @return void
     */
    handleDBExceptions(error: any): void {
        /**
         * Comprobando si el código de error es 23505, que es el código para
         * una violación de restricción única.
         * */
        if (error.errno === 1062) {
            this.exceptions.badRequestException({message: "Ya existe un registro con los datos proporcionados."});
        }
        if (error.code === '23503') {
            this.exceptions.badRequestException({message: "Los datos proporcionados no son válidos."});
        }
        if (error.code === '23502') {
            this.exceptions.notFoundException({message: error.response.message});
        }
        
        this.exceptions.internalServerErrorException({message: error});
    }
}
