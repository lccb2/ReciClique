import api from "./base";

type EditPostData = {
    photos?: File[];
    title?: string;
    description?: string;
    materiais?: number[];
    link?: string;
}

export const getPost = async(postId: number) => {
    try {
        const response = await api.get(`/posts/${postId}`)

        return response.data;
    } catch (error) {
        console.log(error, 'error');
    }
};

export const editPost = async(postId: number, data: EditPostData) => {
    const formData = new FormData();

    console.log(data, 'data')
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
        formData.append('materiais', material.toString());
    });

    data.photos?.forEach(photo => {
        formData.append('photos', photo);
    });

    try {
        const response = await api.patch(`/posts/${postId}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.log(error, 'error');
    }
};

export const deletePost = async(postId: number) => {
    try {
        await api.delete(`/posts/${postId}`);
    } catch (error) {
        console.log(error, 'error');
    }
};

export const getRecentPosts = async() => {
    try {
        const response = await api.get('/posts/recent');
        return response.data;
    } catch (error) {
        console.log(error, 'error');
    }
}