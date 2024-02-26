import {BaseHttpRequestHandler} from "../shared/helpers/BaseHttpRequestHandler.ts";
import {Endpoints} from "../shared/constants.ts";
import {IssueList} from "../shared/types.ts";
import {IssueListResponse} from "../shared/apiTypes.ts";

class IssuesApiService extends BaseHttpRequestHandler {
    async get(): Promise<IssueList> {
        const response = await this.httpGet<IssueListResponse>(Endpoints.ISSUES);
        return this.transformGetIssues(response);
    }

    private transformGetIssues(response: IssueListResponse): IssueList {
        return response.map(responseItem => ({
            title: responseItem.title,
            id: responseItem.id.toString(),
            number: responseItem.number.toString(),
            createdBy: responseItem.user.login,
            commentsNumber: responseItem.comments,
            createdAt: responseItem.created_at,
        }))
    }
}

export const issuesApiService = new IssuesApiService();