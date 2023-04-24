const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "rootuser",
  port: 5432,
});

const setAnnotates = (body) => {
  return new Promise(function (resolve, reject) {
    const { photo_id, annotates } = body;
    console.log(photo_id, annotates);
    pool.query(
      "INSERT INTO annotates (photo_id, annotates_position) VALUES ($1, $2)",
      [photo_id, annotates],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Annotates added with ID: ${photo_id}`);
      }
    );
  });
};

const deleteAnnotates = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM annotates WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Annotates deleted with ID: ${id}`);
      }
    );
  });
};

const getAnnotates = (photo_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM annotates WHERE photo_id = $1",
      [photo_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = {
  setAnnotates,
  deleteAnnotates,
  getAnnotates,
};
