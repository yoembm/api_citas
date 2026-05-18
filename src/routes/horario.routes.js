const express = require('express');

const {
    getHorarioByOdontologoId,
    createHorario,
    getHorarios
} = require('../controllers/horario.controller');

const router = express.Router();


router.post('/', createHorario);
router.get('/:id/:date', getHorarioByOdontologoId);
router.get('/', getHorarios);


module.exports = router;

