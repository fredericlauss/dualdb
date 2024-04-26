import { Request } from "@/services/api/helpers/request";
import { Requests, Responses } from "@shared/api";

export const _delete = async (noteId: number) => {
    const response = await Request.delete<Responses.Note.Delete, Requests.Note.Delete>({
        url: '/notes/' + noteId
    });

    return response.is(200);
}