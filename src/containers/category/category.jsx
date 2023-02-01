import React, {useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addCategory,
    getAllCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from "../../actions/action";
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
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModel, setUpdateCategoryModel] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('picture', categoryImage)
        //  console.log(typeof categoryImage)
        //   console.log(categoryName, categoryImage)
        categoryName.length && dispatch(addCategory(form)).then(result => {
            if (result) {
                dispatch(getAllCategory())
                setCategoryName('')
                setParentCategoryId('')
                setCategoryImage('')
                setShow(false)
            }
        });
        setCategoryName('')
        setParentCategoryId('')
        setCategoryImage('')
        setShow(false)

    }
    const handleShow = () => setShow(true)

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0] || "")
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories()
        setUpdateCategoryModel(true)

    }

    const updateCheckedAndExpandedCategories = () => {

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
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
        // console.log({checked, expanded, categories, checkedArray, expandedArray})
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray =
                checkedArray.map((item, _index) => _index === index ? {...item, [key]: value} : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type === 'expanded') {
            const updatedExpandedArray =
                expandedArray.map((item, _index) => _index === index ? {...item, [key]: value} : item)
            setCheckedArray(updatedExpandedArray)
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

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        // console.log(form)
        dispatch(updateCategories(form));


        setCategoryName('')
        setParentCategoryId('')
        setUpdateCategoryModel(false)
    }

    const renderUpdateCategoriesModel = () => {
        return (

            <NewModel
                show={updateCategoryModel}
                handleClose={updateCategoriesForm}
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

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories()
        setDeleteCategoryModal(true)
    }
    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
        const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
       // console.log('here')
        if (checkedIdsArray.length > 0) {
            console.log(checkedIdsArray)
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }

        setDeleteCategoryModal(false);


    }
    const renderDeleteCategoryModel = () => {

        //console.log('delete', checkedArray, expandedArray)
        return (
            <NewModel
                modelTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            window.alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: () => deleteCategories()
                    }
                ]}
            >
                <h5>Expanded</h5>
                {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            </NewModel>
        )
    }
    const renderAddCategoryModel = () => {
        return (
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
        )
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
                        <button onClick={deleteCategory}>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModel()}
            {renderUpdateCategoriesModel()}
            {renderDeleteCategoryModel()}
        </Layout>
    );
};

export default Category;