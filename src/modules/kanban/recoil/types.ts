import {IssueList, IssueStatus} from "../types.ts";

export type KanbanState = {
    id: string;
    columns: Record<IssueStatus, IssueList>
} | undefined;