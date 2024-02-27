import { screen, fireEvent } from '@testing-library/react';
import {vitest} from "vitest";

import {KanbanBoard, KanbanBoardProps} from './KanbanBoard';
import {KanbanState} from "../../recoil/types.ts";
import {IssueStatus} from "../../types.ts";
import {render} from "../../../../test/utils.tsx";

const mockKanbanState: KanbanState = {
    id: 'mockId',
    columns: {
        [IssueStatus.TODO]: [
            { id: '1', number: '1', title: 'Task 1', createdBy: 'User1', commentsNumber: 2, createdAt: '2022-01-01' },
        ],
        [IssueStatus.IN_PROGRESS]: [
            { id: '2', number: '2', title: 'Task 2', createdBy: 'User2', commentsNumber: 1, createdAt: '2022-01-02' },
        ],
        [IssueStatus.DONE]: [],
    },
};

export const mockKanbanBoardProps: KanbanBoardProps = {
    currentKanban: mockKanbanState,
    onKanbanUpdate: vitest.fn(),
};

describe('KanbanBoard component', () => {
    test('renders Kanban board with correct columns and cards', () => {
        render(<KanbanBoard {...mockKanbanBoardProps} />);

        Object.keys(mockKanbanState.columns).forEach((columnId) => {
            const columnTitleElement = screen.getByText(columnId);
            expect(columnTitleElement).toBeInTheDocument();

            const cardsInColumn = mockKanbanState.columns[columnId as IssueStatus];
            cardsInColumn.forEach((card) => {
                const cardTitleElement = screen.getByText(card.title);
                expect(cardTitleElement).toBeInTheDocument();
            });
        });
    });

    test('handles dragging and dropping', async () => {
        render(<KanbanBoard {...mockKanbanBoardProps} />);

        window.HTMLElement.prototype.scrollIntoView = vitest.fn();

        const draggableElement = screen.getByTestId('1');
        const droppableContainer = screen.getByTestId(IssueStatus.IN_PROGRESS);

        fireEvent.dragStart(draggableElement);
        fireEvent.dragEnter(droppableContainer);
        fireEvent.dragOver(droppableContainer);
        fireEvent.drop(droppableContainer);
        fireEvent.dragEnd(draggableElement);

        expect(draggableElement).toBeVisible();
    });

    // TODO: develop tests for reordering, moving between columns
});
