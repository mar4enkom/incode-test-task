import {IssueList, IssueStatus} from "../types.ts";

export type IssueState = Record<IssueStatus, IssueList> | undefined;