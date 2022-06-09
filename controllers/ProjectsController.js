import ProjectsModel from "../models/Projects.js";

const createProject = async (req, res) => {
  const { name, description, uid, email, startDate, endDate, status } =
    req.body;
  try {
    await ProjectsModel.insertOne(
      name,
      description,
      status,
      uid,
      email,
      startDate,
      endDate
    );
    return res.status(200).send("Success");
  } catch (error) {
    console.log("INSERT_ERROR: Cannot insert data in the table", error);
    return error;
  }
};

const getAllProjects = async (req, res) => {
  try {
    const response = await ProjectsModel.find();
    res.send(response.rows);
  } catch (error) {
    if (error) {
      console.log("READ_ERROR: Cannot get all projects", error);
      res.status(404).send("Cannot get all projects");
    }
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await ProjectsModel.findOne(id);
    res.send(response.rows[0]);
  } catch (error) {
    console.log("READ_ERROR: Cannot get project " + id, error);
    res.status(404).send("Cannot get project");
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;

  try {
    const response = await ProjectsModel.updateOne(id, field, value);
    res.send(response.rows[0]);
  } catch (error) {
    console.log("UPDATE_ERROR: Cannot update project " + id, error);
    res.status(400).send("Cannot update project");
  }
};

// Asks model to delete project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await ProjectsModel.deleteOne(id);
    res.send("Project deleted with id" + id);
  } catch (error) {
    console.log("DELETE_ERROR: Cannot delete project");
    res.status(400).send("Cannot delete project");
  }
};

export default {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
