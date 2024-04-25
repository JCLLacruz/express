const express = require('express');
const app = express();

app.get('/', (req,res) =>{
    res.send('Bienvenido!!');
});

app.get('/Productos',(requ,res) => {
    res.send('Listado de productos.');
});

app.post('/Productos',(req,res) => {
    res.status(201).send('Crear un producto');
});

app.put('/Productos',(req,res) => {
    res.send('Actualizar un producto');
});

app.delete('/Productos',(req,res) => {
    res.send('Borrar un producto');
});

app.get('/Usuarios',(req,res) => {
    res.send('Listado de usuarios');
});

app.post('/Usuarios',(req,res) => {
    res.status(201).send('Crear un usuario');
});

app.put('/Usuarios',(req,res) => {
    res.send('Actualizar un usuario');
});

app.delete('/Usuarios',(req,res) => {
    res.send('Borrar un usuario');
});

app.listen(3000,()=>{
    console.log('Servidor levantado');
});