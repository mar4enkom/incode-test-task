import React, {useCallback} from "react";
import {useRecoilState} from "recoil";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

import KanbanColumn from "../KanbanColumn/KanbanColumn.tsx";
import {issueListState} from "../../recoil/atoms.ts";
import {KanbanCard} from "../KanbanCard";
import {moveCard} from "./utils.ts";

export const KanbanBoard: React.FC = () => {
    const [issueList, setIssueList] = useRecoilState(issueListState);

    const onDragEnd = useCallback((dropResult: DropResult) => {
        if (issueList == null) return;

        const reorderedCardList = moveCard(issueList, dropResult);
        setIssueList(reorderedCardList);
    }, [issueList, setIssueList])

    return (
        // This piece of code looks quite terrible; I wish I had the time to refactor it
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-wrapper">
                {Object.entries(issueList ?? {}).map(([columnId, cardPropList]) => (
                    <KanbanColumn title={columnId} key={columnId}>
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {cardPropList.map((cardProps, index) => (
                                        <Draggable key={cardProps.id} draggableId={cardProps.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <KanbanCard {...cardProps} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </KanbanColumn>
                ))}
            </div>
        </DragDropContext>
    );
};
