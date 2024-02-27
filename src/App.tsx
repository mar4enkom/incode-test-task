import {Container} from "react-bootstrap";
import {useRecoilState, useRecoilValue} from "recoil";

import {LoadIssuesForm} from "./shared/ui/LoadIssuesForm";
import Breadcrumbs from "./shared/ui/Breadcrumbs/Breadcrumbs.tsx";
import {KanbanBoard} from "./modules/kanban/ui/KanbanBoard/KanbanBoard.tsx";
import {repositoryState} from "./modules/repository/recoil/atoms.ts";
import {getRepositoryBreadCrumbs} from "./modules/repository/utils/getRepositoryBreadCrumbs.ts";
import {kanbanState} from "./modules/kanban/recoil/atoms.ts";
import {useCallback} from "react";
import {KanbanState} from "./modules/kanban/recoil/types.ts";

function App() {
    const [currentKanban, setCurrentKanban] = useRecoilState(kanbanState);
    // Of course, we should add loading and error indicators, but I'll leave it like this to save some time.
    const currentRepository = useRecoilValue(repositoryState);
    const breadCrumbs = getRepositoryBreadCrumbs(currentRepository);

    const onKanbanUpdate = useCallback((newKanbanState: KanbanState) => {
        setCurrentKanban(newKanbanState);
    }, [setCurrentKanban]);

    return (
        <Container>
            <LoadIssuesForm/>
            <Breadcrumbs items={breadCrumbs}/>
            <KanbanBoard currentKanban={currentKanban} onKanbanUpdate={onKanbanUpdate} />
        </Container>
    )
}

export default App
