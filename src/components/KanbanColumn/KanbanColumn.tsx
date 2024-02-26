import React from "react";
import { Col, Row } from "react-bootstrap";

interface KanbanColumnProps {
    title: string;
    children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, children }) => {
    const cardList = React.Children.map(children, (child, index) => (
        <Row key={index}>
            {child}
        </Row>
    ));

    return (
        <Col>
            <h3>{title}</h3>
            <div className="kanban-cards-wrapper">
                {cardList}
            </div>
        </Col>
    );
};

export default KanbanColumn;
