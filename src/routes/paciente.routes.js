const express = require('express');

const {
    getPacienteById,
    getAllPacientes,
    updatePaciente,
    deletePaciente
} = require('../controllers/paciente.controller');

A
const router = express.Router();

router.get('/', getAllPacientes);

router.get('/:id', getPacienteById);

router.put('/:id', updatePaciente);

router.delete('/:id', deletePaciente);

module.exports = router;