import {combineReducers} from "redux";
import authReducer from "./AuthReducer";
import profileReducer from "./ProfileReducer";
import registerUserReducer from "./RegisterUserReducer";


export const reducers = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    registerUser : registerUserReducer
});