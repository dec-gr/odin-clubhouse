const pool = require('./pool');

function addUser({ first_name, last_name, email, hashedPassword }) {
  pool.query(
    `
        INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)
        `,
    [first_name, last_name, email, hashedPassword]
  );
}

module.exports = {
  addUser,
};
