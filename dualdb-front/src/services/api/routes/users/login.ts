import { Request } from "@/services/api/helpers/request";
import { Requests, Responses } from "@shared/api";

export const login = async (form: Requests.User.Register['body']) => {
    const response = await Request.post<Responses.User.Login, Requests.User.Register>({
        url: '/users/login',
        body: form
    });

    return response.is(200);
}