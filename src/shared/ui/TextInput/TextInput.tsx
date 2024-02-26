import React from 'react';
import { Form } from 'react-bootstrap';

type TextInputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface TextInputProps extends TextInputBaseProps {
    value: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const {placeholder, value, onChange} = props;
    return (
        <Form.Group>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </Form.Group>
);
};

export default TextInput;
