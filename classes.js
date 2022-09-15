/*se exporto el modulo para ejecutarlo los metodos desde el archivo test.js */
const fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  /* Metodo para  Escribir en el archivo*/
  async escribirArchivo(archivo, contenido) {
    try {
      await fs.writeFileSync(
        archivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  /* Metodo para  Leer el archivo*/
  async leerArchivo(archivo) {
    try {
      const data = await fs.readFileSync(archivo, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  /* Metodo para  saber si existe el archivo*/
  saberSiExiste(archivo) {
    try {
      if (!fs.existsSync(archivo)) {
        throw new Error("El archivo no se encontro!!");
      } else {
        return true;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Metodo save para guardar un nuevo producto en el archivo*/
  async save(producto) {
    try {
      /*Primero verifica si existe el archivo, si no exite crea uno nuevo */
      if (!this.saberSiExiste(this.archivo)) {
        console.log(
          `No se encontro el archivo ${this.archivo}\n se procede a crear uno nuevo`
        );
        /*Se crea un objeto vacio */
        let arrayProductos = [];
        /*al ser el primer propducto se le da la id 1 */
        producto["id"] = 1;
        arrayProductos.push(producto);
        console.log("se esta agregando el producto");
        /* se escribe el archivo*/
        await this.escribirArchivo(this.archivo, arrayProductos);
        console.log(`Se agrego un nuevo producto con la id ${producto["id"]}`);
        return producto["id"];
      } else {
        /*Si el archivo existe  primero se verifica si esta vacio*/
        if (this.leerArchivo(this.archivo)) {
          const data = await this.leerArchivo(this.archivo);
          if (data.length === 0) {
            /*si esta vacio  se le asigna la id 1 al primer producto*/
            producto["id"] = 1;
          } else {
            /*Si tiene producto se le asigna la id siguente */
            let ultimoId = data[data.length - 1].id;
            producto["id"] = ultimoId + 1;
          }
          data.push(producto);
          console.log("se esta agregando el producto");
          /*se escribe el producto */
          this.escribirArchivo(this.archivo, data);
          console.log(
            `Se agrego un nuevo producto con la id ${producto["id"]}`
          );
          return producto["id"];
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /*Metodo getById para obtener un producto por la id*/
  async getById(id) {
    try {
      /*Primero verifica si existe el archivo, */
      if (this.saberSiExiste(this.archivo)) {
        const data = await this.leerArchivo(this.archivo);
        /* se filtra el archivo para buscar el producto con la id ingresada */
        const dataId = data.filter((item) => item.id === id);
        if (dataId.length === 0) {
          /* si no existe se lanza un error */
          throw new Error("No se encontro el ID");
        } else {
          console.log(`El producto con la id ${id} :\n`, dataId);

          return dataId;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /*Metodo getAll para obtener todos los productos*/
  async getAll() {
    try {
      /*Primero verifica si existe el archivo, */
      if (this.saberSiExiste(this.archivo)) {
        console.log("se esta leyendo el archivo");
        const data = await this.leerArchivo(this.archivo);
        /* se verifica si el archivo esta vacio */
        if (data.length !== 0) {
          return data;
        } else {
          /*si esta vacio se lanza un error */
          throw new Error(`el archivo ${this.archivo} esta vacio`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /*Metodo deleteById para eliminar un producto por la id*/
  async deleteById(id) {
    try {
      /*Primero verifica si existe el archivo, */
      if (this.saberSiExiste(this.archivo)) {
        console.log(`se esta buscando el producto con la id ${id}`);
        const data = await this.leerArchivo(this.archivo);
        /* se verifica que la id exista */
        if (data.some((item) => item.id === id)) {
          const data = await this.leerArchivo(this.archivo);
          /*se elima el producto */
          const datos = data.filter((item) => item.id !== id);
          this.escribirArchivo(this.archivo, datos);
          console.log(`se borro el producto con la id ${id}`);
        } else {
          /*Si la id no existe se lanza un error */
          throw new Error(`no se encontro el producto con la id ${id}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /*Metodo deleteAll para eliminar todos los  productos */
  async deleteAll() {
    try {
      /*Primero verifica si existe el archivo, */
      if (this.saberSiExiste(this.archivo)) {
        console.log("se esta procediendo a borrar los datos");
        /*Para eliminar se escribe un objeto vacio */
        let nuevo = [];
        await this.escribirArchivo(this.archivo, nuevo);
        console.log(
          `se borraron todos los datos de el archivo ${this.archivo}`
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = Contenedor;
