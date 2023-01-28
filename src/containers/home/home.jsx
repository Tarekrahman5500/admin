import React from 'react';
import Layout from "../../compoents/layout/index.jsx";
import {Col, Container, Row} from "react-bootstrap";
import './style.css'
import {NavLink} from "react-router-dom";
const Home = () => {
    return (
       <Layout sidebar>
          Home
         {/* <Container fluid>
               <Row>
               <Col md={2} className="sidebar">
                   <ul>
                       <li><NavLink to={`/`}>Home</NavLink></li>
                        <li><NavLink to={`/products`}>products</NavLink></li>
                        <li><NavLink to={`/orders`}>orders</NavLink></li>
                   </ul>
               </Col>
               <Col md={10} style={{marginLeft: 'auto'}}>Container</Col>
           </Row>
          </Container>*/}
           {/*<div className="p-5 mb-4  rounded-3 text-center" style={{margin: '5rem', background: '#fff'}}>
               <div className="container-fluid py-5">
                   <h1 className="display-5 fw-bold">Welcome to Admin Dashboard</h1>
                   <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                       attention to featured content or information.</p>
                   <button className="btn btn-primary btn-lg" type="button">Example button</button>
               </div>
           </div>*/}
       </Layout>
    );
};


export default Home;