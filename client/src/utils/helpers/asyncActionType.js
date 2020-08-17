const asyncActionType = type => ({
  PENDING: `${type}_pending`,
  SUCCESS: `${type}_success`,
  FAILURE: `${type}_failure`
});

export default asyncActionType;
