import api from "./base";

export const getMateriais = async() => {
    try {
        const response = await api.get('/pesq/materiais');
        return response.data;
    } catch (error) {
        console.log(error, 'error')
    }
};

export const searchPostByMaterial = async(materiais: number[]) => {
    try {
        const response = await api.post('/pesq/search', {
            material_ids: materiais
        });
        return response.data;
    } catch (error) {
        console.log(error, 'error')
    }
};