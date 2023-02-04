import React, {useEffect, useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from "../../actions/action";
import NewModel from "../../compoents/ui/model/model.jsx";
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosAdd,
    IoIosTrash, IoIosCloudUpload
} from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModel from "./components/updateCategoriesModel.jsx";
import AddCategoryModel from "./components/AddCategoryModel.jsx";
import './style.css'

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

        useEffect(() => {
            if (!category.loading) {
            setShow(false);
        }

    }, [category.loading]);

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('picture', categoryImage)
        // console.log(categoryName.length, categoryImage.size, parentCategoryId.length)
        categoryName.length > 0 && parentCategoryId.length > 0 && categoryImage.size && dispatch(addCategory(form))
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
            options.push({value: category._id, name: category.name, parentId: category.parentId, type: category.type})
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


    const deleteCategory = () => {
        updateCheckedAndExpandedCategories()
        setDeleteCategoryModal(true)
    }
    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
        const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
        // const idsArray = expandedIdsArray.concat(checkedIdsArray);
        // console.log('here')
        if (checkedIdsArray.length > 0) {
            console.log(checkedIdsArray)
            dispatch(deleteCategoriesAction(checkedIdsArray))
            setDeleteCategoryModal(false)
        }
        setDeleteCategoryModal(false);
    }
    const renderDeleteCategoryModel = () => {

        //console.log('delete', checkedArray, expandedArray)
        return (
            <NewModel
                modalTitle="Confirm"
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

    const categoryList = createCategoryList(category.categories);
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd/> <span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash/> <span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload/> <span>Edit</span></button>
                            </div>

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

            </Container>
            <AddCategoryModel
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'ADD New category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            >
            </AddCategoryModel>
            <UpdateCategoriesModel
                show={updateCategoryModel}
                handleClose={() => setUpdateCategoryModel(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                handleCategoryImage={handleCategoryImage}
                categoryList={categoryList}
            >

            </UpdateCategoriesModel>

            {
                renderDeleteCategoryModel()
            }
        </Layout>
    )
        ;
};

export default Category;