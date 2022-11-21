import IssueAttachment from "../models/issue-attachment/issue-attachment.model.js";

const create = async (req, res) => {
  const { id } = req.params;
  const { bucket, fullPath, name, size, contentType, url } = req.body;

  try {
    const attachment = (
      await IssueAttachment.insertOne({
        bucket,
        full_path: fullPath,
        name,
        size,
        content_type: contentType,
        issue_id: id,
        url,
      })
    ).rows[0];

    res.send(attachment);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const index = async (req, res) => {
  const { id } = req.params;

  try {
    const attachments = await IssueAttachment.find(id);

    res.send({ rows: attachments.rows, rowCount: attachments.rows.length });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export default { create, index };
