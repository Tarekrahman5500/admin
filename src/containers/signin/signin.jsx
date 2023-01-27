import React, {useState} from 'react';
import Layout from "../../compoents/layout/index.jsx";
import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import Input from "../../compoents/ui/input/input.jsx";

import {login} from '../../actions/action'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate();

    const userLogin = (e) => {
        e.preventDefault();

        const user = {email, password}
        dispatch(login(user))
        // if login the jump to home
        if (auth.authenticate) {
            // console.log('kk')
            navigate(`/home`);
        }
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
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

export default Signin;