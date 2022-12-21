import db from "../../config/db.config.js";

const find = () => {
  return db.query(`
    SELECT 
      id,
      name,
      color,
      rank_order as "rankOrder",
      created_at as "createdAt",
      updated_at as "updatedAt",
      deleted_at as "deletedAt"
    FROM 
      issue_status_types`);
};

export default { find };
