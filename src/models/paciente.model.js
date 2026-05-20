
const getPacienteById = async (
  pool,
  id
) => {
  const [rows] = await pool.query(
    'SELECT * FROM paciente WHERE id_paciente = ?',
    [id]
  );

  return rows[0];
};


const updatePaciente = async (
  pool,
  id,
  paciente
) => {

  const [result] = await pool.query(
    `
    UPDATE paciente p
    INNER JOIN usuario u
    ON p.id_usuario = u.id_usuario
    SET 
      p.dni = ?,
      u.nombres = ?,
      u.apellidos = ?,
      u.correo = ?,
      u.telefono = ?
    WHERE p.id_paciente = ?
    `,
    [
      paciente.dni,
      paciente.nombres,
      paciente.apellidos,
      paciente.correo,
      paciente.telefono,
      id
    ]
  );

  return result;
};
const getAllPacientes = async (pool) => {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id_paciente,
      p.id_usuario,
      p.dni,
      u.nombres,
      u.apellidos,
      u.correo,
      u.telefono,
      p.fecha_nacimiento,
      p.seguro,
      p.direccion,
      p.sexo,
      p.peso,
      p.talla,
      u.estado
    FROM paciente p
    INNER JOIN usuario u
    ON p.id_usuario = u.id_usuario
    `
  );

  return rows;
};


const deletePaciente = async (pool, id) => {
  const [result] = await pool.query(
    `
    UPDATE usuario u
    INNER JOIN paciente p
    ON u.id_usuario = p.id_usuario
    SET u.estado = 'inactivo'
    WHERE p.id_paciente = ?
    `,
    [id]
  );

  return result;
};


module.exports = {
  getPacienteById,
  getAllPacientes,
  updatePaciente,
  deletePaciente
};


