import { combineReducers, applyMiddleware, compose } from "redux";
import { createStore } from "redux";
import { toDoListReducer } from "./toDoListReducer";
import reduxThunk from "redux-thunk";
const rootReducer = combineReducers({
  toDoListReducer: toDoListReducer,
});
let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare);

export const store = createStore(rootReducer, composeCustom);
