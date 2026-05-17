const express = require('express');

const {
    listarUsuarios,
    crearUsuario,
    getUsuarioById
} = require('../controllers/usuario.controller');

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', crearUsuario);
router.get('/:id', getUsuarioById);

module.exports = router;


