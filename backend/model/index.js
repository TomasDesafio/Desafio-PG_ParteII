import pool from "../config/index.js";


try {
  await pool.query('SELECT NOW()');
  console.log('Database connection successful');
} catch (error) {
  console.error('Database connection error:', error);
}


export const getData = async () => {

  try {
    
      const { rows } = await pool.query('SELECT * FROM posts');
      
    
      return rows;
    ;
    
  } catch (error) {
    return error.message
  }

}


export const insertData = async (post) => {
  const { titulo, img, descripcion } = post
  
  try {
    const query = `INSERT INTO posts(titulo, img, descripcion,likes) VALUES($1, $2, $3,$4)`
    const values = [titulo, img, descripcion,0]
    const res = await pool.query(query, values)
    console.log(res)
    console.log("[RESPUESTA DB]: ", res.rows);
    if (res.rowCount > 0) return 'Imagen agregadada correctamente'
  } catch (error) {
    console.log("[EROR]: ", error.message);
    return error.message
  }
}



export const editPost = async (id) => {
  try {
    const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const response = await pool.query(query, values);
    if(response.rowCount > 0) {
      return response.rows
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];
    const response = await pool.query(query, values);
    if(response.rowCount > 0) {
      return response.rows
    }
  } catch (error) {
    console.log(error);
  }
};
