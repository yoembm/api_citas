const createHorario = async (
    pool,
    horario
) => {

    const [result] = await pool.query(
        `
    INSERT INTO horario_atencion
    (id_odontologo, dia_semana, hora_inicio, hora_fin)
    VALUES (?, ?, ?, ?)
    `,
        [
            horario.id_odontologo,
            horario.dia_semana,
            horario.hora_inicio,
            horario.hora_fin
        ]
    );

    return result;
};


const getHorarios = async (pool) => {

    const [rows] = await pool.query('SELECT * FROM horario_atencion');

    return rows;

}

const getHorarioByOdontologoId = async (
    pool,
    id,
    date

) => {
    
const fecha = new Date(date + 'T00:00:00');
    
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    const dia_semana = dias[fecha.getDay()];


    const [rows] = await pool.query(
        'SELECT * FROM horario_atencion WHERE id_odontologo = ? AND dia_semana = ?',
        [id, dia_semana]
    );

    return rows[0];

};


module.exports = {  
    createHorario,
    getHorarioByOdontologoId,
    getHorarios
};

            