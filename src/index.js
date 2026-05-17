

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
    host: 'localhost',
    user: 'root',
    password: 'Kemela0810',
    database: 'citasbd',
    port: 3306
});

app.locals.pool = pool;




app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

