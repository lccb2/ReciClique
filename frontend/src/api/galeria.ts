import api from "./base";

export const getGaleria = async(userId: number) => {
    try {
        const response = await api.get(`/users/${userId}/posts`);

        return response.data;
    } catch (error) {
        let message = "Erro inesperado";

        throw new Error(message);
    }
}