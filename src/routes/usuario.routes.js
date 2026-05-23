const express = require('express');

const {
    listarUsuarios,
    crearUsuario,
    getUsuarioById,
    getUsuarioByCorreo
} = require('../controllers/usuario.controller');

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', crearUsuario);
router.get('/:id', getUsuarioById);
router.get('/login/:correo/:password', getUsuarioByCorreo);

module.exports = router;


