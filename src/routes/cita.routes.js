const express = require('express');

const {
    crearCita,
    listarCitas,
    getCitaByPacienteId,
    getCitaByOdontologoId,
    updateCita
} = require('../controllers/cita.controller');

const router = express.Router();

router.get('/', listarCitas);
router.post('/', crearCita);
router.get('/paciente/:id', getCitaByPacienteId);
router.get('/odontologo/:id', getCitaByOdontologoId);
router.put('/:id', updateCita);


module.exports = router;