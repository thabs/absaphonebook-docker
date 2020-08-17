import {CREATE_PROFILE} from './ProfileTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  profile: '',
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case CREATE_PROFILE.PENDING:
      return {...state, ...INITIAL_STATE, loading: true};
    case CREATE_PROFILE.SUCCESS:
      return {...state, loading: false, profile: action.payload};
    case CREATE_PROFILE.FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export {profileReducer, INITIAL_STATE};
