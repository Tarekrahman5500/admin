import React from 'react';
import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import Layout from "../../compoents/layout/index";
import Input from "../../compoents/ui/input/input";

const Signup = () => {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="First Name"
                                        controlId="forFirstName"
                                        error=""
                                        value=""
                                        onChange={() => {
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                       label="Last Name"
                                        type="text"
                                        placeholder="Last Name"
                                        controlId="forLastName"
                                        error=""
                                        value=""
                                        onChange={() => {
                                        }}
                                    />
                                </Col>
                            </Row>
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

export default Signup;