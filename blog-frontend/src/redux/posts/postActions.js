export const create_post = 'create_post';
export const update_post = 'update_post';
export const delete_post = 'delete_post';
export const fetch_posts = 'fetch_posts'


export const fetchPost = (data) => {
    return {
        type: fetch_posts,
        payload: data
    }

}

export const createPost = (data) => {
    return {
        type: create_post,
        payload: data


    }
}


export const updatePost = (data) => {
    return {
        type: update_post,
        payload: data
    }
}


export const deletePost = (id) => {
    return {
        type: delete_post,
        payload: id
    }
}