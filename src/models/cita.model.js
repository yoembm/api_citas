const createCita = async (
    pool,
    cita
) => {

    const [result] = await pool.query(
        `
    INSERT INTO cita_odontologica
    (id_paciente, id_odontologo, id_sede, fecha, hora, motivo, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
        [
            cita.id_paciente,
            cita.id_odontologo,
            cita.id_sede,
            cita.fecha,
            cita.hora,
            cita.motivo,
            cita.estado
        ]
    );

    return result;
};


const getCitas = async (pool) => {

    const [rows] = await pool.query('SELECT * FROM cita_odontologica');
    return rows;

}


const getCitasByPacienteId = async (
    pool,
    id
) => {
    const [rows] = await pool.query(
        'SELECT * FROM cita_odontologica WHERE id_paciente = ?',
        [id]
    );

    return rows;
};



const getCitasByOdontologoId = async (
    pool,
    id
) => {
    const [rows] = await pool.query(
        'SELECT * FROM cita_odontologica WHERE id_odontologo = ?',
        [id]
    );

    return rows;
};


const updateCita = async (
    pool,
    id,
    cita
) => {

    const [result] = await pool.query(
        `
    UPDATE cita_odontologica
    SET fecha = ?, hora = ?, motivo = ?, estado = ?
    WHERE id_cita = ?
    `,
        [
            cita.fecha,
            cita.hora,
            cita.motivo,
            cita.estado,
            id
        ]
    );

    return result;
};

module.exports = {
    
    createCita,
    getCitas,
    getCitasByPacienteId,
    getCitasByOdontologoId,
    updateCita
};

            