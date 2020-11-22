//Reducers
import { combineReducers } from "redux";
import * as actions from "./constants";

const initialVehicles = {};

function vehicles(state = initialVehicles, action) {
  switch (action.type) {
    case actions.GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };
    default:
      return state;
  }
}

const reducers = combineReducers({ vehicles });

export default reducers;
