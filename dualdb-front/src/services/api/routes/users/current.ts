import { Request } from "@/services/api/helpers/request";
import { API, Responses } from "@shared/api";

export const current = async () => {
    const response = await Request.get<Responses.User.Login, API.Request>({
        url: '/users/current'
    });

    return response.is(200);
}