import User from '../../models/user/user.model.js';
import ProjectMember from '../../models/project-member/project-member.model.js';

const index = async (req, res) => {
  const { uid } = req.user;

  try {
    const { id } = await User.findOne(uid);
    const peopleRelatedToUid = await ProjectMember.findPeopleRelatedToUid(id);

    res.send({
      rows: peopleRelatedToUid.rows,
      rowCount: peopleRelatedToUid.rowCount,
    });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
