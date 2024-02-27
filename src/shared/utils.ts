import {Regex} from "./constants.ts";

export function validateGithubRepositoryURL(repositoryUrl: string): boolean {
    return Regex.REPOSITORY_NAME.test(repositoryUrl) && Regex.REPOSITORY_OWNER.test(repositoryUrl);
}