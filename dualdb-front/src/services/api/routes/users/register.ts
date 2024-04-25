import { Request } from "@/services/api/helpers/request";
import { Requests, Responses } from "@shared/api";

export const register = async (form: Requests.User.Register['body']) => {
    const response = await Request.post<Responses.User.Register, Requests.User.Register>({
        url: '/users/register',
        body: form
    });

    return response.is(201);
}