const express = require('express');
const Contenedor = require("./Contenedor");
const app = express()

const container = new Contenedor('test.txt')
// container.save({
//     "title": "Escuadra",
//     "price": 48,
//     "thumbnail": "https://image.shutterstock.com/image-photo/wooden-simple-classic-ruler-triangle-600w-1691594920.jpg"
//   })
// container.save({
//     "title": "Escuadra",
//     "price": 48,
//     "thumbnail": "https://image.shutterstock.com/image-photo/wooden-simple-classic-ruler-triangle-600w-1691594920.jpg"
//   })
app.get('/productos', (request, response) => {
    container.getAll().then(product => response.send(product))
})

app.get('/productoRandom', (request, response) => {
    container.getRandom().then(product => response.send(product))
})
const styleA = 'style="margin: 10px; cursor: pointer; text-decoration: none; color: red;"'
const styleD = 'style="display: flex; justify-content:center"'
app.get('/', (request, response) => {
    response.send(`
    <div ${styleD}> 
    
    <a ${styleA} " href=/productoRandom>Producto Random </a>  
    
    <a ${styleA} href=/productos> Todos los productos </a>
    </div>`)
})
const server = app.listen(8080, ()=>{
    console.log('HTTP server on port 8080')
})

server.on('error', error => console.log(error))

