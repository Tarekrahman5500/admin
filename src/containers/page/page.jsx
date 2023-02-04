import React, {useEffect, useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import NewModel from "../../compoents/ui/model/model.jsx";
import {Col, Container, Row} from "react-bootstrap";
import Input from "../../compoents/ui/input/input.jsx";
import linearCategories from "../../helpers/linearCategories.js";
import {useDispatch, useSelector} from "react-redux";
import {createPage} from "../../actions/action.js";

const Page = (props) => {
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category)
    const page = useSelector(state => state.page)
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        setCategories(linearCategories(category.categories))
    }, [category])

    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);
    // console.log('category', categories)
    const handleBannerImages = (e) => {
        //  console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        //  console.log(e);
        setProducts([...products, e.target.files[0]]);
    }
    const onCategoryChange = (e) => {
        // console.log(e.target.value)
        const category = categories.find(category => category.value == e.target.value);
        //   console.log(category)
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const submitPageForm = (e) => {
        // e.preventDefault();
        // console.log(banners.length)
        if (title === "") {
            window.alert('Title is required');
            setCreateModal(false);
            return;
        }
        if (desc === "") {
            window.alert('Description is required');
            setCreateModal(false);
            return;
        }
        if (banners.length === 0) {
            window.alert('Banner Image is required');
            setCreateModal(false);
            return;
        }
        if (products.length === 0) {
            window.alert('Product Image is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        // console.log({title, desc, categoryId, type, banners, products})

        dispatch(createPage(form));
        setCreateModal(false);


    }
    const renderPageModel = () => {
        return (
            <NewModel
                show={createModal}
                handleClose={() => setCreateModal(false)}
                modalTitle={'Create New Page'}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            {/*<select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value={""}>Select Category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select>*/}
                            <Input
                                type="select"
                                lable={''}
                                value={categoryId}
                                onChange={onCategoryChange}
                                controlId={''}
                                options={categories}
                                placeholder={'Select Category'}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                label={''}
                                placeholder={`Page Title`}
                                controlId={''}
                                error={''}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                label={''}
                                placeholder={`Page Desc`}
                                controlId={''}
                                error={''}
                                type="text"
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) =>
                                    <Row key={index}>
                                        <Col>{banner.name}</Col>
                                    </Row>
                                ) : null
                        }
                        <Col>
                            <Input
                                name="banners"
                                type="file"
                                onChange={handleBannerImages}
                                label={'Banner Image'}
                                placeholder={`Banner Image`}
                                controlId={'forBanner'}
                                error={''}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.length > 0 ?
                                products.map((product, index) =>
                                    <Row key={index}>
                                        <Col>{product.name}</Col>
                                    </Row>
                                ) : null
                        }
                        <Col>
                            <Input
                                name="products"
                                type="file"
                                onChange={handleProductImages}
                                label={'Product Image'}
                                placeholder={`Product Image`}
                                controlId={'forProduct'}
                                error={''}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                </Container>
            </NewModel>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ?
                    <>
                        page.loading ?
                        <p>Creating Page...please wait</p>
                    </>
                    : <>
                        {renderPageModel()}
                        <button onClick={() => setCreateModal(true)}>Add Page</button>
                    </>
            }

        </Layout>
    );
};

export default Page;