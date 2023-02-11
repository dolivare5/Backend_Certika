import { Prestamo } from './../../framework/database/mysql/entities/prestamo.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CrearLibroDto } from './dto/crear-prestamo.dto';
import { IBaseDeDatosAbstract } from "../../framework/database/mysql/core/abstract";
import { Libro } from "../../framework/database/mysql/entities";
import { Autor } from '../../framework/database/mysql/entities/autor.entity';
import { Editorial } from '../../framework/database/mysql/entities/editorial.entity';
import { Categoria } from '../../framework/database/mysql/entities/categoria.entity';
import { ValorParametro } from '../../framework/database/mysql/entities/valor_parametro.entity';
import { Inventario } from '../../framework/database/mysql/entities/inventario.entity';

@Injectable()
export class PrestamoService {
    constructor( private readonly baseDeDatos: IBaseDeDatosAbstract) {}
    
    async crearPrestamo(crearPrestamoDto: CrearLibroDto, id_usuario: number) {
        const { fecha_devolucion, ...prestamo } = crearPrestamoDto;

        const libro : Libro = await this.baseDeDatos.libro.findOne({where: {id: prestamo.id_libro}}, 'Libro');
        const inventario: Inventario = await this.baseDeDatos.inventario.findOne({where: {id_libro: prestamo.id_libro}}, 'Inventario');

        if(libro.cantidad === 0) throw new BadRequestException('No hay existencias de este libro');
        if(inventario.libros_disponibles < prestamo.cantidad) throw new BadRequestException('No hay suficientes existencias de este libro');
        const fecha_devolucion_date = new Date(fecha_devolucion);
        if(fecha_devolucion_date < new Date()) throw new BadRequestException('La fecha de devolucion no puede ser menor a la fecha actual');

        
        return await this.baseDeDatos.prestamo.create({...prestamo, fecha_devolucion: fecha_devolucion_date, id_usuario});
        
    }
    

    async devolverPrestamo(id: number) {
        // Primero se debe validar que el prestamo exista y que no haya sido devuelto
        const prestamo = await this.baseDeDatos.prestamo.findOne({where: {id, devuelto: true}}, 'Prestamo', false);
        if (prestamo){
            throw new BadRequestException('El prestamo ya fue devuelto');
        }
        return await this.baseDeDatos.prestamo.update(id, {devuelto: true, fecha_devolucion_real: new Date()});
    }

    async obtenerTodosLosPrestamos() {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findAll();
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }



    async obtenerPrestamosDevueltos() {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({devuelto: true}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }

    async obtenerPrestamosNoDevueltos() {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({devuelto: false}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }

    async obtenerPrestamosDeUnUsuario(id_usuario: number) {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({id_usuario}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }


    async obtenerPrestamosNoDevueltosPorUnUsuario(id_usuario: number) {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({id_usuario, devuelto: false}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }


    async obtenerPrestamosDevueltosPorUnUsuario(id_usuario: number) {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({id_usuario, devuelto: true}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }

    async obtenerPrestamosPorLibro(id_libro: number) {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({id_libro}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }

    async obtenerPrestamosDevueltosPorUnLibro(id_libro: number) {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({id_libro, devuelto: true}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }

    async obtenerPrestamosNoDevueltosPorUnLibro(id_libro: number) {
        let prestamos : Object[] = await this.baseDeDatos.prestamo.findBy({id_libro, devuelto: false}, {});
        if (prestamos.length === 0) return prestamos;
        prestamos = await this.obtenerInformacionGeneralDeUnPrestamo(prestamos);
        return prestamos;
    }

    
    private async obtenerInformacionGeneralDeUnPrestamo(prestamos: Object[]) {
        for (let i = 0; i < prestamos.length; i++) {
            const prestamo: Prestamo = prestamos[i] as Prestamo;
            const libro : Libro  = await this.baseDeDatos.libro.findOne({where: {id: prestamo.id_libro}}, 'Libro', false);
            const autor: Autor = await this.baseDeDatos.autor.findOne({where: {id: libro.id_autor}}, 'Autor', false);
            const editorial: Editorial = await this.baseDeDatos.editorial.findOne({where: {id: libro.id_editorial}}, 'Editorial', false);
            const categoria: Categoria = await this.baseDeDatos.categoria.findOne({where: {id: libro.id_categoria}}, 'Categoria', false);
            prestamos[i] = {...prestamo, libro, autor, editorial, categoria};
        }
        return prestamos;
    }



}
