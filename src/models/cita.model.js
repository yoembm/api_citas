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

    const [rows] = await pool.query('SELECT c.*, u.nombres AS paciente_nombre,u.apellidos AS paciente_apellido, u2.nombres AS odontologo_nombre, u2.apellidos AS odontologo_apellido, s.* FROM cita_odontologica c inner join paciente p on c.id_paciente = p.id_paciente inner join usuario u on p.id_usuario = u.id_usuario inner join odontologo o on c.id_odontologo = o.id_odontologo inner join usuario u2 on o.id_usuario = u2.id_usuario inner join sede s on c.id_sede = s.id_sede');
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

const getCitasOcupadasOdontologoFecha = async (
    pool,
    id,
    fecha
) => {
    const [rows] = await pool.query(
         `
        SELECT TIME_FORMAT(hora, '%H:%i') AS hora
        FROM cita_odontologica
        WHERE id_odontologo = ?
        AND fecha = ?
        `,
        [id, fecha]
    );

    return rows.map(row => row.hora);

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
    updateCita,
    getCitasOcupadasOdontologoFecha
};

