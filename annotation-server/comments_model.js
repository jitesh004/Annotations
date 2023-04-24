const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "rootuser",
  port: 5432,
});

const setComments = (body) => {
  return new Promise(function (resolve, reject) {
    const { annotate_id, comment, fullName } = body;
    console.log(annotate_id, comment, fullName);
    pool.query(
      "INSERT INTO comments (annotate_id, comment, fullname) values ($1, $2, $3)",
      [annotate_id, comment, fullName],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Comment added with ID: ${annotate_id}`);
      }
    );
  });
};

const getComments = (annotate_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM comments WHERE annotate_id = $1",
      [annotate_id],
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
  setComments,
  getComments,
};
