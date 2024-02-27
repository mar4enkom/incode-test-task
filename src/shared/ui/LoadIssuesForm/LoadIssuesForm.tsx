import {useCallback, useState, FormEvent, useEffect} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TextInput from "../TextInput/TextInput.tsx";
import {useRecoilState} from "recoil";
import {kanbanState} from "../../../modules/kanban/recoil/atoms.ts";
import {kanbanController} from "../../../modules/kanban/controller/KanbanController.ts";
import {repositoryState} from "../../../modules/repository/recoil/atoms.ts";
import {repositoryController} from "../../../modules/repository/controller/repositoryController.ts";
import {DEFAULT_REPOSITORY_URL} from "../../constants.ts";

export const LoadIssuesForm = () => {
    const [currentRepository, setCurrentRepository] = useRecoilState(repositoryState);
    const [, setKanbanState] = useRecoilState(kanbanState);

    const [repoUrlValue, setRepoUrlValue] = useState<string>("");

    useEffect(() => {
        const initialRepoUrlValue = currentRepository?.repositoryUrl ?? "";
        setRepoUrlValue(initialRepoUrlValue);
    }, [currentRepository?.repositoryUrl]);

    const loadKanbanData = useCallback(async (repositoryUrl: string) => {
        const newKanbanState = await kanbanController.get(repositoryUrl);
        const newCurrentRepository = await repositoryController.get(repositoryUrl);

        setKanbanState(newKanbanState);
        setCurrentRepository(newCurrentRepository)
    }, [setCurrentRepository, setKanbanState])

    useEffect(() => {
        loadKanbanData(DEFAULT_REPOSITORY_URL);
    }, [loadKanbanData]);

    const onRepoUrlValueChange = useCallback((newValue: string) => {
        setRepoUrlValue(newValue);
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loadKanbanData(repoUrlValue);
    }, [loadKanbanData, repoUrlValue]);

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
