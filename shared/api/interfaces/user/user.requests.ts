import { API } from ".."

export interface Login extends API.Request {
    body: {
        username: string
        password: string
    }
}

export interface Register extends API.Request {
    body: {
        username: string
        password: string
    }
}