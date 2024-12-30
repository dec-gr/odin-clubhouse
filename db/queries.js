const pool = require('./pool');

function addUser({ first_name, last_name, email, hashedPassword }) {
  pool.query(
    `
        INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)
        `,
    [first_name, last_name, email, hashedPassword]
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  const user = rows[0];
  return user;
}

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [
    id,
  ]);
  const user = rows[0];
  return user;
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
};
