const db = require("../util/db");
const bcrypt = require("bcrypt");

class User {
  async create({ username, password, passwordLastChanged }) {
    const now = new Date();
    const createdAt = new Date();
    const sql = `INSERT INTO user ( username, password, password_last_changed, created_at) VALUES (?,?,?,?);`;
    return db.execute(sql, [
      username,
      password,
      passwordLastChanged || now,
      createdAt,
    ]);
  }

  async findById(id) {
    const sql = `SELECT * FROM user WHERE user_id = ?;`;
    return db.execute(sql, [id]);
  }
  async findByUsername(username) {
    const sql = `SELECT * FROM user WHERE username = ?;`;
    return db.execute(sql, [username]);
  }

  async find() {
    const sql = `SELECT * FROM user;`;
    return db.execute(sql);
  }

  async checkPassword(passwordInput, userPassword) {
    return await bcrypt.compare(passwordInput, userPassword);
  }
}

module.exports = new User();
