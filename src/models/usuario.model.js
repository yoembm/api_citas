const getUsuarios = async (pool) => {


    const [rows] = await pool.query('SELECT * FROM usuario');
    
    return rows;

}

const createUsuario = async (
  pool,
  paciente
) => {

  const [result] = await pool.query(
    `
    INSERT INTO usuario
    (nombres, apellidos, correo, password, telefono, rol, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      paciente.nombres,
      paciente.apellidos,
      paciente.correo,
      paciente.password,
      paciente.telefono,
      paciente.rol,
      paciente.estado

    ]
  );

  return result;
};


const getUsuarioById = async (
  pool,
  id
) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuario WHERE id_usuario = ?',
    [id]
  );

  return rows[0];
};


module.exports = {
    getUsuarios,
    createUsuario,
    getUsuarioById
};


