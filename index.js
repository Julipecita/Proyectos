const express = require('express');
const connection = require('./db');
const app = express();

//encargado de parsear a los json
app.use(express.json());


//Ruta d Prueba
/*
app.get ('/api/prueba', (req, res)=>{

    res.send('Api funcionado de manera correcta');

});
*/

app.get('/api/prueba1', (eq, res)=>{

    res.status(200).json({

        message: 'LA API RESPONDE CORRECTAMANTE',
        port: PORT,
        status: 'success',
    });
});


//Crear registro
app.post('/api/guardar', (req, res)=>{

    const {Cedula, Nombre, Edad, Profesion} = req.body;

    const query = 'INSERT INTO Persona (Cedula, Nombre, Edad, Profesion) VALUES(?, ?, ?, ?)';
    connection.query(query, [Cedula, Nombre, Edad, Profesion], (error, result)=>{

        if(error){
            res.status(500).json({error});
        }else{
            res.status(201).json({Cedula: result.insertId, Cedula, Nombre, Edad, Profesion});
        }
    });
});




//Puerto de conexio del servidor


const PORT = 3000;

app.listen(PORT, ()=>{

    console.log('Servidor corriendo');

});