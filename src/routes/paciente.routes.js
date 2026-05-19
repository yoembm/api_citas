const express = require('express');

const {
    getPacienteById,
    getAllPacientes,
    createPaciente,
    updatePaciente,
    deletePaciente
} = require('../controllers/paciente.controller');


const router = express.Router();

router.get('/', getAllPacientes);

router.get('/:id', getPacienteById);

router.post('/', createPaciente);

router.put('/:id', updatePaciente);

router.delete('/:id', deletePaciente);



module.exports = router;