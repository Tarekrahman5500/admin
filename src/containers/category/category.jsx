import React, {useEffect, useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, getAllCategory} from "../../actions/action";
import Input from "../../compoents/ui/input/input.jsx";
import NewModel from "../../compoents/ui/model/model.jsx";


const Category = (props) => {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('picture', categoryImage)
      //  console.log(typeof categoryImage)
        if (categoryName.length > 0 ) {
        //   console.log(categoryName, categoryImage)
            dispatch(addCategory(form))
        }
        setCategoryName('')
        setParentCategoryId('')
        setCategoryImage('')
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let ct of categories) {
            myCategories.push(
                <li key={ct.name}>
                    {ct.name}
                    {ct.children.length > 0 ? (<ul>{renderCategories(ct.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name})
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}

                        </ul>
                    </Col>
                </Row>
            </Container>
            <NewModel
                show={show}
                handleClose={handleClose}
                modelTitle={'ADD new category'}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    controlId={`forCategory`}
                    label={"Category"}
                    type={'text'}
                    error={""}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                    <option>select Category</option>
                    {
                        createCategoryList(category.categories).map(options =>
                            <option key={options.value} value={options.value}>{options.name}</option>)
                    }
                </select>
                <Input
                    //  value={categoryName}
                    placeholder={`Picture`}
                    controlId={`forImage`}
                    label={"Image"}
                    type={'file'}
                    error={""}
                    onChange={handleCategoryImage}
                />
            </NewModel>
        </Layout>
    );
};

export default Category;