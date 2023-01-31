import React, {useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../actions/action";
import Input from "../../compoents/ui/input/input.jsx";
import NewModel from "../../compoents/ui/model/model.jsx";
import CheckboxTree from 'react-checkbox-tree';
import {IoIosArrowForward, IoIosArrowDown, IoIosCheckboxOutline, IoIosCheckbox} from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Category = (props) => {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkArray, setCheckArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModel, setUpdateCategoryModel] = useState(false)

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('picture', categoryImage)
        //  console.log(typeof categoryImage)
        if (categoryName.length > 0) {
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

    const updateCategory = () => {
        setUpdateCategoryModel(true)
        const categories = createCategoryList(category.categories)
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && expandedArray.push(category)
        })
        setCheckArray(checkedArray)
        setExpandedArray(expandedArray)
        console.log({checked, expanded, categories, checkedArray, expandedArray})
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckArray =
                checkArray.map((item, _index) => _index === index ? {...item, [key]: value} : item)
            setCheckArray(updatedCheckArray)
        } else if (type === 'expanded') {
            const updatedExpandedArray =
                expandedArray.map((item, _index) => _index === index ? {...item, [key]: value} : item)
            setCheckArray(updatedExpandedArray)
        }
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let ct of categories) {
            myCategories.push({
                label: ct.name,
                value: ct._id,
                children: ct.children.length > 0 && renderCategories(ct.children)
            })
        }
        return myCategories
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name, parentId: category.parentId,})
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
                        {/*<ul>
                            {renderCategories(category.categories)}

                        </ul>*/}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox/>,
                                uncheck: <IoIosCheckboxOutline/>,
                                halfCheck: <IoIosCheckboxOutline/>,
                                expandClose: <IoIosArrowForward/>,
                                expandOpen: <IoIosArrowDown/>,
                            }
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
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

            {/*Edit categories*/}
            <NewModel
                show={updateCategoryModel}
                handleClose={() => setUpdateCategoryModel(false)}
                modelTitle={'Update Categories'}
                size="lg"
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
                                        createCategoryList(category.categories).map(options =>
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
                    checkArray.length > 0 &&
                    checkArray.map((item, index) =>
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
                                        createCategoryList(category.categories).map(options =>
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

            </NewModel>
        </Layout>
    );
};

export default Category;