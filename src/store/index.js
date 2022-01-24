import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";

const middleware = [thunk];

export const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(...middleware));

  return store;
};

export default configureStore;
