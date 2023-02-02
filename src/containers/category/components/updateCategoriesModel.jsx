import NewModel from "../../../compoents/ui/model/model.jsx";
import {Col, Row} from "react-bootstrap";
import Input from "../../../compoents/ui/input/input.jsx";
import React from "react";

const UpdateCategoriesModel = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit,
        handleCategoryImage
    } = props
    return (

        <NewModel
            show={show}
            handleClose={handleClose}
            modelTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                controlId={`forCategory`}
                                label={""}
                                type={'text'}
                                error={""}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>select Category</option>
                                {
                                    categoryList.map(options =>
                                        <option key={options.value} value={options.value}>{options.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                        <Input
                            //  value={categoryName}
                            placeholder={`Picture`}
                            controlId={`forImage`}
                            label={"Image"}
                            type={'file'}
                            error={""}
                            onChange={handleCategoryImage}
                        />
                    </Row>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                controlId={`forCategory`}
                                label={""}
                                type={'text'}
                                error={""}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>select Category</option>
                                {
                                   categoryList.map(options =>
                                        <option key={options.value} value={options.value}>{options.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                        {/* <Input
                                //  value={categoryName}
                                placeholder={`Picture`}
                                controlId={`forImage`}
                                label={"Image"}
                                type={'file'}
                                error={""}
                                onChange={handleCategoryImage}
                            />*/}
                    </Row>
                )
            }

        </NewModel>
    )
}

export default UpdateCategoriesModel