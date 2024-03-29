import {GetIssuesPayload} from "../modules/kanban/api/types.ts";
import {GetRepositoryPayload} from "../modules/repository/api/types.ts";

export enum LocalStorageKeys {
    KANBAN_CACHE = "KANBAN_CACHE"
}

export const GITHUB_API_BASE = "https://api.github.com";
export const DEFAULT_REPOSITORY_URL = "https://github.com/facebook/react";

export const Endpoints = {
    issues: (p: GetIssuesPayload) => `/repos/${p.repositoryOwner}/${p.repositoryName}/issues`,
    repository: (p: GetRepositoryPayload) => `/repos/${p.repositoryOwner}/${p.repositoryName}`,
}

export const Regex = {
    REPOSITORY_OWNER: /https:\/\/github.com\/(.+)\/.+/,
    REPOSITORY_NAME: /https:\/\/github.com\/.+\/(.+)/,
}