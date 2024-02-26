import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface KanbanColumnProps {
    title: string;
    children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, children }) => {
    const cardList = React.Children.map(children, (child, index) => (
        <Row key={index} className="mb-3">
            {child}
        </Row>
    ));

    return (
        <Col>
            <h3>{title}</h3>
            <Container>
                {cardList}
            </Container>
        </Col>
    );
};

export default KanbanColumn;
