const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "rootuser",
  port: 5432,
});
