import { LOGGED_IN, LOGGED_OUT } from "../constants/actionTypes";
import { isLoggedIn } from "../services/auth";
const initialState = { isLoggedIn: isLoggedIn() ?? false };

export default function common(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
