import { API } from ".."

export interface Post extends API.Request {
    body: {
        title: string;
        content: string;
    }
}

export interface Put extends API.Request {
    body: {
        id: number;
        title: string;
        content: string;
    }
}

export interface Delete extends API.Request {
    path: {
        userId: string
    }
}