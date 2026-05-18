
const citaModel = require("../models/cita.model");

const crearCita = async (req, res) => {

    try {

        const pool = req.app.locals.pool;
        const cita = req.body;

        const result = await citaModel.createCita(
            pool,
            cita
        );

        res.json({
            message: 'Cita created',
            id_insertado: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



const listarCitas = async (req, res) => {


    try {

        const pool = req.app.locals.pool;

        const citas = await citaModel.getCitas(pool);

        res.json(citas);
        
    } catch (error) {
        console.error('Error al listar citas:', error);
        res.status(500).json({ error: 'Error al listar citas'});
    }

}



const getCitaByPacienteId = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const cita = await citaModel.getCitasByPacienteId(pool, id);

        if (!cita) {
            return res.status(404).json({ message: 'Cita not found' });
        }

        res.json(cita);
    } catch (error) {
        console.error('Error al obtener cita por ID paciente:', error);
        res.status(500).json({ error: 'Error al obtener cita por ID paciente' });
    }

};



const getCitaByOdontologoId = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const cita = await citaModel.getCitasByOdontologoId(pool, id);

        if (!cita) {
            return res.status(404).json({ message: 'Cita not found' });
        }

        res.json(cita);
    } catch (error) {
        console.error('Error al obtener cita por ID odontologo:', error);
        res.status(500).json({ error: 'Error al obtener cita por ID odontologo' });
    }

};


const updateCita = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;
        const cita = req.body;

        const result = await citaModel.updateCita(
            pool,
            id,
            cita
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cita not found' });
        }

        res.json({ message: 'Cita updated' });
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        res.status(500).json({ error: 'Error al actualizar cita' });
    }

};

module.exports = {
    listarCitas,
    crearCita,
    getCitaByPacienteId,
    getCitaByOdontologoId,
    updateCita
};  