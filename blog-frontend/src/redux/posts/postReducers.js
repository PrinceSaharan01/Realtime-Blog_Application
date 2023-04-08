import { fetch_posts, create_post, update_post, delete_post } from "./postActions";




const postReducer = (state = [], action) => {

    switch (action.type) {
        case fetch_posts:
            return [...action.payload]
        case create_post:
            return [action.payload , ...state]
        case update_post:
            return [...state.map((post) => { return action.payload.id === post.id ? action.payload : post })]
        case delete_post:
            return [...state.filter((post) => post.id !== action.payload)]


        default: return state;

    }

}

export default postReducer;