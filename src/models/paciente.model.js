
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
    UPDATE paciente
    SET dni = ?, fecha_nacimiento = ?, seguro = ?, direccion = ?, sexo = ?, peso = ?, talla = ?
    WHERE id_paciente = ?
    `,
    [
      paciente.dni,
      paciente.fecha_nacimiento,
      paciente.seguro,
      paciente.direccion,
      paciente.sexo, // M | F | Otros
      paciente.peso,
      paciente.talla,
      id
    ]
  );

  return result;
};


module.exports = {  
  getPacienteById,
  updatePaciente
};


