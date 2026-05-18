

const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

//const usuarioRoutes = require('./routes/usuario.routes');


//optional
const cors = require("cors")

const app = express();
const PORT = 3000;

// optional
app.use(cors())

app.use(bodyParser.json());


const pool = mysql.createPool({
    host: 'mydbaws.c3uccy9zqpar.us-east-1.rds.amazonaws.com',
    user: 'usuario',
    password: 'contrabd$',
    database: 'citasbd',
    port: 3306
});

app.locals.pool = pool;



app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/sedes', require('./routes/sede.routes'));
app.use('/api/odontologos', require('./routes/odontologo.routes'));
app.use('/api/historial', require('./routes/historial.routes'));
app.use('/api/horarios', require('./routes/horario.routes'));
app.use('/api/citas', require('./routes/cita.routes'));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

