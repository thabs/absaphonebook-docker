import { dateToString } from "utils";
import {
  FETCH_PROFILES,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "./DashboardTypes";

const INITIAL_STATE = {
  loading: false,
  error: "",
  profiles: [],
};

const setProfile = (state, payload) => {
  const data = payload.map((profile) => {
    const create = new Date(profile.createdAt);
    const createdAt = dateToString(create);
    let updatedAt = "";

    if (profile.updatedAt) {
      const update = new Date(profile.updatedAt);
      updatedAt = dateToString(update);
    }

    return { ...profile, createdAt, updatedAt };
  });

  return {
    ...state,
    loading: false,
    profiles: data,
  };
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROFILES.PENDING:
      return { ...state, ...INITIAL_STATE, loading: true };
    case UPDATE_PROFILE.PENDING:
    case DELETE_PROFILE.PENDING:
      return { ...state, loading: true };
    case FETCH_PROFILES.SUCCESS:
      return setProfile(state, action.payload);
    case UPDATE_PROFILE.SUCCESS:
      const update = state.profiles.map((item) => {
        if (item._id != action.payload._id) return item;
        return action.payload;
      });

      return setProfile(state, update);
    case DELETE_PROFILE.SUCCESS:
      let newProfile = state.profiles;
      let data = newProfile.filter(function (obj) {
        return obj._id !== action.payload._id;
      });
      return { ...state, loading: false, profiles: data };
    case FETCH_PROFILES.FAILURE:
    case UPDATE_PROFILE.FAILURE:
    case DELETE_PROFILE.FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { dashboardReducer, INITIAL_STATE };
