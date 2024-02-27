import {BaseHttpRequestHandler} from "../../../shared/helpers/BaseHttpRequestHandler.ts";
import {RepositoryResponse} from "../../../shared/types/apiTypes.ts";
import {Endpoints} from "../../../shared/constants.ts";
import {Repository} from "../types.ts";
import {GetRepositoryPayload} from "./types.ts";

class RepositoryApiService extends BaseHttpRequestHandler {
    async get(payload: GetRepositoryPayload): Promise<Repository> {
        const response = await this.httpGet<RepositoryResponse>(Endpoints.repository(payload));
        return this.transformRepository(response)
    }

    private transformRepository(response: RepositoryResponse): Repository {
        return {
            id: response.id,
            ownerName: response.owner.login,
            ownerUrl: response.owner.html_url,
            repositoryName: response.name,
            repositoryUrl: response.html_url,
            starsNumber: response.stargazers_count,
        }
    }
}

export const repositoryApiService = new RepositoryApiService();