const getUsuarios = async (pool) => {


    const [rows] = await pool.query('SELECT * FROM usuario');

    return rows;

}

const createUsuario = async (
    pool,
    usuario
) => {

    const [result] = await pool.query(
        `
    INSERT INTO usuario
    (nombres, apellidos, correo, password, telefono, rol, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
        [
            usuario.nombres,
            usuario.apellidos,
            usuario.correo,
            usuario.password,
            usuario.telefono,
            usuario.rol,
            usuario.estado

        ]
    );


    const idNuevoUsuario = result.insertId;

    if (usuario.rol === 'paciente') {

        await pool.query(
            `INSERT INTO paciente (id_usuario) VALUES (?)`,
            [idNuevoUsuario]
        );

    }else if (usuario.rol === 'odontologo') {

        await pool.query(
            `INSERT INTO odontologo (id_usuario, id_sede) VALUES (?, ?)`,
            [idNuevoUsuario,1] // by default sede 1
        );

    }


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


const getUsuarioByCorreo = async (
    pool,
    correo,
    password
) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuario WHERE correo = ? AND password = ?',
        [correo, password]
    );

    return rows[0];
};  

module.exports = {
    getUsuarios,
    createUsuario,
    getUsuarioById,
    getUsuarioByCorreo
};
  


