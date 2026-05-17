
const sedeModel = require("../models/sede.model");

const crearSede = async (req, res) => {

    try {

        const pool = req.app.locals.pool;
        const sede = req.body;

        const result = await sedeModel.createSede(
            pool,
            sede
        );

        res.json({
            message: 'Sede created',
            id_insertado: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



const listarSedes = async (req, res) => {


    try {

        const pool = req.app.locals.pool;

        const sedes = await sedeModel.getSedes(pool);

        res.json(sedes);
        
    } catch (error) {
        console.error('Error al listar sedes:', error);
        res.status(500).json({ error: 'Error al listar sedes'});
    }

}



const getSedeById = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;

        const sede = await sedeModel.getSedeById(pool, id);

        if (!sede) {
            return res.status(404).json({ message: 'Sede not found' });
        }

        res.json(sede);
    } catch (error) {
        console.error('Error al obtener sede por ID:', error);
        res.status(500).json({ error: 'Error al obtener sede por ID' });
    }

};

const updateSede = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;
        const sede = req.body;

        const result = await sedeModel.updateSede(
            pool,
            id,
            sede
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sede not found' });
        }

        res.json({ message: 'Sede updated' });
    } catch (error) {
        console.error('Error al actualizar sede:', error);
        res.status(500).json({ error: 'Error al actualizar sede' });
    }

};

module.exports = {
    listarSedes,
    crearSede,
    getSedeById,
    updateSede
};  