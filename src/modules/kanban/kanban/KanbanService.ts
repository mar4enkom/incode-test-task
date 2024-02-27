import {issuesApiService} from "../api/IssuesApiService.ts";
import {KanbanState} from "../recoil/types.ts";

import {IssueStatus} from "../types.ts";
import {GetIssuesPayload} from "../api/types.ts";
import {kanbanCacheService} from "../cache/KanbanCacheService.ts";
import {generateRepoKanbanId} from "../utils.ts";
import {DropResult} from "react-beautiful-dnd";
import {moveCard} from "../../issue/ui/KanbanBoard/utils.ts";

class KanbanService {
    async get(payload: GetIssuesPayload): Promise<KanbanState> {
        const targetKanbanId = generateRepoKanbanId(payload.repositoryOwner, payload.repositoryName);
        const kanbanFromCache = kanbanCacheService.getOne(targetKanbanId);

        // TODO: improve caching algorithm
        // it is better to always make new request and merge with cached kanban state
        if(kanbanFromCache != null) return kanbanFromCache;

        const issuesFromApi = await issuesApiService.get(payload);
        const newRepositoryKanban = {
            id: targetKanbanId,
            columns: {
                [IssueStatus.TODO]: issuesFromApi,
                [IssueStatus.IN_PROGRESS]: [],
                [IssueStatus.DONE]: []
            }
        };
        kanbanCacheService.addOne(newRepositoryKanban, targetKanbanId);

        return newRepositoryKanban;
    }

    handleDragEnd(kanbanState: KanbanState, dropResult: DropResult): KanbanState {
        if (kanbanState == null) return;
        const newKanbanState = {
            ...kanbanState,
            columns: moveCard(kanbanState.columns, dropResult)
        };

        kanbanCacheService.updateOne(newKanbanState, kanbanState.id);
        return newKanbanState;
    }
}

export const kanbanService = new KanbanService();