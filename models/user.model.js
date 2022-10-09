import db from "../services/db.service.js";

const insertOne = function insertOneUser(name, email, uid) {
  return db.query(
    `INSERT INTO users (name, email, uid) 
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, uid]
  );
};

const findOne = function findOneUser(uid) {
  return db.query(`SELECT * FROM users WHERE uid=$1`, [uid]);
};

const findOneByEmail = function findOneUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email ILIKE $1`, [email]);
};

const updateOne = function updateOneUser(uid, document) {
  let query = Object.keys(document)
    .reduce((prev, cur, index) => {
      return prev + " " + cur + "=$" + (index + 1) + ",";
    }, "UPDATE users SET")
    .slice(0, -1); // removing last ,

  query += " WHERE uid='" + uid + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = function deleteOneUser(uid) {
  return db.query(`DELETE FROM users WHERE uid = $1 RETURNING *`, [uid]);
};

export default {
  insertOne,
  findOne,
  findOneByEmail,
  updateOne,
  deleteOne,
};