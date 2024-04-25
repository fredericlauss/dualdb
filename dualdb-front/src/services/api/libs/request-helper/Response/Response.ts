import { API } from "@shared/api";

export class Response<Responses extends API.Responses, Body = Responses[keyof Responses]> {
    constructor(
        public ok: boolean,
        public status: number,
        public statusText: string,
        public body: Body
    ) {
    }

    is = <Code extends keyof Responses>(code: Code): this is Response<Responses, Responses[Code]> => {
        return this.status === code;
    }
}
