const express = require('express');

const {
    getOdontologoById,
    updateOdontologo,
    getOdontologos
} = require('../controllers/odontologo.controller');

const router = express.Router();

router.get('/:id', getOdontologoById);
router.get('/', getOdontologos);
router.put('/:id', updateOdontologo);


module.exports = router;