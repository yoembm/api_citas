const express = require('express');

const {
    crearSede,
    listarSedes,
    getSedeById,
    updateSede
} = require('../controllers/sede.controller');

const router = express.Router();

router.get('/', listarSedes);
router.post('/', crearSede);
router.get('/:id', getSedeById);
router.put('/:id', updateSede);


module.exports = router;