
import {
  ADD_Dog,
  FILTER_CREATE,
  FILTER_TEMPERAMENT,
  GET_DETAILS,
  GET_DOGS,
  GET_NAME,
  GET_TEMPERAMENT,
  ORDER_AS,
  ORDER_WEIGHT,


} from "../actions/types.js";

const initialState = {
  dogs: [],
  filter: [],
  temperaments: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        filter: action.payload,
      };
    case GET_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case FILTER_TEMPERAMENT:
      const allFilter = state.filter;
      const statusFilter =
        action.payload === "temeperament"
          ? allFilter
          : allFilter.filter((d) => d.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: statusFilter,
      };
    case FILTER_CREATE:
      const newAllFilter = state.filter;
      const createFilter =
        action.payload === "created"
          ? newAllFilter.filter((c) => c.createInDb)
          : newAllFilter.filter((c) => !c.createInDb);
      return {
        ...state,
        dogs: action.payload === "allDogs" ? newAllFilter : createFilter,
      };
    case ORDER_AS:
      const sortedDogs = [...state.dogs];
      sortedDogs.sort(function (a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return action.payload === "asc" ? -1 : 1;
        }
        if (nameA > nameB) {
          return action.payload === "asc" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        dogs: sortedDogs,
      };
    case ORDER_WEIGHT:
      const weight = state.dogs.filter(
        (d) => !isNaN(d.weight ? d.weight[0] : d.weight_min)
      );
      const orderW =
        action.payload === "min"
          ? weight.sort(function (a, b) {
            if (
              parseInt(a.weight ? a.weight[0] : a.weight_min) <
              parseInt(b.weight ? b.weight[0] : b.weight_min)
            ) {
              return -1;
            }
            if (
              parseInt(a.weight ? a.weight[0] : a.weight_min) >
              parseInt(b.weight ? b.weight[0] : b.weight_min)
            ) {
              return 1;
            }
            return 0;
          })
          : weight.sort(function (a, b) {
            if (
              parseInt(a.weight ? a.weight[0] : a.weight_min) <
              parseInt(b.weight ? b.weight[0] : b.weight_min)
            ) {
              return 1;
            }
            if (
              parseInt(a.weight ? a.weight[0] : a.weight_min) >
              parseInt(b.weight ? b.weight[0] : b.weight_min)
            ) {
              return -1;
            }
            return 0;
          });
      return {
        ...state,
        dogs: action.payload === "weight" ? state.filter : orderW,
      };
      case ADD_Dog:
        return {
          ...state,
          dogs: [...state.dogs, action.payload],
        };
  
      default:
        return {
          state,
        };
    }
  }