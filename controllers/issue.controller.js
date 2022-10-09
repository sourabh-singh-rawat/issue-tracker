import Issue from "../models/issue.model.js";
import User from "../models/user.model.js";
import IssueStatus from "../models/issueStatus.model.js";
import IssuePriority from "../models/issuePriority.model.js";
import IssueComment from "../models/issuesComment.model.js";
import IssueTask from "../models/issueTask.model.js";

const create = async function createIssue(req, res) {
  const { uid } = req.user;
  const body = req.body;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const issue = (await Issue.insertOne({ reporter_id: id, ...body })).rows[0];

    res.send(issue);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const index = async function indexIssues(req, res) {
  const { uid } = req.user;

  // filtering
  const { status, priority, project_id, assigned_to } = req.query;

  // sorting
  const { sort_by } = req.query;
  const sortOptions = {};
  if (sort_by) {
    const [field, order] = sort_by.split(":");
    sortOptions.field = field;
    sortOptions.order = order;
  }

  // pagination
  const { limit, page } = req.query;

  try {
    const reporter = (await User.findOne(uid)).rows[0];
    const options = {
      status,
      priority,
      project_id,
      assigned_to,
    };
    const issues = (
      await Issue.find({
        reporter_id: reporter.id,
        options,
        pagingOptions: {
          limit: parseInt(limit),
          offset: parseInt(limit) * parseInt(page),
        },
        sortOptions,
      })
    ).rows;

    const rowCount = (
      await Issue.rowCount({
        reporter_id: reporter.id,
        options,
        pagingOptions: {},
        sortOptions: {},
      })
    ).rowCount;

    res.send({ rows: issues, rowCount: rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const indexStatus = async function indexIssueStatus(req, res) {
  try {
    const issueStatus = await IssueStatus.find();
    res.send(issueStatus.rows);
  } catch (error) {
    res.status(500).send();
  }
};

const indexPriority = async function indexIssuePriority(req, res) {
  try {
    const issuePriority = await IssuePriority.find();
    res.send(issuePriority.rows);
  } catch (error) {
    res.status(500).send();
  }
};

const show = async function showIssue(req, res) {
  const { id } = req.params;

  try {
    const issue = (await Issue.findOne(id)).rows[0];

    if (!issue) res.status(404).send();

    return res.send(issue);
  } catch (error) {
    res.status(500).send();
  }
};

const update = async function updateIssue(req, res) {
  const { id } = req.params;

  try {
    const issue = await (await Issue.updateOne(id, req.body)).rows[0];
    return res.send(issue);
  } catch (error) {
    return res.status(500).send();
  }
};

const destroy = async function deleteIssue(req, res) {
  const { id } = req.params;

  try {
    const issue = (await Issue.deleteOne(id)).rows[0];
    if (!issue) res.status(404);
    res.send(issue);
  } catch (error) {
    res.status(500).send();
  }
};

const createComment = async function createComment(req, res) {
  const { uid } = req.user;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const comment = (await IssueComment.insertOne({ user_id: id, ...req.body }))
      .rows[0];

    res.send(comment);
  } catch (error) {
    res.status(500).send();
  }
};

const updateComment = async function updateComment(req, res) {
  const { commentId } = req.params;
  const { description } = req.body;

  try {
    const updatedComment = (
      await IssueComment.updateOne({ commentId, description })
    ).rows[0];

    if (!updatedComment) res.status(500).send();

    res.send(updatedComment);
  } catch (error) {
    res.status(500).send();
  }
};

const indexComments = async function indexComments(req, res) {
  const issueId = req.params.id;

  try {
    const comments = (await IssueComment.find(issueId)).rows;
    const rowCount = (await IssueComment.rowCount(issueId)).rows[0].count;

    res.send({ rows: comments, rowCount: parseInt(rowCount) });
  } catch (error) {
    res.status(500).send();
  }
};

const destroyComment = async function deleteComment(req, res) {
  const { commentId } = req.params;

  try {
    const deletedComment = (await IssueComment.deleteOne(commentId)).rows[0];
    if (!deletedComment) res.status(500).send();

    res.send(deletedComment);
  } catch (error) {
    res.status(500).send();
  }
};

const createTask = async function createIssueTask(req, res) {
  const { uid } = req.user;
  const { description, issue_id } = req.body;

  try {
    const task = (await IssueTask.insertOne({ description, issue_id })).rows[0];
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

const showTask = async function showIssueTask(req, res) {
  const { taskId } = req.params;
  try {
    const task = (await IssueTask.findOne(taskId)).rows[0];
    if (!task) res.status(500).send();

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
};

const updateTask = async function updateIssueTask(req, res) {
  const { taskId } = req.params;
  const { description } = req.body;

  try {
    const task = (await IssueTask.updateOne({ description, taskId })).rows[0];
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
};

const indexTasks = async function indexIssueTasks(req, res) {
  const { id } = req.params;

  try {
    const tasks = (await IssueTask.find(id)).rows;
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
};

const destroyTask = async function deleteIssueTask(req, res) {
  const { taskId } = req.params;

  try {
    const deletedTask = (await IssueTask.deleteOne(taskId)).rows[0];
    if (!deletedTask) res.status(500).send();

    res.send(deletedTask);
  } catch (error) {
    res.status(500).send();
  }
};

export default {
  create,
  index,
  indexStatus,
  indexPriority,
  show,
  update,
  destroy,
  createComment,
  indexComments,
  updateComment,
  destroyComment,
  createTask,
  indexTasks,
  showTask,
  updateTask,
  destroyTask,
};