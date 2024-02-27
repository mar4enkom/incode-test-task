import React, {useCallback} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

import KanbanColumn from "../KanbanColumn/KanbanColumn.tsx";
import {KanbanCard} from "../KanbanCard";
import {kanbanService} from "../../kanban/KanbanService.ts";
import {KanbanState} from "../../recoil/types.ts";

export interface KanbanBoardProps {
    currentKanban: KanbanState;
    onKanbanUpdate(a: KanbanState): void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({currentKanban, onKanbanUpdate}) => {
    const onDragEnd = useCallback((dropResult: DropResult) => {
        const reorderedCardList = kanbanService.handleDragEnd(currentKanban, dropResult);
        onKanbanUpdate(reorderedCardList);
    }, [currentKanban, onKanbanUpdate]);

    return (
        // This piece of code looks quite terrible; I wish I had the time to refactor it
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-wrapper">
                {Object.entries(currentKanban?.columns ?? {}).map(([columnId, cardPropList]) => (
                    <KanbanColumn title={columnId} key={columnId} testId={columnId}>
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {cardPropList.map((cardProps, index) => (
                                        <Draggable key={cardProps.id} draggableId={cardProps.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    data-testid={cardProps.id}
                                                >
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
