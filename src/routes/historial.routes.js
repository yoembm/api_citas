const express = require('express');

const {
    getHistorialByPacienteId,
    getAllHistoriales,
    createHistorial
} = require('../controllers/historial.controller');

const router = express.Router();

router.get('/:id',getHistorialByPacienteId);
router.get('/', getAllHistoriales);
router.post('/', createHistorial);


module.exports = router;

