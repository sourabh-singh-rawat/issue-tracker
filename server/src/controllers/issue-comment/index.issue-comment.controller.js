/* eslint-disable import/extensions */
import IssueComment from '../../models/issue-comment/issue-comment.model.js';

/**
 * List all the comments of an issue
 * @param {*} req
 * @param {*} res
 * @returns List of comments along with their row count.
 */
const index = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = (await IssueComment.find({ issueId: id })).rows;
    const rowCount = (await IssueComment.rowCount(id)).rows[0].count;

    res.send({ rows: comments, rowCount: parseInt(rowCount, 10) });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
