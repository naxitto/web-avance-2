const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 8000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'songss'
}
);
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/guardar_cancion', (req, res) => {
    const { NombreCancion, NombreArtista, DuracionMinutos, DuracionSegundos, Fecha, Genero, Enlace } = req.body;
    const sql = 'INSERT INTO canciones (NombreCancion, NombreArtista, DuracionMinutos, DuracionSegundos, Fecha, Genero, Enlace) VALUES (?,?,?,?,?,?,?)';
    connection.query(sql, [NombreCancion, NombreArtista, DuracionMinutos, DuracionSegundos, Fecha, Genero, Enlace], (err, result) => {
        if (err) throw err;
        console.log('Canción insertada correctamente.');
        res.redirect("/");
    });
});


//http://localhost:8000/canciones


app.get("/canciones", (req, res) => {
    connection.query('SELECT * FROM canciones', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:' +  port);
});

//para insertar una cancion con datos especificados 
let post = {NombreCancion: 'test1', NombreArtista: 'test1', DuracionMinutos: 10, DuracionSegundos: 10, Fecha: '10/10/10', Genero: 'test1', Enlace: 'test1'};
let sql = 'INSERT INTO canciones SET ?';
connection.query(sql, post, function (error, results) {
  if (error) throw error;
  console.log('Registro insertado correctamente.');
});

//para mostrar la lista de datos en consola 
connection.query('SELECT * FROM canciones', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
  
