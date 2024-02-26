import { useCallback, useState, FormEvent } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TextInput from "../TextInput/TextInput.tsx";

export const LoadIssuesForm = () => {
    const [repoUrlValue, setRepoUrlValue] = useState<string>("");

    const onRepoUrlValueChange = useCallback((newValue: string) => {
        setRepoUrlValue(newValue);
    }, []);

    const handleLoadIssues = useCallback(() => {
        console.log(`Loading issues for: ${repoUrlValue}`);
    }, [repoUrlValue]);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLoadIssues();
    }, [handleLoadIssues]);

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
