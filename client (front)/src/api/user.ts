import api from './base'
import { baseURL } from './base';

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
    const photoUrl = `${baseURL}/uploads/${response.data.photo}`;

    return {
      ...response.data,
      photo: photoUrl
    };
  } catch (error) {
    console.log(error, 'error')
  }
}

export const updateUser = async(userData: UpdateUserData) => {
  try {
    return api.patch(`/users`, userData);
  } catch (error) {
    console.log(error, 'error')
  }
}

export const deleteUser = async() => {
  try {
    return api.delete(`/users`);
  } catch (error) {
    console.log(error, 'error')
  }
}