import { FC } from "react";
import { Card } from "react-bootstrap";
import {getDaysAgo} from "./getDaysAgo.ts";
import {Issue} from "../../types.ts";

type KanbanCardProps = Pick<Issue, "title" | "number" | "createdAt" | "createdBy" | "commentsNumber">

export const KanbanCard: FC<KanbanCardProps> = (props) => {
    const {
        title,
        number,
        createdBy,
        commentsNumber,
        createdAt,
    } = props;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Issue #{number} opened {getDaysAgo(createdAt)}
                </Card.Text>
                <Card.Text>
                    {createdBy} | Comments: {commentsNumber}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
