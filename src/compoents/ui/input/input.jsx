import React from 'react';
import {Form} from "react-bootstrap";

const Input = ({label, type, placeholder, controlId, value, onChange, error}) => {
    return (
        // a generic form for an item
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <Form.Text className="text-muted">
                {error}
            </Form.Text>
        </Form.Group>
    );
};

export default Input;