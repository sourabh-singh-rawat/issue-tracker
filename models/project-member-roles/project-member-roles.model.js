import db from "../../configs/db.config.js";

const find = () => {
  return db.query(`
    SELECT 
      * 
    FROM 
      project_member_roles
    `);
};

export default { find };
