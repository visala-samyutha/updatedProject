import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody} from 'react-bootstrap';

function OrderComponent(){
    const [orders, setOrders] = useState([]);
    const [isOrderEmpty, setIsOrderEmpty] = useState(false);
    useEffect(() => {
      fetchOrders();
    }, []);
        const fetchOrders = async () => {
            try {
                const id=localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3002/order/${id}`);
                const orderData=response.data.items||[];
                setOrders(response.data.items);
                console.log(response.data.items);
                if(orderData.length===0) setIsOrderEmpty(true);
            } catch (err) {
                console.error(err);
                setOrders([])
                setIsOrderEmpty(true);
            }
        };

    // const getCurrentDate = () => {
    //     const today = new Date();
    //     const month = today.getMonth() + 1;
    //     const date = today.getDate();
    //     const year = today.getFullYear();
    //     return `${month}/${date}/${year}`;
    // };
    
    // const currentDate = getCurrentDate();

    return (
        <section className="h-100 gradient-custom">
            {isOrderEmpty? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>No orders yet</h2>
        </div>
      ) : (
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col lg={10} xl={8}>
                        {orders.map((order) => (
                            <Card key={order.id} style={{ borderRadius: '10px', marginBottom: '20px' }}>
                                <CardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>Receipt</p>
                                    </div>
                                    <Card className="shadow-0 border mb-4">
                                        <CardBody>
                                            <Row>
                                                <Col md={2}>
                                                    <img src={order.imageUrl} className="img-fluid" alt="Product" />
                                                </Col>
                                                <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0">Product: {order.productName}</p>
                                                </Col>
                                                <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">Qty: {order.quantity}</p>
                                                </Col>
                                                <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">Product Price: ${order.price/order.quantity}</p>
                                                </Col>
                                            </Row>
                                            <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                            <div className="row d-flex align-items-center">
                                                <div className="d-flex justify-content-between pt-2">
                                                    <p className="fw-bold mb-0">Order Details</p>
                                                    <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span>${order.price}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-5">
                                                    <p className="text-muted mb-0">Receipt Voucher:{order.id}</p>
                                                    <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
      )}
        </section>

    );
};

export default OrderComponent;
