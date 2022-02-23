import { State } from "./state";
import { Electricity } from "../types";

//actions
export type Action =
  | {
      type: "SET_ELECTRICITY_LIST";
      payload: Electricity[];
    };

//action creators
export const setElectricityItemList = (electricities: Electricity[]): Action => {
  return {
    type: "SET_ELECTRICITY_LIST",
    payload: electricities
  };
};

//reducers
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ELECTRICITY_LIST":
      return {
        ...state,
        electricities: {
          ...action.payload.reduce(
            (memo, electricity) => ({ ...memo, [electricity.period]: electricity }),
            {}
          ),
          ...state.electricities
        }
      };
    default:
      return state;
  }
};
