// HomeOrderComponent.js
import React, { useContext,useState,useEffect } from 'react';
import axios from 'axios';
import {useAuth} from './AuthProvider';
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter } from 'react-bootstrap';



const HomeOrderComponent = () => { 
    const {productId}=useAuth();
    const [product,setProduct]=useState({})
    const [tprice,setTotal]=useState(0);
    useEffect(() => {
        fetchOrders();
      }, []);
          const fetchOrders = async () => {
              try {
                console.log(productId)
                  const response = await axios.get(`http://localhost:3002/home/order/${productId}`);
                  console.log(typeof(response.data));
                  setProduct(response.data)
                  setTotal(response.data.price);
                  console.log(product)
              } catch (err) {
                  console.log(err)
              }
          };
  return (
    <div>
      {/* <h1>Home order: {productId}</h1> */}
      <section className="h-100 gradient-custom">
            <CardHeader className="px-4 py-5">
                                    <h5 className="text-muted mb-0">Thanks for your Order,</h5>
             </CardHeader>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col lg={10} xl={8}>
                            <Card key={product._id} style={{ borderRadius: '10px', marginBottom: '20px' }}>
                                <CardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>Receipt</p>
                                    </div>
                                    <Card className="shadow-0 border mb-4">
                                        <CardBody>
                                            <Row>
                                                <Col md={2}>
                                                    <img src={product.imageUrl} className="img-fluid" alt="Product" />
                                                </Col>
                                                <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0">Product: {product.productName}</p>
                                                </Col>
                                                <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">Qty: 1</p>
                                                </Col>
                                                <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">Price: ${product.price}</p>
                                                </Col>
                                            </Row>
                                            <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                            <div className="row d-flex align-items-center">
                                                <div className="d-flex justify-content-between pt-2">
                                                    <p className="fw-bold mb-0">Order Details</p>
                                                    <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span>${product.price}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-5">
                                                    <p className="text-muted mb-0">Receipt Voucher:{product._id}</p>
                                                    <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                    </Col>
                </Row>
            </Container>
             <Row className="d-flex justify-content-center align-items-center h-100">
            <Col lg={10} xl={8}>
            <Card className="border-0 px-4 py-5" style={{ backgroundColor: 'purple', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                        Total Paid: <span className="h2 mb-0 ms-2">${tprice}</span>
                                    </h5>
            </Card>
            </Col>
            </Row>
        </section> 

    </div>
  );
};

export default HomeOrderComponent;
