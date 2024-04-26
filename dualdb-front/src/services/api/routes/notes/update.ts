import { Request } from "@/services/api/helpers/request";
import { Requests, Responses } from "@shared/api";

export const update = async (note: Requests.Note.Put['body']) => {
    const response = await Request.put<Responses.Note.Put, Requests.Note.Put>({
        url: '/notes/' + note.id,
        body: note
    });

    return response.is(200);
}