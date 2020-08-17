import { API } from "utils";
import { createDataContext } from "utils";
//! Types
import { UPDATE_PROFILE } from "./ProfileEditTypes";
//! Reducer
import { profileEditReducer, INITIAL_STATE } from "./ProfileEditReducer";

const updateProfile = (dispatch) => async ({
  firstName,
  lastName,
  email,
  mobileNum,
}) => {
  try {
    dispatch({ type: UPDATE_PROFILE.PENDING });
    await API.put("/profiles", {
      firstName,
      lastName,
      email,
      mobileNum,
    });
    dispatch({ type: UPDATE_PROFILE.SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE.FAILURE,
      payload: error,
    });
  }
};

export const { Provider, Context } = createDataContext(
  profileEditReducer,
  { updateProfile },
  INITIAL_STATE
);
