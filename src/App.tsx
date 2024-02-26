import {Container} from "react-bootstrap";
import {LoadIssuesForm} from "./components/LoadIssuesForm";
import Breadcrumbs from "./shared/ui/Breadcrumbs/Breadcrumbs.tsx";
import {KanbanBoard} from "./components/KanbanBoard/KanbanBoard.tsx";

const breadcrumbItems = [
    { text: 'Home', link: '/' },
    { text: 'Category', link: '/category' },
    { text: 'Product', link: '/category/product' },
];

function App() {
  return (
      <Container>
          <LoadIssuesForm />
          <Breadcrumbs items={breadcrumbItems} />
          <KanbanBoard />
      </Container>
  )
}

export default App
