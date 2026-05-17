
const createHistorial = async (pool, historial) => {

    const [result] = await pool.query(
        `
    INSERT INTO historial
    (id_paciente, id_cita, diagnostico, tratamiento, observaciones)
    VALUES (?, ?, ?, ?, ?)
    `,
        [
            historial.id_paciente,
            historial.id_cita,            
            historial.diagnostico,
            historial.tratamiento,
            historial.observaciones
        ]
    );

    return result;
};


const getHistorialByPacienteId = async (
  pool,
  id
) => {
  const [rows] = await pool.query(
    'SELECT * FROM historial WHERE id_paciente = ?',
    [id]
  );

  return rows;
};




module.exports = {  
  createHistorial,
  getHistorialByPacienteId
  
};      


