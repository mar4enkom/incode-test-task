export interface Issue {
    id: string;
    number: string;
    title: string;
    createdBy: string;
    commentsNumber: number;
    createdAt: string;
}

export type IssueList = Issue[];

export enum IssueStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}
