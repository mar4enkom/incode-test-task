import {DropResult} from "react-beautiful-dnd";


export function moveCard<T extends Record<string, {id: string}[]>>(prevState: T, dropResult: DropResult): T {
    const { destination, source, draggableId } = dropResult;

    const sameColumn = destination?.droppableId === source.droppableId;
    const sameIndex = destination?.index === source.index;
    if (!destination || (sameColumn && sameIndex)) return prevState;

    const sourceId = source.droppableId as keyof T;
    const destinationId = destination.droppableId as keyof T;

    let prevStateCopy = {...prevState!};
    prevStateCopy = {
        ...prevStateCopy!,
        [sourceId]: prevStateCopy![sourceId]
            .filter(issueItem => issueItem.id !== draggableId),
    };

    const destinationColumnCopy = [...prevStateCopy![destinationId]]
    const elementToInsert = prevStateCopy![sourceId]
        .find(issueItem => issueItem.id === draggableId)!;
    destinationColumnCopy.splice(destination.index, 0, elementToInsert);
    prevStateCopy = {
        ...prevStateCopy!,
        [destinationId]: destinationColumnCopy,
    }

    return prevStateCopy;
}