import React, {useCallback} from "react";
import {useRecoilState} from "recoil";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

import KanbanColumn from "../KanbanColumn/KanbanColumn.tsx";
import {kanbanState} from "../../recoil/atoms.ts";
import {KanbanCard} from "../KanbanCard";
import {kanbanService} from "../../kanban/KanbanService.ts";

export const KanbanBoard: React.FC = () => {
    const [currentKanban, setCurrentKanban] = useRecoilState(kanbanState);

    const onDragEnd = useCallback((dropResult: DropResult) => {
        const reorderedCardList = kanbanService.handleDragEnd(currentKanban, dropResult);
        setCurrentKanban(reorderedCardList);
    }, [currentKanban, setCurrentKanban]);

    return (
        // This piece of code looks quite terrible; I wish I had the time to refactor it
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-wrapper">
                {Object.entries(currentKanban?.columns ?? {}).map(([columnId, cardPropList]) => (
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
