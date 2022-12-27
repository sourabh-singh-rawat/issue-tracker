/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';
import MuiLinearProgress from '@mui/material/LinearProgress';
import { onAuthStateChangedListener } from '../../config/firebase.config';

import { setCredentials } from '../../features/auth/slice/auth.slice';

function ProtectedRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();

  const auth = useSelector((store) => store.auth);
  const token = useSelector((store) => store.auth.accessToken);

  // Once the user is authenticated with firebase
  // and accessToken is stored in the redux store
  // We can set the loggedInUser prop of localStorage to true
  // This will make sure that our app's ProtectedRoute component
  // will not redirect the user to the login page
  if (token) window.localStorage.setItem('loggedInUser', true);

  useEffect(
    () =>
      onAuthStateChangedListener(async (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          const accessToken = await user.getIdToken();

          dispatch(
            setCredentials({
              user: { uid, email, displayName, photoURL },
              accessToken,
              isLoading: false,
            }),
          );
        }
      }),
    [],
  );

  return window.localStorage.getItem('loggedInUser') ? (
    <>
      {auth.isLoading ? (
        <MuiGrid container>
          <MuiGrid item xs={12}>
            <MuiLinearProgress />
          </MuiGrid>
        </MuiGrid>
      ) : (
        <Outlet />
      )}
    </>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default ProtectedRoutes;