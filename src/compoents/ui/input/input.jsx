import React from 'react';
import {Form} from "react-bootstrap";

const Input = (props) => {
    const { type, placeholder, controlId, value, onChange, error} = props
    return (
        // a generic form for an item
        <Form.Group className="mb-3" controlId={controlId}>
            {props.label &&  <Form.Label>{props.label}</Form.Label>}
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            <Form.Text className="text-muted">
                {error}
            </Form.Text>
        </Form.Group>
    );
};

export default Input;