import {Container} from "react-bootstrap";
import {useRecoilValue} from "recoil";

import {LoadIssuesForm} from "./shared/ui/LoadIssuesForm";
import Breadcrumbs from "./shared/ui/Breadcrumbs/Breadcrumbs.tsx";
import {KanbanBoard} from "./modules/kanban/ui/KanbanBoard/KanbanBoard.tsx";
import {repositoryState} from "./modules/repository/recoil/atoms.ts";
import {getRepositoryBreadCrumbs} from "./modules/repository/utils/getRepositoryBreadCrumbs.ts";

function App() {
    // Of course, we should add loading and error indicators, but I'll leave it like this to save some time.
    const currentRepository = useRecoilValue(repositoryState);
    const breadCrumbs = getRepositoryBreadCrumbs(currentRepository);

    return (
        <Container>
            <LoadIssuesForm/>
            <Breadcrumbs items={breadCrumbs}/>
            <KanbanBoard/>
        </Container>
    )
}

export default App
