
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card, Container, Button, Modal, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../ProductComponent.css'; // Import the custom CSS file

const ProductComponent = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        imageUrl: "",
        productName: "",
        price: "",
        color: "",
        type: "",
        description: "",
        quantity: "",
        gender: "" // Added gender field
    });
    const [colorFilter, setColorFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [show, setShow] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/admin/');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (colorFilter) {
            filtered = filtered.filter(product => product.color === colorFilter);
        }

        if (typeFilter) {
            filtered = filtered.filter(product => product.type === typeFilter);
        }

        setFilteredProducts(filtered);
    }, [colorFilter, typeFilter, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editProduct) {
            try {
                const response = await axios.patch(`http://localhost:3002/admin/productEdit/${editProduct._id}`, formData);
                const updatedProducts = products.map((product) =>
                    product._id === response.data._id ? response.data : product
                );
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:3002/admin/addProduct', formData);
                setProducts([...products, response.data]);
                setFilteredProducts([...products, response.data]);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        setFormData({
            imageUrl: "",
            productName: "",
            price: "",
            color: "",
            type: "",
            description: "",
            quantity: "",
            gender: "" // Reset gender field
        });
        setEditProduct(null);
        setShow(false);
    };

    const handleSingleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const handleEdit = (product) => {
        setFormData({
            imageUrl: product.imageUrl,
            productName: product.productName,
            price: product.price,
            color: product.color,
            type: product.type,
            description: product.description,
            quantity: product.quantity,
            gender: product.gender // Populate gender field
        });
        setEditProduct(product);
        setShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/admin/delete/${id}`);
            const updatedProducts = products.filter((product) => product._id !== id);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
        <Container className="product-container">
            <h2 className="mt-5 text-center">Add New Product</h2>
            <div className="text-center mb-4">
                <Button variant="none" className='button btn1' onClick={() => {
                    setFormData({
                        imageUrl: "",
                        productName: "",
                        price: "",
                        color: "",
                        type: "",
                        description: "",
                        quantity: "",
                        gender: "" // Reset gender field
                    });
                    setEditProduct(null);
                    setShow(true);
                }}>Add Product</Button>
            </div>

            <h2 className="mt-5 text-center">Product List</h2>
            <Row>
                {filteredProducts.map((product) => (
                    <Col md={4} key={product._id} className="mb-4">
                        <Card className="product-card">
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="link" onClick={() => handleSingleProduct(product._id)}>See More</Button>
                                    <Button variant="secondary" onClick={() => handleEdit(product)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editProduct ? "Edit Product" : "Add New Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="ImageUl">
                            <FloatingLabel controlId='floatingInput' label="ImageUrl : " className='mb-3'>   
                                <Form.Control type="text" placeholder="image" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formProductName">
                            <FloatingLabel controlId='floatingInput' label="Product Name : " className='mb-3'>   
                                <Form.Control type="text" name="productName" placeholder='productName' value={formData.productName} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <FloatingLabel controlId='floatingInput' label="Price : " className='mb-3'>   
                                <Form.Control type="number" name="price" placeholder='price' value={formData.price} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formColor">
                            <FloatingLabel label='Color'>
                                <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <FloatingLabel label='Type '>
                                <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <FloatingLabel controlId='floatingInput' label="Description : " className='mb-3'>   
                                <Form.Control type="text" name="description" placeholder='description' value={formData.description} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <FloatingLabel controlId='floatingInput' label="Quantity : " className='mb-3'>   
                                <Form.Control type="number" name="quantity" placeholder='quantity' value={formData.quantity} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="formGender">
                            <FloatingLabel label='Category'>
                                <Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} required />
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">{editProduct ? "Save Changes" : "Add Product"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
        </>
    );
};

export default ProductComponent;
