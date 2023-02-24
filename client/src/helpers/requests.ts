import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "http://localhost:3001";

//Register User
export const saveUser = async (data: string[]) => {
    const [email, username, password, confirmPassword, carrerName] = data;
    if (!email || !username || !password || !confirmPassword || !carrerName) {
        return "Por favor rellene todos los campos"
    };

    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden"
    };
    try {
        const response = await axios.post(`${BASE_URL}/users/save`, {
            email,
            username,
            password,
            carrerName
        });
        return response.data;
    } catch (error: any) {
        return (error.response.data.message);
    };

};

//Get all subjects whit id of Career
export const subjectsWhitIdCareer = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/careers/findId/${id}`);
        return response.data.subjects;
    } catch (error: any) {
        return (error.response.data.message);
    }
};

//Get relation of subjects and user
export const userSubject = async (id: number) => {
    try {
        const response = await axios.post(`${BASE_URL}/usersubject`, { userId: id });
        return response.data;
    } catch (error: any) {
        return (error.response.data.message);
    };
};

//Update user_subject relation
export const updateDbUserSubject = async (data: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/usersubject/update`, { data });
        return response.data;
    } catch (error: any) {
        return (error.response.data.message);
    };
};

//Login user
export const loginUser = async (data: string[]) => {
    const [username, password] = data;
    if (!username || !password) {
        return "Por favor rellene todos los campos"
    };
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, {
            username,
            password
        });
        return response.data;
    } catch (error: any) {
        return (error.response.data.message);
    }
};

//Get all Carreers
export const getCareers = async () => {
    const response = await axios.get(`${BASE_URL}/careers`)
    return response.data;
};