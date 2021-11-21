const db = require("../util/db");
const bcrypt = require("bcrypt");

class Day {
  async create({ content, calender_id, created_at }) {
    let now = created_at || new Date().toISOString().split("T")[0];
    console.log(now);
    const sql = `INSERT INTO day ( content, calender_id, created_at) VALUES (?,?,?);`;
    return db.execute(sql, [content, calender_id, now]);
  }

  async findById(id) {
    const sql = `SELECT * FROM day WHERE user_id = ?;`;
    return db.execute(sql, [id]);
  }

  async find() {
    const sql = `SELECT * FROM day;`;
    return db.execute(sql);
  }
}

module.exports = new Day();
