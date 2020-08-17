import { UPDATE_PROFILE } from "./ProfileEditTypes";

const INITIAL_STATE = {
  loading: false,
  error: "",
};

const profileEditReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PROFILE.PENDING:
      return { ...state, ...INITIAL_STATE, loading: true };
    case UPDATE_PROFILE.SUCCESS:
      return { ...state, loading: false };
    case UPDATE_PROFILE.FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { profileEditReducer, INITIAL_STATE };
