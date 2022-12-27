/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';

import IssueForm from '../../../pages/IssueForm';
import PrimaryButton from '../../../../../common/buttons/PrimaryButton';

import { useGetProjectMembersQuery } from '../../../../project/api/project.api';
import { setMembers } from '../../../../project/slice/project.slice';

function AddIssueButton() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getProjectMembersQuery = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      dispatch(setMembers(getProjectMembersQuery.data));
    }
  }, [getProjectMembersQuery.data]);

  return (
    <>
      <PrimaryButton label="Add Issue" onClick={handleOpen} />
      <MuiModal
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiBackdrop-root': { backgroundColor: 'rgba(9, 30, 66, 0.54)' },
        }}
      >
        <MuiBox
          sx={{
            padding: 4,
            position: 'absolute',
            height: '85vh',
            overflowX: 'scroll',
            minWidth: '60vw',
            top: '50%',
            left: '50%',
            bgcolor: 'background.paper',
            transform: 'translate(-50%, -50%)',
            borderRadius: '6px',
            boxShadow: 24,
          }}
        >
          <IssueForm />
        </MuiBox>
      </MuiModal>
    </>
  );
}

export default AddIssueButton;