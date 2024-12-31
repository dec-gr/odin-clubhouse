const pool = require('./pool');

/* ----- USER QUERIES ---- */

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

/* ----- MESSAGE QUERIES ---- */

function addMessage({ user_id, title, content }) {
  pool.query(
    'INSERT INTO messages (user_id, title, content, time_stamp) VALUES ($1, $2, $3, NOW())',
    [user_id, title, content]
  );
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  addMessage,
};
