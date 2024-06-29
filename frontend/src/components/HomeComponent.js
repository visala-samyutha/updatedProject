import axios from 'axios';
import { useState, useEffect ,useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { useAuth } from "./AuthProvider";
import HeaderComponent from './HeaderComponent';
import OptionsComponent from './OptionsComponent';
import '../ProductComponent.css'; 

function HomeComponent() {
  const navigate=useNavigate();
  const{setProductId}=useAuth();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/home/");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  //   const handleAddToCart = async (pid) => {
  //     try {
  //         const response = await axios.post(`http://localhost:3002/home/${id}/${pid}`);
  //         alert(response.data.message);
  //         fetchProductData();
  //     } catch (error) {
  //         console.error("There was an error adding the product to the cart:", error);
  //         alert("An error occurred while adding the product to the cart. Please try again.");
  //     }
  // };
  // const handlePlaceOrder = async (pid) => {
  //   try {
  //     const response = await axios.post(`http://localhost:3002/order/direct/${id}/${pid}`);
  //     alert(response.data.message);
  //     setProductId(pid);
  //     fetchProductData();
  //     navigate('/homeorder');
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  const handleSingleProduct = (id) => {
    navigate(`/homeproduct/${id}`);
};
    return(
       <>
       <OptionsComponent/>
        <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
                {products.map((product) =>
                    <Card className="product-card" key={product._id} style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={product.imageUrl} style={{height:'250px',width:'20rem'}}/>
                        <Card.Body>
                            <Card.Text>Product Name:{product.productName}</Card.Text>        
                            {/* <Card.Text>Price:{product.price}</Card.Text> */}
                            <Card.Text>Product Price:{product.price}</Card.Text>
                            <div className="d-flex justify-content-between">
                            <Button variant="link" onClick={() => handleSingleProduct(product._id)}>See More</Button>
    </div>
                        </Card.Body>
                    </Card>
                )}</Container>
            </>
    )
}
export default HomeComponent