export type Request = {
    parameters: {};
    query: {};
    body: {};
    cookies: {
        jwt?: string
    };
};

export type Responses = {
    [code in keyof ValidResponses]: ValidResponses[code];
};

export type ValidResponses = {
    '200': any;
    '204': never;

    '400': any;
    '401': never;
    '402': never;
    '403': never;
    '404': never;

    500: never;
};

export interface PaginationOptions {
    page: number;
    pageSize?: number;
}

export interface ValidationError {
    type: string;
    errors: {
        [field: string]: {
            type: string;
            message: string;
        };
    };
}

// TODO: This should be moved somewhere else
// export interface UserTokenPayload {
//     id: string
//     username: string
//     email: string
//     exp: number
// }