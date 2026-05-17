const express = require('express');

const {
    getOdontologoById,
    updateOdontologo
} = require('../controllers/odontologo.controller');

const router = express.Router();

router.get('/:id', getOdontologoById);
router.put('/:id', updateOdontologo);


module.exports = router;