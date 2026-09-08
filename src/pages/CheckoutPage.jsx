// src/pages/CheckoutPage.jsx
import { useContext, useEffect } from 'react';import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Page = styled.div`
  min-height: 100vh;
  background: #080808;
  color: #c9a86c;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 40px 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(198, 165, 107, 0.2);
  border-radius: 16px;
`;

const IconWrapper = styled.div`
  font-size: 50px;
  color: #c9a86c;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 32px;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 14px 32px;
  background: #c9a86c;
  color: #080808;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
  transition: 0.3s;
  font-family: Arial, sans-serif;

  &:hover {
    background: #f0d39b;
    transform: translateY(-2px);
  }
`;

function CheckoutPage() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    // Tömmer varukorgen direkt när användaren landar på bekräftelsesidan
    clearCart();
  }, []);

  return (
    <Page>
      <Navbar />
      <Container>
        <IconWrapper>
          <FaCheckCircle />
        </IconWrapper>
        <Title>Thank You for Your Order</Title>
        <Subtitle>
          Your order has been successfully placed. We are preparing your high-end selection with care and will notify you once it ships.
        </Subtitle>
        <HomeButton to="/home">Continue Shopping</HomeButton>
      </Container>
    </Page>
  );
}

export default CheckoutPage;
