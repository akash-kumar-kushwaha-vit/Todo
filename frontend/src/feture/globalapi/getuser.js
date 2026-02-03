
import { getUsers } from "../../api/user";

export const fetchUser = async () => {
    const response = await getUsers();
    return response;
};