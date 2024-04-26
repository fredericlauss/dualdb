import { API, Models } from '..';

export interface Post extends API.Responses {
    201: never;
    500: never;
}

export interface Put extends API.Responses {
    200: never;
    500: never;
}

export interface Get extends API.Responses {
    200: Models.Note.Entity[];
    500: never;
}

export interface Delete extends API.Responses {
    200: never;
    500: never;
}
