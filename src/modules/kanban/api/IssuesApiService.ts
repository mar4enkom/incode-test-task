import {BaseHttpRequestHandler} from "../../../shared/helpers/BaseHttpRequestHandler.ts";
import {Endpoints} from "../../../shared/constants.ts";
import {IssueListResponse} from "../../../shared/types/apiTypes.ts";
import {IssueList} from "../types.ts";
import {GetIssuesPayload} from "./types.ts";

class IssueApiService extends BaseHttpRequestHandler {
    async get(payload: GetIssuesPayload): Promise<IssueList> {
        const response = await this.httpGet<IssueListResponse>(Endpoints.issues(payload));
        return this.transformIssues(response);
    }

    private transformIssues(response: IssueListResponse): IssueList {
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

export const issuesApiService = new IssueApiService();