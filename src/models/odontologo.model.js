
const getOdontologoById = async (
  pool,
  id
) => {
  const [rows] = await pool.query(
    'SELECT * FROM odontologo WHERE id_odontologo = ?',
    [id]
  );

  return rows[0];
};


const updateOdontologo = async (
  pool,
  id,
  odontologo
) => {

  const [result] = await pool.query(
    `
    UPDATE odontologo
    SET dni = ?, colegiatura = ?, experiencia_anios = ?, id_sede = ?
    WHERE id_odontologo = ?
    `,
    [
      odontologo.dni,
      odontologo.colegiatura,      
      odontologo.experiencia_anios,
      odontologo.id_sede,
      id
    ]
  );

  return result;
};


module.exports = {  
  getOdontologoById,
  updateOdontologo
};      


