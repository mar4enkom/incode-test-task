import {IssueList, IssueStatus} from "../shared/types.ts";

export type IssueState = Record<IssueStatus, IssueList> | undefined;