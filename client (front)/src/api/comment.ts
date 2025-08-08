import api from "./base";

export const likePost = async(postId: number) => {
    try {
        await api.post('/coment/like', {
            post_id: postId
        });
    } catch (error: any) {
        let message = "Erro inesperado";
        
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        throw new Error(message);
    }
};

export const unlikePost = async(postId: number) => {
    try {
        await api.post('/coment/unlike', {
            post_id: postId
        });
    } catch (error: any) {
        let message = "Erro inesperado";
        
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        throw new Error(message);
    }
};

export const createComment = async(postId: number, comment: string) => {
    try {
        await api.post('/coment/comment', {
            post_id: postId,
            text: comment
        });
    } catch (error: any) {
        let message = "Erro inesperado";
        
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        throw new Error(message);
    }
};

export const getPostComments = async(postId: number) => {
    try {
        const response = await api.get(`/coment/comments/${postId}`);
        return response.data;
    } catch (error: any) {
        let message = "Erro inesperado";
        
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        throw new Error(message);
    }
};