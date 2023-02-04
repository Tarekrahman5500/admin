import NewModel from "../../../compoents/ui/model/model.jsx";
import Input from "../../../compoents/ui/input/input.jsx";
import React from "react";
import {Col, Row} from "react-bootstrap";

const AddCategoryModel = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props;
    return (
        <NewModel
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            onSubmit={onSubmit}
        >
            <Row>
                <Col>
                    <Input
                        className="form-control-sm"
                        value={categoryName}
                        placeholder={`Category Name`}
                        controlId={`forCategory`}
                        label={''}
                        type={'text'}
                        error={""}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <select
                         className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select Category</option>
                        {
                            categoryList.map(options =>
                                <option key={options.value} value={options.value}>{options.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        //  value={categoryName}
                        placeholder={`Picture`}
                        controlId={`forImage`}
                        label={"Image"}
                        type={'file'}
                        error={""}
                        onChange={handleCategoryImage}
                        handleCategoryImage={handleCategoryImage}
                    />
                </Col>
            </Row>


        </NewModel>
    )
}

export default AddCategoryModel