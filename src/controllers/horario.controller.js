
const horarioModel = require("../models/horario.model");
const citaModel = require("../models/cita.model");

const createHorario = async (req, res) => {

    try {

        const pool = req.app.locals.pool;
        const horario = req.body;

        const result = await horarioModel.createHorario(
            pool,
            horario
        );

        res.json({
            message: 'Horario created',
            id_insertado: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getHorarios = async (req, res) => {

    try {

        const pool = req.app.locals.pool;

        const horarios = await horarioModel.getHorarios(pool);

        res.json(horarios);

    } catch (error) {
        console.error('Error al listar horarios:', error);
        res.status(500).json({ error: 'Error al listar horarios' });
    }

};



const generarHoras = (horaInicio, horaFin, horasOcupadas) => {

    const horas = [];

    let inicio = parseInt(horaInicio.split(':')[0]);
    const fin = parseInt(horaFin.split(':')[0]);

    while (inicio < fin) {

        const hora = `${inicio.toString().padStart(2, '0')}:00`;
        if (!horasOcupadas.includes(hora)) {
            horas.push(hora);
        }

        inicio++;
    }

    return horas;
};


const getHorarioByOdontologoId = async (req, res) => {

    try {
        const pool = req.app.locals.pool;
        const id = req.params.id;
        const date = req.params.date;

        const horario = await horarioModel.getHorarioByOdontologoId(pool, id, date);

        if (!horario) {
            return res.status(404).json({ message: 'Horario not found' });
        }

        const horasOcupadas = await citaModel.getCitasOcupadasOdontologoFecha(pool, id, date);

        console.log('Horas ocupadas:', horasOcupadas);

        //horario.horas_disponibles = generarHoras(horario.hora_inicio, horario.hora_fin, horasOcupadas);


        const horas_disponibles = generarHoras(horario.hora_inicio, horario.hora_fin, horasOcupadas);

        console.log('Horas disponibles:', horas_disponibles);
        res.json(horas_disponibles);


    } catch (error) {
        console.error('Error al obtener horario por ID:', error);
        res.status(500).json({ error: 'Error al obtener horario por ID' });
    }

};



module.exports = {
    createHorario,
    getHorarioByOdontologoId,
    getHorarios
};