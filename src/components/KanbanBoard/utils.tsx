import {IssueState} from "../../recoil/types.ts";
import {IssueStatus} from "../../shared/types.ts";
import {KanbanCard} from "../KanbanCard";
import React from "react";

export function getIssueElementListGetter(issueState: IssueState) {
    return (issueStatus: IssueStatus): React.ReactElement[] => {
        return issueState?.[issueStatus]?.map(issue => {
            const {id, ...issueProps} = issue;
            return <KanbanCard key={id} {...issueProps} />;
        }) ?? [];
    }
}