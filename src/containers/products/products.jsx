import React, {useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import Input from "../../compoents/ui/input/input.jsx";
import {addCategory} from "../../actions/categoryAction.js";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../actions/productAction.js";

const Products = () => {
    const category = useSelector(state => state.category)
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

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name});
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };
    const handleClose = async() => {
        const form = new FormData()
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPictures) {
            form.append("picture", pic);
        }
        dispatch(addProduct(form))
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };
    console.log(productPictures)
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
            </Container>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        {createCategoryList(category.categories).map((option) => (
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};

export default Products;