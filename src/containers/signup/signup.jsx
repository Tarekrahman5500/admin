import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import Layout from "../../compoents/layout/index";
import Input from "../../compoents/ui/input/input";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../../actions/userAction.js";
import {useNavigate} from "react-router-dom";
import {showErrMsg} from "../../compoents/notification/Notifications.jsx";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useSelector(state => state.auth)
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {

        if (!user.loading) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }

    }, [user.loading]);

    const userSignup = (e) => {
        e.preventDefault();

        const user = {
            firstName,
            lastName,
            email,
            password,
        };

        dispatch(signup(user, auth.token));
    };


    return (
        <Layout>
            <Container>
                {
                    user.error && showErrMsg( user.error)

                }
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="First Name"
                                        controlId="forFirstName"
                                        error=""
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last Name"
                                        controlId="forLastName"
                                        error=""
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Enter Email"
                                type="email"
                                placeholder="Enter Email"
                                controlId="forEmail"
                                error=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="password"
                                type="password"
                                placeholder="Enter Password"
                                controlId="forPassword"
                                error=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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