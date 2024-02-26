import {atom} from "recoil";

import {Repository} from "../types.ts";

export const repositoryState = atom<Repository | undefined>({
    key: "repositoryState",
    default: undefined
});