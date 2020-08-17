import {API} from 'utils';
import {createDataContext} from 'utils';
//! Types
import {CREATE_PROFILE} from './ProfileTypes';
//! Reducer
import {profileReducer, INITIAL_STATE} from './ProfileReducer';

const createProfile = dispatch => async ({
  firstName,
  lastName,
  email,
  mobileNum,
}) => {
  try {
    dispatch({type: CREATE_PROFILE.PENDING});
    const res = await API.post('/profiles', {
      firstName,
      lastName,
      email,
      mobileNum,
    });
    dispatch({type: CREATE_PROFILE.SUCCESS, payload: res.data});
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE.FAILURE,
      payload: error,
    });
  }
};

export const {Provider, Context} = createDataContext(
  profileReducer,
  {createProfile},
  INITIAL_STATE,
);
