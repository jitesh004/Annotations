const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "rootuser",
  port: 5432,
});

const getImages = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM images ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      // console.log(results);
      resolve(results);
    });
  });
};
const createImages = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, content } = body;
    pool.query(
      "INSERT INTO images (name, content) VALUES ($1, $2) RETURNING *",
      [name, content],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(
          `A new merchant has been added added: ${results && results.rows[0]}`
        );
      }
    );
  });
};
const deleteImage = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("DELETE FROM images WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Merchant deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getImages,
  createImages,
  deleteImage,
};
