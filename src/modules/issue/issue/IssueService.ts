import {issuesApiService} from "../api/IssuesApiService.ts";
import {IssueState} from "../recoil/types.ts";

import {IssueStatus} from "../types.ts";
import {GetIssuesPayload} from "../api/types.ts";

class IssueService {
    async get(payload: GetIssuesPayload): Promise<IssueState> {
        const issuesFromApi = await issuesApiService.get(payload);

        return {
            [IssueStatus.TODO]: issuesFromApi,
            [IssueStatus.IN_PROGRESS]: [],
            [IssueStatus.DONE]: []
        }
    }
}

export const issueService = new IssueService();