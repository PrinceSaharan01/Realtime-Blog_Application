export const create_comments = 'create_comments';
export const approve_comments = 'approve_comments';
export const delete_comments = 'delete_comments';
export const fetch_comments = 'fetch_comments'





export const fetchComment = (data) => {
    return {
        type: fetch_comments,
        payload: data
    }
}



export const createComment = (data) => {
    return {
        type: create_comments,
        payload: data


    }
}

export const approveComment = (data) => {
    return {
        type: approve_comments,
        payload: data
    }
}


export const deleteComment = (id) => {
    return {
        type: delete_comments,
        payload: id
    }
}