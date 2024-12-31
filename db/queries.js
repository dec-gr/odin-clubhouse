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

function addMember(user_id) {
  pool.query(
    `
    UPDATE users
    SET is_member = 'TRUE'
    WHERE user_id = $1
    
    
    `,
    [user_id]
  );
}

function addAdmin(user_id) {
  pool.query(
    `
    UPDATE users
    SET is_admin = 'TRUE'
    WHERE user_id = $1
    
    
    `,
    [user_id]
  );
}

/* ----- MESSAGE QUERIES ---- */

function addMessage({ user_id, title, content }) {
  pool.query(
    'INSERT INTO messages (user_id, title, content, time_stamp) VALUES ($1, $2, $3, NOW())',
    [user_id, title, content]
  );
}

function deleteMessage(message_id) {
  pool.query('DELETE FROM messages WHERE message_id = $1', [message_id]);
}

async function getAllMessagesWithNamesMember() {
  const { rows } = await pool.query(`
    SELECT m.message_id, m.title, m.content, m.time_stamp, m.user_id, u.first_name, u.last_name, u.email
    FROM messages as m
    INNER JOIN users as u
    ON m.user_id = u.user_id;
    `);

  return rows;
}

async function getAllMessagesWithNamesNonMember() {
  const { rows } = await pool.query(`
    SELECT m.message_id, m.title, m.content
    FROM messages as m
    INNER JOIN users as u
    ON m.user_id = u.user_id;
    `);

  return rows;
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  addMember,
  addAdmin,
  addMessage,
  deleteMessage,
  getAllMessagesWithNamesMember,
  getAllMessagesWithNamesNonMember,
};
