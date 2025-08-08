import api from './base'

type UpdateUserData = {
  name?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  greeting?: string;
  show_email?: boolean;
  show_phone?: boolean;
  show_insta?: boolean;
}

export const getUser = async(userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);

    return {
      ...response.data,
    };
  } catch (error) {
    let message = "Erro inesperado";

    return { error: message };
  }
}

export const updateUser = async(userData: UpdateUserData) => {
  try {
    return api.patch(`/users`, userData);
  } catch (error) {
    let message = "Erro inesperado";

    return { error: message };
  }
}

export const deleteUser = async() => {
  try {
    return api.delete(`/users`);
  } catch (error) {
    let message = "Erro inesperado";

    return { error: message };
  }
}