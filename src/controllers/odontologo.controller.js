
const odontologoModel = require("../models/odontologo.model");

const getOdontologos = async (req, res) => {

    try {

        const pool = req.app.locals.pool;

        const odontologos = await odontologoModel.getOdontologos(pool);

        res.json(odontologos);
    } catch (error) {
        console.error('Error al listar odontologos:', error);
        res.status(500).json({ error: 'Error al listar odontologos' });
    }

}   

const getOdontologoById = async (req, res) => {
    
    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const odontologo = await odontologoModel.getOdontologoById(pool, id);

        if (!odontologo) {
            return res.status(404).json({ message: 'Odontologo not found' });
        }

        res.json(odontologo);
    } catch (error) {
        console.error('Error al obtener odontologo por ID:', error);
        res.status(500).json({ error: 'Error al obtener odontologo por ID' });
    }

};

const updateOdontologo = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;
        const odontologo = req.body;

        const result = await odontologoModel.updateOdontologo(
            pool,
            id,
            odontologo
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Odontologo not found' });
        }

        res.json({ message: 'Odontologo updated' });
    } catch (error) {
        console.error('Error al actualizar odontologo:', error);
        res.status(500).json({ error: 'Error al actualizar odontologo' });
    }

};

module.exports = {
    getOdontologoById,
    updateOdontologo,
    getOdontologos
};