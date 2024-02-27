import React from "react";
import { Col, Row } from "react-bootstrap";
import {Testable} from "../../../../shared/types/types.ts";

interface KanbanColumnProps extends Testable {
    title: string;
    children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, testId, children }) => {
    const cardList = React.Children.map(children, (child, index) => (
        <Row key={index}>
            {child}
        </Row>
    ));

    return (
        <Col>
            <h3>{title}</h3>
            <div className="kanban-cards-wrapper" data-testid={testId}>
                {cardList}
            </div>
        </Col>
    );
};

export default KanbanColumn;
