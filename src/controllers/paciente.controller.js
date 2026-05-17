
const pacienteModel = require("../models/paciente.model");


const getPacienteById = async (req, res) => {
    
    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const paciente = await pacienteModel.getPacienteById(pool, id);

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente not found' });
        }

        res.json(paciente);
    } catch (error) {
        console.error('Error al obtener paciente por ID:', error);
        res.status(500).json({ error: 'Error al obtener paciente por ID' });
    }

};

const updatePaciente = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;
        const paciente = req.body;

        const result = await pacienteModel.updatePaciente(
            pool,
            id,
            paciente
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paciente not found' });
        }

        res.json({ message: 'Paciente updated' });
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ error: 'Error al actualizar paciente' });
    }

};

module.exports = {
    getPacienteById,
    updatePaciente
};