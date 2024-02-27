import { useCallback, useState, FormEvent } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TextInput from "../TextInput/TextInput.tsx";
import {useRecoilState} from "recoil";
import {kanbanState} from "../../../modules/kanban/recoil/atoms.ts";
import {kanbanController} from "../../../modules/kanban/controller/KanbanController.ts";
import {repositoryState} from "../../../modules/repository/recoil/atoms.ts";
import {repositoryController} from "../../../modules/repository/controller/repositoryController.ts";

export const LoadIssuesForm = () => {
    const [repoUrlValue, setRepoUrlValue] = useState<string>("");
    const [, setCurrentRepository] = useRecoilState(repositoryState);
    const [, setKanbanState] = useRecoilState(kanbanState);

    const onRepoUrlValueChange = useCallback((newValue: string) => {
        setRepoUrlValue(newValue);
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newKanbanState = await kanbanController.get(repoUrlValue);
        const newCurrentRepository = await repositoryController.get(repoUrlValue);

        setKanbanState(newKanbanState);
        setCurrentRepository(newCurrentRepository)
    }, [repoUrlValue, setCurrentRepository, setKanbanState]);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2 mt-3" as={Row}>
                    <Col xs={10}>
                        <TextInput
                            placeholder="Enter repo URL"
                            value={repoUrlValue}
                            onChange={onRepoUrlValueChange}
                        />
                    </Col>
                    <Col xs={2}>
                        <Button variant="primary" type="submit" className="w-100">
                            Load Issues
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};
