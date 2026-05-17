
const historialModel = require("../models/historial.model");

const createHistorial = async (req, res) => {

    try {

        const pool = req.app.locals.pool;
        const historial = req.body;

        const result = await historialModel.createHistorial(
            pool,
            historial
        );

        res.json({
            message: 'Historial created',
            id_insertado: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const getHistorialByPacienteId = async (req, res) => {
    
    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const historial = await historialModel.getHistorialByPacienteId(pool, id);

        if (!historial) {
            return res.status(404).json({ message: 'Historial not found' });
        }

        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial por ID:', error);
        res.status(500).json({ error: 'Error al obtener historial por ID' });
    }

};



module.exports = {
    getHistorialByPacienteId,
    createHistorial
};