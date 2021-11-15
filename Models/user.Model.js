const db = require("../util/db");
const bcrypt = require("bcrypt");

class User {
  async create({ username, password }) {
    const sql = `INSERT INTO user ( username, password) VALUES (?,?);`;
    return db.execute(sql, [username, password]);
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
