import React, {useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Col, Container, Row, Table} from "react-bootstrap";
import Input from "../../compoents/ui/input/input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../actions/action";
import NewModel from "../../compoents/ui/model/model.jsx";
import './style.css'

const Products = () => {

    const currentCategory = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    let index = 1

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name});
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };
    const handleClose = async () => {
        const form = new FormData()
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPictures) {
            form.append("picture", pic);
        }
        if (name.length > 0 && quantity.length > 0 && price.length > 0
            && description.length > 0 && categoryId.length > 0) {
            dispatch(addProduct(form))
            setName('')
            setQuantity('')
            setPrice('')
            setDescription('')
            setCategoryId('')
            setProductPictures([])
        }
        setShow(false)
    }

    const handleShow = () => setShow(true)

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };
    //  console.log(productPictures)

    const renderProducts = () => {
        return (
            <Table style={{fontSize: 12}} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    product.products.length > 0 ?
                        product.products.map(product =>
                            <tr onClick={() => showProductDetailsModal(product)} key={product._id}>

                                <td>{index++}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category?.name}</td>
                                <td>c3</td>
                                <td>c4</td>
                            </tr>
                        )
                        : null
                }
                </tbody>
            </Table>
        )
    }

    const renderAddProduct = () => {
        return (
            <NewModel
                show={show}
                handleClose={handleClose}
                modelTitle={'ADD new Product'}>
                <Input
                    value={name}
                    placeholder={`Product Name`}
                    controlId={`forProduct`}
                    label={"Product"}
                    type={'text'}
                    error={""}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    value={quantity}
                    placeholder={`Product Quantity`}
                    controlId={`forQuantity`}
                    label={"Quantity"}
                    type={'text'}
                    //  step={'0.01'}
                    error={""}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    value={price}
                    placeholder={`Product Price`}
                    controlId={`forPrice`}
                    label={" Price"}
                    type={'text'}
                    //  step={'0.01'}
                    error={""}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    value={description}
                    placeholder={`Product Description`}
                    controlId={`forDescription`}
                    label={"Description"}
                    type={'text'}
                    error={""}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>select category</option>
                    {createCategoryList(currentCategory.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                    {productPictures.length > 0
                        ? productPictures.map((pic, index) => (
                            <div key={index}>{pic.name}</div>
                        ))
                        : null}
                </select>
                <Input
                    placeholder={`Picture`}
                    controlId={`forImage`}
                    label={"Image"}
                    type={'file'}
                    error={""}
                    onChange={handleProductPictures}
                />
            </NewModel>
        )
    }

    const handleCloseProductDetails = () => {
        setProductDetailModal(false)
    }
    const showProductDetailsModal = (product) => {
      //  console.log(product)
        setProductDetails(product);
        setProductDetailModal(true);
    };
    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
    }


    const renderShowProductDetails = () => {
         if (!productDetails) {
            return null;
        }
        return (
            <NewModel
                show={productDetailModal}
                handleClose={handleCloseProductDetails}
                modelTitle={'Product Details'}
                size="lg"
            >
                <p>Product Details</p>
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{display: "flex"}}>
                            { productDetails.productPictures.map((picture) => (
                                <div key={picture.img} className="productImgContainer">
                                    <img src={picture.img} alt=""/>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </NewModel>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Product</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {
                renderAddProduct()
            }
            {renderShowProductDetails()}
        </Layout>
    );
};

export default Products;