import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  photo: File;
  show_email: boolean;
  show_phone: boolean;
  show_insta: boolean;
}

type LoginData = {
  email: string;
  password: string;
}

export const register = async(data: RegisterData) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('phone', data.phone);
  formData.append('photo', data.photo);

  try {
    const response = await axios.post(`${apiUrl}/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    let message = "Erro inesperado";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || "Email ou senha inválidos";
    }

    return { error: message };
  }
};

export const login = async(data: LoginData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email: data.email,
      password: data.password
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    let message = "Erro inesperado";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || "Email ou senha inválidos";
    }

    return { error: message };
  }
}