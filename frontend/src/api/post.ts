import api from "./base";

type EditPostData = {
    photos?: File[];
    title?: string;
    description?: string;
    materiais?: number[];
    link?: string;
}

type CreatePostData = {
    title: string;
    description: string;
    materiais: number[];
    link: string;
    photos: File[];
}

export const createPost = async(data: CreatePostData) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);

    data.materiais.forEach(material => {
        formData.append('materiais[]', material.toString());
    });

    formData.append('link', data.link);

    data.photos?.forEach((photo: File) => {
        formData.append('photos', photo);
    });

    try {
        const response = await api.post('/users/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        let message = "Erro inesperado";

        throw new Error(message);
    }
};

export const getPost = async(postId: number) => {
    try {
        const response = await api.get(`/posts/${postId}`)

        return response.data;
    } catch (error) {
        let message = "Erro inesperado";

        return { error: message };
    }
};

export const editPost = async(postId: number, data: EditPostData) => {
    const formData = new FormData();

    if (data.title) {
        formData.append('title', data.title);
    }

    if (data.description) {
        formData.append('description', data.description);
    }

    if (data.link) {
        formData.append('link', data.link);
    }

    data.materiais?.forEach(material => {
        formData.append('materiais[]', material.toString());
    });

    data.photos?.forEach(photo => {
        formData.append('photos', photo);
    });

    try {
        const response = await api.patch(`/posts/${postId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        let message = "Erro inesperado";

        throw new Error(message);
    }
};

export const deletePost = async(postId: number) => {
    try {
        await api.delete(`/posts/${postId}`);
    } catch (error) {
        let message = "Erro inesperado";

        throw new Error(message);
    }
};

export const getRecentPosts = async() => {
    try {
        const response = await api.get('/posts/recent');
        return response.data;
    } catch (error) {
        let message = "Erro inesperado";

        throw new Error(message);
    }
}

export const getUserPosts = async(userId: number) => {
    try {
        const response = await api.get(`/posts/user/${userId}`);
        return response.data;
    } catch (error) {
        let message = "Erro inesperado";

        throw new Error(message);
    }
}