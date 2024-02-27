import {GetIssuesPayload} from "../modules/issue/api/types.ts";
import {GetRepositoryPayload} from "../modules/repository/api/types.ts";

export const GITHUB_API_BASE = "https://api.github.com";

export const Endpoints = {
    issues: (p: GetIssuesPayload) => `/repos/${p.repositoryOwner}/${p.repositoryName}/issues`,
    repository: (p: GetRepositoryPayload) => `/repos/${p.repositoryOwner}/${p.repositoryName}`,
}

export const Regex = {
    REPOSITORY_OWNER: /https:\/\/github.com\/repos\/(.+)\/.+/,
    REPOSITORY_NAME: /https:\/\/github.com\/repos\/.+\/(.+)/,
}