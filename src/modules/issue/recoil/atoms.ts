import {atom} from "recoil";
import {IssueState} from "./types.ts";

export const issueListState = atom<IssueState>({
    key: "issueListState",
    default: undefined
});