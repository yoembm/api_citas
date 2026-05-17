const express = require('express');

const {
    getHistorialByPacienteId,
    createHistorial
} = require('../controllers/historial.controller');

const router = express.Router();

router.get('/:id', getHistorialByPacienteId);
router.post('/', createHistorial);


module.exports = router;

