
import { authenticateUser, refreshUser } from "../../service/api";


export const refreshToken = async () => {
    const response = await refreshUser();
    if (!response) return;
    const data = await response.data;
    return data;
};
export const getUser = async () => {
    const response = await authenticateUser();
    if (!response) return;
    const data = await response.data;
    return data;
};
