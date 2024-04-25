import qs from 'qs';
import { Method, BaseConfiguration, Configuration, RequestOptions, RequestUrl, ValidTargets } from "./Request.types";
import { API } from '@shared/api';
import { Response } from './Response/Response';

export default class RequestHelper<Targets extends ValidTargets> {

    private _targets: Targets;
    private _defaultTarget: keyof Targets;
    private _options: RequestOptions;

    constructor(baseConfiguration: BaseConfiguration<Targets>) {
        this._targets = baseConfiguration.targets;
        this._defaultTarget = baseConfiguration.defaultTarget;
        this._options = baseConfiguration.defaultOptions;
    }

    // Base methods

    async make<Responses extends API.Responses = never, Request extends API.Request = never>(
        method: Method,
        configuration: Configuration<Targets, Request>
    ): Promise<Response<Responses>> {
        const { url, target, options, query, body } = this._getConfiguration({
            body: {},
            query: {},
            ...configuration,
            options: { method }
        });

        if (!['GET', 'DELETE'].includes(method) && body)
            options.body = JSON.stringify(body);

        try {
            const requestUrl = this._getRequestUrl(url, target, query);

            const response = await fetch(requestUrl, options);
            const { ok, status, statusText } = response;

            const body = (!response.body)
                ? null
                : await response.json();

            return new Response<Responses>(
                ok,
                status,
                statusText,
                body
            );
        } catch (error) {
            console.log(`\x1b[33mError while fetching with url : ${url}\x1b[37m`);
            console.log(error);
        }

        return new Response<Responses>(
            false,
            500,
            'Network error, request failed.',
            body
        );
    }

    // Abstraction methods

    get = <
        Responses extends API.Responses = never,
        Request extends API.Request = never
    >(configuration: Configuration<Targets, Request>) => this.make<Responses, Request>('GET', configuration);

    post = <
        Responses extends API.Responses = never,
        Request extends API.Request = never
    >(configuration: Configuration<Targets, Request>) => this.make<Responses, Request>('POST', configuration);

    put = <
        Responses extends API.Responses = never,
        Request extends API.Request = never
    >(configuration: Configuration<Targets, Request>) => this.make<Responses, Request>('PUT', configuration);

    patch = <
        Responses extends API.Responses = never,
        Request extends API.Request = never
    >(configuration: Configuration<Targets, Request>) => this.make<Responses, Request>('PATCH', configuration);

    delete = <
        Responses extends API.Responses = never,
        Request extends API.Request = never
    >(configuration: Configuration<Targets, Request>) => this.make<Responses, Request>('DELETE', configuration);

    // Methods for cookies
    srvGet = <
        Responses extends API.Responses = never,
        Request extends API.Request = never
    >(configuration: Configuration<Targets, Request>, cookies?: string) => {
        return this.get<Responses, Request>({
            ...configuration,
            options: {
                ...configuration.options,
                headers: {
                    Cookie: cookies || ''
                }
            }
        })
    }

    // Private utilities

    private _getConfiguration = (configuration: Configuration<Targets, any>) => {
        return {
            target: this._defaultTarget,
            ...configuration,
            options: this._getOptions(
                configuration.options
            )
        }
    }

    private _getOptions = (options?: RequestOptions): RequestOptions => {
        if (!options) return this._options;

        return {
            ...this._options,
            ...options,
            headers: {
                ...this._options.headers,
                ...options.headers
            }
        }
    }

    private _getRequestUrl = <Query extends API.Request['query']>(url: RequestUrl, target?: keyof Targets, query?: Query): RequestUrl => {
        const requestTarget = target || this._defaultTarget;
        if (!this._isValidTarget(requestTarget))
            throw new Error(`Invalid request target '${requestTarget}'.`)

        let requestUrl = this._targets[requestTarget] as string;
        requestUrl += url;

        if (query) requestUrl += `?${qs.stringify(query)}`;

        return requestUrl;
    }

    private _isValidTarget = (target: any): target is keyof Targets =>
        (typeof target === 'string') && (target in this._targets);
}