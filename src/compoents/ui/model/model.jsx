import React from 'react';
import {Button, Modal} from "react-bootstrap";

const NewModel = (props) => {
    const {modalTitle, show, handleClose, size, buttons} = props
    return (<Modal size={size} show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            {buttons ? (buttons.map((btn, index) => (<Button key={index} variant={btn.color} onClick={btn.onClick}>
                {btn.label}
            </Button>))) : (<Button variant="primary" className="btn-sm" style={{backgroundColor: '#333'}}
                                    {...props} onClick={props.onSubmit}>
                Save
            </Button>)}

        </Modal.Footer>
    </Modal>);
};

export default NewModel;