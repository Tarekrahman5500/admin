import React from 'react';
import Layout from "../../compoents/layout/index.jsx";
import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import Input from "../../compoents/ui/input/input.jsx";

const Signin = () => {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                           <Input
                                       label="Enter Email"
                                        type="email"
                                        placeholder="Enter Email"
                                        controlId="forEmail"
                                        error=""
                                        value=""
                                        onChange={() => {
                                        }}
                                    />
                                 <Input
                                       label="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        controlId="forPassword"
                                        error=""
                                        value=""
                                        onChange={() => {
                                        }}
                                    />


                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    );
};

export default Signin;