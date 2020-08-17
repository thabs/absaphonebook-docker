import { API } from "utils";
import { createDataContext } from "utils";
//! Types
import {
  FETCH_PROFILES,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "./DashboardTypes";
//! Reducer
import { dashboardReducer, INITIAL_STATE } from "./DashboardReducer";

const fetchProfiles = (dispatch) => async () => {
  try {
    dispatch({ type: FETCH_PROFILES.PENDING });
    const res = await API.get("/profiles");
    dispatch({ type: FETCH_PROFILES.SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILES.FAILURE,
      payload: error,
    });
  }
};

const updateProfile = (dispatch) => async (
  profileId,
  { firstName, lastName, email, mobileNum }
) => {
  try {
    dispatch({ type: UPDATE_PROFILE.PENDING });
    const res = await API.put(`/profiles/${profileId}`, {
      firstName,
      lastName,
      email,
      mobileNum,
    });
    dispatch({ type: UPDATE_PROFILE.SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE.FAILURE,
      payload: error,
    });
  }
};

const deleteProfile = (dispatch) => async (profileId) => {
  try {
    dispatch({ type: DELETE_PROFILE.PENDING });
    const res = await API.post(`/profiles/delete/${profileId}`);
    dispatch({ type: DELETE_PROFILE.SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: DELETE_PROFILE.FAILURE,
      payload: error,
    });
  }
};

export const { Provider, Context } = createDataContext(
  dashboardReducer,
  { fetchProfiles, updateProfile, deleteProfile },
  INITIAL_STATE
);
