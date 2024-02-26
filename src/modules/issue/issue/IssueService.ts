import {issuesApiService} from "../api/IssuesApiService.ts";
import {IssueState} from "../recoil/types.ts";

import {IssueStatus} from "../types.ts";

class IssueService {
    async get(): Promise<IssueState> {
        const issuesFromApi = await issuesApiService.get();

        return {
            [IssueStatus.TODO]: issuesFromApi,
            [IssueStatus.IN_PROGRESS]: [],
            [IssueStatus.DONE]: []
        }
    }
}

export const issueService = new IssueService();