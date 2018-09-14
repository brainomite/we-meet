import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import userErrorsReducer from "./user_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  user: userErrorsReducer
});

export default errorsReducer;
