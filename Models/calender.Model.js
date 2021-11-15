const db = require("../util/db");
const bcrypt = require("bcrypt");

class Calender {
  async create({ title, user_id }) {
    const sql = `INSERT INTO calender ( title, user_id) VALUES (?,?);`;
    return db.execute(sql, [title, user_id]);
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
    const sql = `SELECT * FROM calender;`;
    return db.execute(sql);
  }

  async checkPassword(passwordInput, userPassword) {
    return await bcrypt.compare(passwordInput, userPassword);
  }
}

module.exports = new Calender();
