/* >> Consigna:
# Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:

# Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor

# Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles


Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
 */

const express = require("express");
const Contenedor = require("./classes");

//! ==== Intancio la clase ====
const productos = new Contenedor("productos.txt");

//! ==== Inicio el SERVIDOR ====
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

//! ==== Pagina Home ====
app.get("/", (req, res) => {
  res.send(
    "<h1 style='color:blue; text-align:center'>Bienvenido a Rocka Music</h1>"
  );
});

//! ==== Pagina Productos ====
app.get("/productos", (req, res) => {
  // aync await porque debo hacer un llamado de productos con getAll() y luego guardarlos
  const run = async () => {
    let productosArray = await productos.getAll();
    // creo una plantilla para imprimir por pantalla
    let plantilla = ``;
    productosArray.map(
      (instrumento) =>
        (plantilla += `<h1>${instrumento.title}</h1>
    <h3>Precio: ${instrumento.price}</h3>
    <img width="80px" height="auto" src="${instrumento.thumbnail}">`)
    );
    res.send(plantilla);
  };
  run();
});

//! ==== Pagina Producto Random ====
app.get("/productoRandom", async (req, res) => {
  const instrumentos = await productos.getAll();
  const numeroRandom = Math.floor(Math.random() * instrumentos.length);
  let plantilla = `<h1>Producto random</h1>  <h2>${instrumentos[numeroRandom].title}</h2> <h4>Precio: $${instrumentos[numeroRandom].price}</h4> <img width="80" height="auto" src="${instrumentos[numeroRandom].thumbnail}">`;
  res.send(plantilla);
});
