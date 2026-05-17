const createSede = async (
    pool,
    sede
) => {

    const [result] = await pool.query(
        `
    INSERT INTO sede
    (nombre, direccion, telefono,distrito)
    VALUES (?, ?, ?, ?)
    `,
        [
            sede.nombre,
            sede.direccion,
            sede.telefono,
            sede.distrito
        ]
    );

    return result;
};


const getSedes = async (pool) => {


    const [rows] = await pool.query('SELECT * FROM sede');

    return rows;

}


const getSedeById = async (
    pool,
    id
) => {
    const [rows] = await pool.query(
        'SELECT * FROM sede WHERE id_sede = ?',
        [id]
    );

    return rows[0];
};


const updateSede = async (
    pool,
    id,
    sede
) => {

    const [result] = await pool.query(
        `
    UPDATE sede
    SET nombre = ?, direccion = ?, telefono = ?, distrito = ?
    WHERE id_sede = ?
    `,
        [
            sede.nombre,
            sede.direccion,
            sede.telefono,
            sede.distrito,
            id
        ]
    );

    return result;
};

module.exports = {
    getSedes,
    createSede,
    getSedeById,
    updateSede
};

            