import axios from 'axios';
import { useState, useEffect ,useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import { Button, Card, Container,Form,Row,Col,Dropdown } from 'react-bootstrap';
import { useAuth } from "../Provider/AuthProvider";
import OptionsComponent from './OptionsComponent';
import '../ProductComponent.css'; 

function HomeComponent() {
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colorFilter, setColorFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');


  useEffect(() => {
    fetchProductData();
  }, []);
  useEffect(() => {
    let filtered = products;

    if (colorFilter) {
        filtered = filtered.filter(product => product.color === colorFilter);
    }

    if (typeFilter) {
        filtered = filtered.filter(product => product.type === typeFilter);
    }
    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    
    

    setFilteredProducts(filtered);
}, [colorFilter, typeFilter, priceFilter, products]);
  const fetchProductData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/home/");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const handleSearch=(e)=>{
      setSearchQuery(e.target.value);
  
    }
    const fProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
  const handleSingleProduct = (id) => {
    navigate(`/homeproduct/${id}`);
};
    return(
       <>
       <OptionsComponent/>
       <form className="col-12 col-lg-auto mb-2 mb-lg-0" role="search">
         <input type="search" className="form-control" value={searchQuery} onChange={handleSearch} placeholder="Search..." aria-label="Search" />
    </form>
    <Container className="my-4">
                <Row>
                    <Col className="text-right">
                        <Dropdown className="filter-dropdown">
                            <Dropdown.Toggle style={{color:'purple',backgroundColor:'white',border:'white'}} id="dropdown-basic">
                                Filters
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Form.Group controlId="colorFilter">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="pink">Pink</option>
                                        <option value="black">Black</option>
                                        <option value="yellow">Yellow</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="typeFilter">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="dress">Dress</option>
                                        <option value="shirt">Shirt</option>
                                        <option value="saree">Saree</option>
                                        <option value="top">Top</option>
                                        <option value="shoe">Shoe</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="priceFilter">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control as="select" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="100-500">100-500</option>
                                        <option value="500-1000">500-1000</option>
                                        <option value="1000-1500">1000-1500</option>
                                        <option value="1500-2000">1500-2000</option>
                                    </Form.Control>
                                </Form.Group>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
                    {fProducts.map((product) =>
                        <Card className="product-card" key={product._id} style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={product.imageUrl} style={{ height: '250px', width: '20rem' }} />
                            <Card.Body>
                                <Card.Text>Product Name: {product.productName}</Card.Text>
                                <Card.Text>Product Price: {product.price}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="link" onClick={() => handleSingleProduct(product._id)}>See More</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Container>
            </Container>
            </>
    )
}
export default HomeComponent