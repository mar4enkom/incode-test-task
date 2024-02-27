import {LocalStorageHelper} from "../../../shared/helpers/LocalStorageHelper.ts";
import {IssueCache} from "./types.ts";
import {KanbanState} from "../recoil/types.ts";
import {LocalStorageKeys} from "../../../shared/constants.ts";

class KanbanCacheService {
    private localstorage = new LocalStorageHelper<IssueCache>(LocalStorageKeys.KANBAN_CACHE);

    getOne(repositoryId: string): KanbanState | undefined {
        const kanbanCache = this.localstorage.get();
        const targetRepositoryKanbanState = kanbanCache?.[repositoryId];

        return targetRepositoryKanbanState ?? undefined;
    }

    addOne(kanbanState: KanbanState, repositoryId: string): void {
        const kanbanCache = this.localstorage.get();
        const newKanbanCache = {
            ...kanbanCache,
            [repositoryId]: kanbanState
        };

        this.localstorage.set(newKanbanCache);
    }

    updateOne(newKanbanState: KanbanState, repositoryId: string): void {
        const kanbanCache = this.localstorage.get();
        const targetRepositoryKanbanState = kanbanCache?.[repositoryId];

        if(targetRepositoryKanbanState == null) throw new Error("Invalid repository id");

        const newKanbanCache = {
            ...kanbanCache,
            [repositoryId]: newKanbanState
        };

        this.localstorage.set(newKanbanCache);
    }
}

export const kanbanCacheService = new KanbanCacheService();