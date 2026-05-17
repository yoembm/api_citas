
const usuarioModel = require("../models/usuario.model");

const listarUsuarios = async (req, res) => {


    try {

        const pool = req.app.locals.pool;

        const usuarios = await usuarioModel.getUsuarios(pool);

        res.json(usuarios);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ error: 'Error al listar usuarios' });
    }

}


const crearUsuario = async (req, res) => {

    try {

        const pool = req.app.locals.pool;
        const paciente = req.body;

        const result = await usuarioModel.createUsuario(
            pool,
            paciente
        );

        res.json({
            message: 'Usuario created',
            id_insertado: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const getUsuarioById = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const usuario = await usuarioModel.getUsuarioById(pool, id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }

};

module.exports = {
    listarUsuarios,
    crearUsuario,
    getUsuarioById
};