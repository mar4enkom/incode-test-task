import {GITHUB_API_BASE} from "../constants.ts";

type EndpointParams = Record<string, string>;

export abstract class BaseHttpRequestHandler {
    private apiBase: string;

    constructor(apiBase: string = GITHUB_API_BASE) {
        this.apiBase = apiBase;
    }

    async httpGet<T>(endpoint: string, params?: EndpointParams): Promise<T> {
        const url = this.buildGetEndpointURL(endpoint, params);
        return await this.fetchApi(url);
    }

    async httpPost<T>(endpoint: string, data: EndpointParams): Promise<T> {
        const url = this.buildEndpointURL(endpoint);
        return await this.fetchApi(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }


    async httpPut<T>(endpoint: string, data: unknown): Promise<T> {
        const url = this.buildEndpointURL(endpoint);
        return await this.fetchApi(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    async httpDelete<T>(endpoint: string): Promise<T> {
        const url = this.buildEndpointURL(endpoint);
        return await this.fetchApi(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    private buildEndpointURL(endpoint: string) {
        return `${this.apiBase}${endpoint}`;
    }

    private buildGetEndpointURL(endpoint: string, params?: EndpointParams): string {
        let baseEndpointURL = this.buildEndpointURL(endpoint);

        if(params == null) return baseEndpointURL;

        const query = this.buildQueryParamsString(params);
        baseEndpointURL = baseEndpointURL.concat(query);

        return baseEndpointURL
    }

    private buildQueryParamsString(params: EndpointParams) {
        const queryParams = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        return queryParams.length > 0 ? `?${queryParams}` : '';
    }

    private async fetchApi<T>(...fetchParams: Parameters<typeof fetch>): Promise<T> {
        const response = await fetch(...fetchParams);

        if (!response.ok) {
            const responseError = await response.json();
            throw new Error(`Invalid server response ${responseError}`);
        }

        return await response.json() as T;
    }
}
