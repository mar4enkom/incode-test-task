import { useCallback, useState, FormEvent } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TextInput from "../TextInput/TextInput.tsx";
import {useRecoilState} from "recoil";
import {issueListState} from "../../../modules/issue/recoil/atoms.ts";
import {issueController} from "../../../modules/issue/controller/IssueController.ts";
import {repositoryState} from "../../../modules/repository/recoil/atoms.ts";
import {repositoryController} from "../../../modules/repository/controller/repositoryController.ts";

export const LoadIssuesForm = () => {
    const [repoUrlValue, setRepoUrlValue] = useState<string>("");
    const [, setCurrentRepository] = useRecoilState(repositoryState);
    const [, setIssueList] = useRecoilState(issueListState);

    const onRepoUrlValueChange = useCallback((newValue: string) => {
        setRepoUrlValue(newValue);
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newIssueList = await issueController.get(repoUrlValue);
        const newCurrentRepository = await repositoryController.get(repoUrlValue);

        setIssueList(newIssueList);
        setCurrentRepository(newCurrentRepository)
    }, [repoUrlValue, setCurrentRepository, setIssueList]);

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
