import React from 'react';
import {Form} from "react-bootstrap";

const Input = (props) => {
    const {type, placeholder, controlId, value, onChange, error} = props
    let input
    if (type === 'select') {
        input = <Form.Group className="mb-3" controlId={controlId}>
            {props.label && <Form.Label>{props.label}</Form.Label>}
            <select
                className="form-control form-control-sm"
                value={value}
                onChange={onChange}
            >
                <option value="">{placeholder}</option>
                {
                    props.options.length > 0 ?
                        props.options.map((option, index) =>
                            <option key={index} value={option.value}>{option.name}</option>
                        ) : null
                }
            </select>
        </Form.Group>
    } else {
        input = <Form.Group className="mb-3" controlId={controlId}>
            {props.label && <Form.Label>{props.label}</Form.Label>}
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
    }
    return input
};

export default Input;