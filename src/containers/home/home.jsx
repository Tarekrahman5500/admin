import React from 'react';
import Layout from "../../compoents/layout/index.jsx";

const Home = () => {
    return (
       <Layout>
           <div className="p-5 mb-4  rounded-3 text-center" style={{margin: '5rem', background: '#fff'}}>
               <div className="container-fluid py-5">
                   <h1 className="display-5 fw-bold">Welcome to Admin Dashboard</h1>
                   <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                       attention to featured content or information.</p>
                   <button className="btn btn-primary btn-lg" type="button">Example button</button>
               </div>
           </div>
       </Layout>
    );
};


export default Home;