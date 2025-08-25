import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserHandle } from "../types";

export const getUser = async () => {
    try {
        const { data } = await api.get<User>('/user');

        console.log(data);

        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
            // console.log(error.response?.data.error);
        }
    }
}
export const updateUser = async (formaData: User ) => {
    try {
        const { data } = await api.patch<String>('/user', formaData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
            // console.log(error.response?.data.error);
        }
    }
}


export const uploadedImage = async ( file : File) => {

    const formaData = new FormData();
    try {
        formaData.append('file',file);
        const { data : { image } } :  { data : { image: string} } = await api.post('/user/image',formaData);
        return image;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}


export const getuserByHandle = async ( handle: string) => {

    try {

        const { data } = await api<UserHandle>(`/${handle}`);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}



export const searchByHandle = async ( handle: string) => {

    try {

        const { data } = await api.post<string>('/search',{handle} );
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}