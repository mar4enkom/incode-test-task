import React, {useEffect, useMemo} from "react";
import {Col, Row} from "react-bootstrap";
import {useRecoilState} from "recoil";

import KanbanColumn from "../KanbanColumn/KanbanColumn.tsx";
import {issuesService} from "../../issues/IssuesService.ts";
import {issueListState} from "../../recoil/atoms.ts";
import {getIssueElementListGetter} from "./utils.tsx";
import {IssueStatus} from "../../shared/types.ts";

export const KanbanBoard: React.FC = () => {
    const [issuesList, setIssuesList] = useRecoilState(issueListState);

    useEffect(() => {
        issuesService.get()
            .then((res) => setIssuesList(res));
    }, [setIssuesList]);

    const getIssueElementList = useMemo(() => getIssueElementListGetter(issuesList), [issuesList]);

    return (
        <Col className="mt-4">
            <Row>
                <KanbanColumn title="ToDo">
                    {getIssueElementList(IssueStatus.TODO)}
                </KanbanColumn>

                <KanbanColumn title="In Progress">
                    {getIssueElementList(IssueStatus.IN_PROGRESS)}
                </KanbanColumn>

                <KanbanColumn title="Done">
                    {getIssueElementList(IssueStatus.DONE)}
                </KanbanColumn>
            </Row>
        </Col>
    );
};
