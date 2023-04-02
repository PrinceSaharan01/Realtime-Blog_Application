import { approve_comments, create_comments, delete_comments, fetch_comments } from "./commentsActions";


const commentReducer = (state = [], action) => {

    switch (action.type) {
        case fetch_comments:
            return [...action.payload]
        case create_comments:
            return [...state, action.payload]
        case approve_comments:
            return [...state.map((comment) => { return action.payload.id === comment.id ? action.payload : comment })]
        case delete_comments:
            return [...state.filter((comment) => comment.id !== action.payload)]

        default: return state
    }
}

export default commentReducer;