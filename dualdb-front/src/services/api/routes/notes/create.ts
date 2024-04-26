import { Request } from "@/services/api/helpers/request";
import { Requests, Responses } from "@shared/api";

export const create = async (note: Requests.Note.Post['body']) => {
    const response = await Request.post<Responses.Note.Post, Requests.Note.Post>({
        url: '/notes',
        body: note
    });

    return response.is(201);
}