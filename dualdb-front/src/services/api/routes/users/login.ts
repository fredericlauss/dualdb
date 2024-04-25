import { Request } from "@/services/api/helpers/request";
import { Requests } from "@shared/api";

export const login = async (form: Requests.User.Register['body']) => {
    const response = await Request.post<never, Requests.User.Register>({
        url: '/users/login',
        body: form
    });
}