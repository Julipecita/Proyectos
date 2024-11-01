const express = require('express');
const connection = require('./db');
const path = require('path');


const app = express();

//encargado de parsear a los json
app.use(express.json());

app.use(express.urlencoded({extended:true}));

// Archivos html
app.use(express.static(path.join(__dirname, 'templates')));


//Ruta d Prueba
/*
app.get ('/api/prueba', (req, res)=>{

    res.send('Api funcionado de manera correcta');

});
*/

app.get('/api/prueba1', (req, res)=>{

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

// Obtener registros de la base de datos
app.get('/api/obtener', (req,res) => {

    const query = 'select * from Persona'; 
    connection.query(query, (error, result)=>{

        if(error){
            res.status(500).json({

                success: false,
                message: "Error al recuperar los datos",
                details: error.message

            });
        }else{
            res.status(200).json({

                success: true,
                message: "Datos de la tabla",
                data: result 

            });
        }

    });

});

// API para eliminar registro
app.delete('/api/eliminar/:Cedula', (req,res)=>{

    const {cedula}= req.params;
    const query = 'DELETE FROM Persona WHERE Cedula = ?';
    connection.query(query, [Cedula], (error, result)=>{

        if(error){
            res.status(500).json({

                success: false,
                message: "Error al Eliminar el registro",
                details: error.message
               
            });
        }else{
res.status(200).json({

                success: true,
                message: "Dato eliminado de la tabla",
                data: result 

            });
        }


    });




});

//Api actualizar

app.put('/api/actualizar/:Cedula', (req,res)=>{

    const {Cedula} = req.params;

    const {Nombre, Edad, Profesion} =req.body;

    const query = 
    'UPDATE Persona SET Nombre = COALESCE(?,Nombre), Edad = COALESCE (?,Edad), Profesion = COALESCE (?,Profesion), Where Cedula = ?';

    connection.query(query, [Cedula, Nombre, Edad, Profesion], (error, result)=>{

        if(error){
            res.status(500).json({

                success: false,
                message: "Error al Actualizar",
                details: error.message
               
            });
        }else{
res.status(200).json({

                success: true,
                message: "Persona actualizada",
                data: result 

        });

     }   

    });

});


//Puerto de conexio del servidor


const PORT = 3000;

app.listen(PORT, ()=>{

    console.log('Servidor corriendo');

});