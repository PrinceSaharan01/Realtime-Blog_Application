import { combineReducers } from "redux";
import commentReducer from "./comments/commentsReducers";
import postReducer from "./posts/postReducers";


const rootReducer = combineReducers({
    post: postReducer,
    comment :commentReducer

})

export default rootReducer;