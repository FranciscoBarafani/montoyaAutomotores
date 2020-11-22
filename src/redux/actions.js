//Redux Actions
import * as actions from "./constants";

export const getVehicles = (state) => {
  return {
    type: actions.GET_VEHICLES,
    payload: state,
  };
};
