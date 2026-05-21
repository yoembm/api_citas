
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
    //'SELECT * FROM historial WHERE id_paciente = ?',
    `
     SELECT
      h.id_historial,
      h.id_paciente,
      h.id_cita,

      CONCAT(up.nombres, ' ', up.apellidos) AS paciente,
      up.correo,
      up.telefono,
      p.dni,
      DATE_FORMAT(p.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento,
      p.seguro,
      p.direccion,
      p.sexo,
      p.peso,
      p.talla,

      DATE_FORMAT(h.fecha_registro, '%d/%m/%Y') AS fecha_registro,

      c.motivo,
      DATE_FORMAT(c.fecha, '%d/%m/%Y') AS fecha_cita,
      TIME_FORMAT(c.hora, '%H:%i') AS hora_cita,
      c.estado AS estado_cita,

      CONCAT(uo.nombres, ' ', uo.apellidos) AS odontologo,
      o.dni AS dni_odontologo,
      o.colegiatura,
      o.experiencia_anios,

      s.nombre AS sede,
      s.direccion AS direccion_sede,

      h.diagnostico,
      h.tratamiento,
      h.observaciones

    FROM historial h
    INNER JOIN paciente p ON h.id_paciente = p.id_paciente
    INNER JOIN usuario up ON p.id_usuario = up.id_usuario
    INNER JOIN cita_odontologica c ON h.id_cita = c.id_cita
    INNER JOIN odontologo o ON c.id_odontologo = o.id_odontologo
    INNER JOIN usuario uo ON o.id_usuario = uo.id_usuario
    INNER JOIN sede s ON c.id_sede = s.id_sede
    ORDER BY h.fecha_registro DESC
    `,
    [id]
  );

  return rows;
};

//Inicio - Nueva funcion 
const getAllHistoriales = async (pool) => {
  const [rows] = await pool.query(
    `
   SELECT
      h.id_historial,
      h.id_paciente,
      h.id_cita,

      CONCAT(up.nombres, ' ', up.apellidos) AS paciente,
      up.correo,
      up.telefono,
      p.dni,
      DATE_FORMAT(p.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento,
      p.seguro,
      p.direccion,
      p.sexo,
      p.peso,
      p.talla,

      DATE_FORMAT(h.fecha_registro, '%d/%m/%Y') AS fecha_registro,

      c.motivo,
      DATE_FORMAT(c.fecha, '%d/%m/%Y') AS fecha_cita,
      TIME_FORMAT(c.hora, '%H:%i') AS hora_cita,
      c.estado AS estado_cita,

      CONCAT(uo.nombres, ' ', uo.apellidos) AS odontologo,
      o.dni AS dni_odontologo,
      o.colegiatura,
      o.experiencia_anios,

      s.nombre AS sede,
      s.direccion AS direccion_sede,

      h.diagnostico,
      h.tratamiento,
      h.observaciones

    FROM historial h
    INNER JOIN paciente p ON h.id_paciente = p.id_paciente
    INNER JOIN usuario up ON p.id_usuario = up.id_usuario
    INNER JOIN cita_odontologica c ON h.id_cita = c.id_cita
    INNER JOIN odontologo o ON c.id_odontologo = o.id_odontologo
    INNER JOIN usuario uo ON o.id_usuario = uo.id_usuario
    INNER JOIN sede s ON c.id_sede = s.id_sede
    ORDER BY h.fecha_registro DESC
    `
  );

  return rows;
};
// Fin - Nueva Funcion


module.exports = {  
  createHistorial,
  getHistorialByPacienteId,
  getAllHistoriales
};      


