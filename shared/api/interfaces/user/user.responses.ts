import { API } from ".."

export interface Register extends API.Responses {
    201: never;
    500: never;
}

export interface Login extends API.Responses {
    200: never;
    500: never;
}