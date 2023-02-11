import { Injectable } from '@nestjs/common';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { ActualizarLibroDto } from './dto/actualizar-libro.dto';
import { IBaseDeDatosAbstract } from "../../framework/database/mysql/core/abstract";
import { Libro } from "../../framework/database/mysql/entities";
import { Autor } from '../../framework/database/mysql/entities/autor.entity';
import { Editorial } from '../../framework/database/mysql/entities/editorial.entity';
import { Categoria } from '../../framework/database/mysql/entities/categoria.entity';
import { ValorParametro } from '../../framework/database/mysql/entities/valor_parametro.entity';

@Injectable()
export class LibroService {
    constructor( private readonly baseDeDatos: IBaseDeDatosAbstract) {}
    
    
    async crearLibro(crearLibroDto: CrearLibroDto) {
        const { autor_nombre, editorial_nombre, tipo_de_libro_str, categoria_nombre, ...libroAInsertar } = crearLibroDto;
        const { id_autor, id_editorial, id_categoria, id_tipo_de_libro } = await this.comprobarInformacionLibro(autor_nombre, editorial_nombre, tipo_de_libro_str, categoria_nombre);
        // Se crea el libro
        const libro = await this.baseDeDatos.libro.create({...libroAInsertar, id_autor, id_editorial,  id_categoria,  id_tipo_de_libro});
        return libro;
    }


    async actualizarLibro(id: number, actualizarLibroDto: ActualizarLibroDto) {
        const { autor_nombre, editorial_nombre, tipo_de_libro_str, categoria_nombre, ...libroAActualizar } = actualizarLibroDto;
        const { id_autor, id_editorial, id_categoria, id_tipo_de_libro } = await this.comprobarInformacionLibro(autor_nombre, editorial_nombre, tipo_de_libro_str, categoria_nombre);

        // Se actualiza el libro

        const libro = await this.baseDeDatos.libro.update(id, {...libroAActualizar, id_autor, id_editorial, id_categoria, id_tipo_de_libro});
        return libro;
    }

    async obtenerLibro(id: number) {
        const libro = await this.baseDeDatos.libro.findOne({where: {id}}, 'Libro', false);
        if (!libro) return {mensaje: 'No se encontró el libro'};
        return await this.obtenerIinformacionGeneralLibro([libro]);
    }

    async obtenerTodosLosLibros() {
        const libros: Libro[] = await this.baseDeDatos.libro.findBy({estado: 1}, {});
        console.log(libros);
        
        if (libros.length === 0) return {mensaje: 'No se encontraron libros'};
        return await this.obtenerIinformacionGeneralLibro(libros);
    }


    async obtenerIinformacionGeneralLibro(libros:Object[]) {
        for (let i = 0; i < libros.length; i++) {
            const libro = libros[i] as Libro;
            const [autor, editorial, categoria, tipo_de_libro, inventario] = await Promise.all([
                this.baseDeDatos.autor.findOne({where: {id: libro.id_autor}}, 'Autor', false),
                this.baseDeDatos.editorial.findOne({where: {id: libro.id_editorial}}, 'Editorial', false),
                this.baseDeDatos.categoria.findOne({where: {id: libro.id_categoria}}, 'Categoria', false),
                this.baseDeDatos.valorParametro.findOne({where: {id: libro.id_tipo_de_libro}}, 'ValorParametro', false),
                this.baseDeDatos.inventario.findOne({where: {id_libro: +libro.id}}, 'Inventario', false)
            ]);
            libros[i] = {...libro, autor, editorial, categoria, tipo_de_libro, inventario};
        }
        return libros;
    }

    async eliminarLibro(id: number) {
        await this.baseDeDatos.libro.update(id, {estado: 0});
        return {mensaje: 'Libro eliminado correctamente'};
    }


    private async comprobarInformacionLibro(autor_nombre : string, editorial_nombre:string, tipo_de_libro_str:string, categoria_nombre:string){
        const [id_autor, id_editorial, id_categoria, id_tipo_de_libro] = await Promise.all([
            this.crearAutor(autor_nombre.toUpperCase()),
            this.crearEditorial(editorial_nombre.toUpperCase()),
            this.crearCategoria(categoria_nombre.toUpperCase()),
            this.comprobarTipoDeLibro(tipo_de_libro_str.toUpperCase())
        ]);

        return {id_autor, id_editorial, id_categoria, id_tipo_de_libro};

    }

    
    private async crearAutor(nombre: string): Promise<number>{
        // Se verifica si el autor ya existe
        const autorExiste : Autor = await this.baseDeDatos.autor.findOne({where: {nombre}}, 'Autor', false);
        
        if(autorExiste) return +autorExiste.id;

        // Si no existe, se crea
        const autor : Autor = await this.baseDeDatos.autor.create({nombre});
        return +autor.id;
    }

    private async crearEditorial(nombre: string): Promise<number>{
        // Se verifica si la editorial ya existe
        const editorialExiste : Editorial = await this.baseDeDatos.editorial.findOne({where: {nombre}}, 'Editorial', false);
        
        if(editorialExiste) return editorialExiste.id;

        // Si no existe, se crea
        const editorial : Editorial = await this.baseDeDatos.editorial.create({nombre});
        return +editorial.id;
    }

    private async crearCategoria(nombre: string): Promise<number>{
        // Se verifica si la categoria ya existe
        // @ts-ignore
        const categoriaExiste : Categoria = await this.baseDeDatos.categoria.findOne({where: {nombre}}, 'Categoria', false);
        console.log('categoriaExiste: ', categoriaExiste);
        
        
        if(categoriaExiste) return +categoriaExiste.id;

        // Si no existe, se crea
        const categoria : Categoria = await this.baseDeDatos.categoria.create({nombre});
        
        return +categoria.id;
    }


    private async comprobarTipoDeLibro(tipo_de_libro_str: string): Promise<number>{
        const tipoDeLibro : ValorParametro = await this.baseDeDatos.valorParametro.findOne({where: {nombre: tipo_de_libro_str}}, 'Tipo de libro', false);
        return +tipoDeLibro.id;
    }

}
