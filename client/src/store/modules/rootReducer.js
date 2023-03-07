import { userReducer } from "./users/reducer";
import { combineReducers } from "redux";
import { churchJobReducer } from "./churchJobs/reducer";
import { authReducer } from "./auth/reducer";
import { globalReducer } from "./global/reducer";
import { roleReducer } from "./roles/reducer";
import { utilsReducer } from "./Utils/reducer";
import { churchReducer } from "./churches/reducer";

export default combineReducers({
    userReducer,
    authReducer,
    globalReducer,
    churchJobReducer,
    utilsReducer,
    churchReducer,
})
