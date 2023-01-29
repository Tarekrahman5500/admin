import React from 'react';
import {Button, Modal} from "react-bootstrap";
import Input from "../input/input.jsx";

const NewModel = (props) => {
    const {modelTitle,show,handleClose} = props
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modelTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.children
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default NewModel;