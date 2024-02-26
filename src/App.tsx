import {Container} from "react-bootstrap";
import {LoadIssuesForm} from "./shared/ui/LoadIssuesForm";
import Breadcrumbs from "./shared/ui/Breadcrumbs/Breadcrumbs.tsx";
import {KanbanBoard} from "./modules/issue/ui/KanbanBoard/KanbanBoard.tsx";
import {useRecoilState} from "recoil";
import {repositoryState} from "./modules/repository/recoil/atoms.ts";
import {useEffect} from "react";
import {repositoryApiService} from "./modules/repository/api/RepositoryApiService.ts";
import {getRepositoryBreadCrumbs} from "./modules/repository/utils/getRepositoryBreadCrumbs.ts";

function App() {
    // Of course, we should add loading and error indicators, but I'll leave it like this to save some time.
    const [currentRepository, setCurrentRepository] = useRecoilState(repositoryState);

    useEffect(() => {
        repositoryApiService.get().then(res => setCurrentRepository(res));
    }, [setCurrentRepository]);
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
