const db = require("../util/db");
const bcrypt = require("bcrypt");

class Calender {
  async create({ title, user_id }) {
    const sql = `INSERT INTO calender ( title, user_id) VALUES (?,?);`;
    return db.execute(sql, [title, user_id]);
  }

  async findById(id) {
    const sql = `SELECT * FROM calender WHERE title = ?;`;
    return db.execute(sql, [id]);
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
