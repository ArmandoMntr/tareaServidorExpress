const express = require('express');
const Contenedor = require("./Contenedor");
const app = express()

const container = new Contenedor('test.txt')
app.get('/productos', (request, response) => {
    container.getAll().then(product => response.send(product))
})

app.get('/productoRandom', (request, response) => {
    response.send(container.random())
})
app.get('/', (request, response) => {
    response.send('<a href=/productoRandom>ProductoRandom </a> <br> <a href=/productos> Todos los productos </a>')
})
const server = app.listen(8080, ()=>{
    console.log('HTTP server on port 8080')
})

server.on('error', error => console.log(error))

