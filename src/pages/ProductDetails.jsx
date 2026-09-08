/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect,useContext} from "react";
import { useParams,useLocation,useNavigate } from "react-router-dom";
import styled  from "styled-components";
import { getProduct } from '../api/products';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Page = styled.div`
  min-height: 100vh;
  background: #080705;
  color: #e5c79c;
  font-family: 'Montserrat', sans-serif;
`;
const Container =styled.div`
max-width:1200px;
margin:0 auto;
padding:40px 20px 80px;
`;
const BackBtu =styled.button`
background:transparent;
border:1px solid rgba(198,165,107,0.2);
color:#c9a86c;
padding:8px 20px;
font-family:'Montserrat', sans-serif;
font-size: 10px;
letter-spacing: 2px;
cursor: pointer;
transition: all 0.3s ease;
margin-bottom: 30px;
&:hover{
    border-color: rgba(198, 165, 107, 0.5);
    background: rgba(198, 165, 107, 0.05);  
}
`;
const ProdWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const ImageWrap = styled.div`
  img {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: contain;
    border: 1px solid rgba(212, 177, 121, 0.1);
    background: rgba(255, 255, 255, 0.02);
  }
`;
const DetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductName = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 400;
  color: #dfbd8b;
  margin: 0;
`;
const ProdCat = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
`;

const ProdPrice = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 300;
  color: #c9a86c;
  margin: 8px 0;
`;
const ProdDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin: 8px 0 16px;
`;
const AddToCartBut = styled.button`
  padding: 14px 32px;
  background: transparent;
  border: 1px solid #c9a86c;
  color: #c9a86c;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  align-self: flex-start;
  &:hover {
    background: #c9a86c;
    color: #080705;
    box-shadow: 0 0 30px rgba(198, 165, 107, 0.15);
  }
`;
const LoadingText = styled.p`
  text-align: center;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.3);
`;
function ProductDetails({onProductUpdate}){
  const{id}=useParams();
  const location = useLocation();
  const navigate= useNavigate();
  const{addToCart}=useContext(CartContext);
  const productFromState = location.state?.product;
  const [product, setProduct] = useState(productFromState || null);
  const [loading,setLoading]=useState(!productFromState);
  useEffect(()=>{
    if(!productFromState && id){
      getProduct(id)
      .then(setProduct)
      .catch(()=>setLoading(false))
      .finally(()=>setLoading(false))
    }else{
      setLoading(false);
    }
  },[id,productFromState]);
const handleAddToCart=() =>{
  if(!product)return;
  addToCart(product);
  const modifiedData={
    ...product,
    fromChild:true,
    addedToCart:true,
    modifiedAt:new Date().toISOString(),
    message: 'Product added to cart from ProductDetails'
  };
  if(onProductUpdate){
    onProductUpdate(modifiedData);
  }console.log('Data sent to parent:', modifiedData);
};
const handleGoBack=()=>{
  navigate(-1);
};
if(loading){
  return(
    <Page>
      <Navbar/>
      <Container>
      <LoadingText>Loading...</LoadingText>  
      </Container>
    </Page>
  );
}
if(!product){
  return(
    <Page>
      <Navbar/>
      <Container>
      <LoadingText>Product not found</LoadingText>  
      </Container>
    </Page>
  );
}
return(
  <Page>
    <Navbar/>
    <Container>
    <BackBtu onClick={handleGoBack}>← Back</BackBtu>
    <ProdWrap>
    <ImageWrap>
    <img src={product.img} alt={product.name} />
    </ImageWrap>
    <DetailWrap>
    <ProdCat>{product.cat}</ProdCat>
    <ProductName>{product.name}</ProductName>
    <ProdPrice>${product.price}</ProdPrice>
    <ProdDesc>{product.desc}</ProdDesc>
    <AddToCartBut onClick={handleAddToCart}>
              Add to Cart
    </AddToCartBut>
    </DetailWrap>
    </ProdWrap>
    </Container>
  </Page>
);
}
export default ProductDetails;