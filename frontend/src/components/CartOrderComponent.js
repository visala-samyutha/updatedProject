import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody,CardHeader} from 'react-bootstrap';

function CartOrderComponent(){
    const [orders, setOrders] = useState([]);
    const[tprice,setTotal]=useState(0);
    
    useEffect(() => {
      fetchOrders();
    }, []);
        const fetchOrders = async () => {
            try {
                const id=localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3002/cart/${id}`);
                setOrders(response.data.items)
                setTotal(response.data.tprice);

            } catch (err) {
                console.error(err);
                setOrders([])
            }
        };
        return (
            <section className="h-100 gradient-custom">
                <CardHeader className="px-4 py-5">
                                    <h5 className="text-muted mb-0">Thanks for your Order,</h5>
             </CardHeader>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col lg={10} xl={8}>
                        {orders.map((order) => (
                            <Card key={order._id} style={{ borderRadius: '10px', marginBottom: '20px' }}>
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
                                                    <p className="text-muted mb-0 small">Price: ${order.price/order.quantity}</p>
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

    );
};

export default CartOrderComponent;