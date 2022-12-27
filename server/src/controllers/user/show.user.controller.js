/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const user = (await User.findOne(id)).rows[0];
    if (!user) return res.status(404).send();
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default show;