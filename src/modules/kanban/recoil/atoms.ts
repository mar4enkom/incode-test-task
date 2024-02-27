import {atom} from "recoil";
import {KanbanState} from "./types.ts";

export const kanbanState = atom<KanbanState>({
    key: "kanbanState",
    default: undefined
});