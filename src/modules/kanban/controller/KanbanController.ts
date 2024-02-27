import {GetIssuesPayload} from "../api/types.ts";
import {kanbanService} from "../kanban/KanbanService.ts";
import {Regex} from "../../../shared/constants.ts";
import {validateGithubRepositoryURL} from "../../../shared/utils.ts";

class KanbanController {
    async get(repositoryUrl: string) {
        this.validateGetPayload(repositoryUrl);
        const payload = this.transformGetPayload(repositoryUrl);

        return kanbanService.get(payload);
    }

    private validateGetPayload(repositoryUrl: string): void {
        const validationResult = validateGithubRepositoryURL(repositoryUrl)
        if(!validationResult) alert("Invalid repository URL input");
    }

    transformGetPayload(repositoryUrl: string): GetIssuesPayload {
        const repositoryName = Regex.REPOSITORY_NAME.exec(repositoryUrl)![1];
        const repositoryOwner = Regex.REPOSITORY_OWNER.exec(repositoryUrl)![1];

        return { repositoryOwner, repositoryName };
    }
}

export const kanbanController = new KanbanController();