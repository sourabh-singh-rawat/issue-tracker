import ProjectStatus from "../../models/project-status/project-status.model.js";

/**
 * List project status available to projects
 */
const indexStatus = async (req, res) => {
  try {
    const status = await ProjectStatus.find();
    res.send({ rows: status.rows, rowCount: status.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default indexStatus;
