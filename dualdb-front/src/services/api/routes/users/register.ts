import { Request } from "@/services/api/helpers/request";
import { Requests } from "@shared/api";

export const register = async (form: Requests.User.Register['body']) => {
    const response = await Request.post<never, Requests.User.Register>({
        url: '/users/register',
        body: form
    });

    return response.is(200);
}