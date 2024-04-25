import { API } from "@shared/api";

export interface ValidTargets {
    [key: string]: string;
}

export interface BaseConfiguration<Targets extends ValidTargets> {
    targets: Targets;
    defaultTarget: keyof Targets;
    defaultOptions: RequestOptions;
}

export type Configuration<Targets extends ValidTargets, Request extends API.Request> = {
    url: RequestUrl,
    target?: keyof Targets;
    options?: RequestOptions;
} & ConfigurationBody<Request>
    & ConfigurationQuery<Request>

export type ConfigurationBody<Request extends API.Request> =
    keyof Request['body'] extends never
        ? {}
        : { body: Request['body'] }

export type ConfigurationQuery<Request extends API.Request> =
    keyof Request['query'] extends never
        ? {}
        : { query: Request['query'] }

export interface RequestOptions extends RequestInit {};
export type RequestUrl = URL | RequestInfo;

export type Method =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';