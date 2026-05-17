const express = require('express');

const {
    getPacienteById,
    updatePaciente
} = require('../controllers/paciente.controller');

const router = express.Router();

router.get('/:id', getPacienteById);
router.put('/:id', updatePaciente);


module.exports = router;