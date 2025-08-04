import api from "./base";

export const likePost = async(postId: number) => {
    try {
        await api.post('/coment/like', {
            post_id: postId
        });
    } catch (error) {
        console.log(error, 'error');
    }
};

export const unlikePost = async(postId: number) => {
    try {
        await api.post('/coment/unlike', {
            post_id: postId
        });
    } catch (error) {
        console.log(error, 'error');
    }
};

export const createComment = async(postId: number, comment: string) => {
    try {
        await api.post('/coment/comment', {
            post_id: postId,
            text: comment
        });
    } catch (error) {
        console.log(error, 'error');
    }
};

export const getPostComments = async(postId: number) => {
    try {
        const response = await api.get(`/coment/comments/${postId}`);
        return response.data;
    } catch (error) {
        console.log(error, 'error');
    }
};