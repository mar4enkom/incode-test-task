import {validateGithubRepositoryURL} from "../../../shared/utils.ts";
import {Regex} from "../../../shared/constants.ts";
import {GetRepositoryPayload} from "../api/types.ts";
import {repositoryApiService} from "../api/RepositoryApiService.ts";

class RepositoryController {
    async get(repositoryUrl: string) {
        this.validateGetPayload(repositoryUrl);
        const payload = this.transformGetPayload(repositoryUrl);

        return repositoryApiService.get(payload);
    }

    private validateGetPayload(repositoryUrl: string): void {
        const validationResult = validateGithubRepositoryURL(repositoryUrl)
        if(!validationResult) alert("Invalid repository URL input");
    }

    transformGetPayload(repositoryUrl: string): GetRepositoryPayload {
        const repositoryName = Regex.REPOSITORY_NAME.exec(repositoryUrl)![1];
        const repositoryOwner = Regex.REPOSITORY_OWNER.exec(repositoryUrl)![1];

        return { repositoryOwner, repositoryName };
    }
}

export const repositoryController = new RepositoryController();
