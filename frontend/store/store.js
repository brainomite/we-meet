import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

const middlewares = [thunk];
const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => {
  const composeEnhancers =
    isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configureStore;
