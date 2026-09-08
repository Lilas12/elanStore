/* eslint-disable no-unused-vars */
// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'; // ✅ استيراد الأيقونات
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Page = styled.div`
  min-height: 100vh;
  background: #080808;
  color: #c9a86c;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;
const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 2px;
  margin-bottom: 24px;

  span {
    color: #c9a86c;
  }
`;
const Empty = styled.div`
  text-align: center;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.3);
  h2 {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
  }
`;
const Back = styled(Link)`
  color: #c9a86c;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  transition: 0.3s;
  &:hover {
    color: #f0d39b;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.02);
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid rgba(198, 165, 107, 0.1);

  &:hover {
    border-color: rgba(198, 165, 107, 0.3);
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  padding: 4px;
`;

const Info = styled.div`
  flex: 1;

  h3 {
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    font-family: Georgia, 'Times New Roman', serif;
  }

  span {
    color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
    font-family: Arial, sans-serif;
  }
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #c9a86c;
  min-width: 80px;
`;

const Qty = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  button {
    background: none;
    border: none;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.3);
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      color: #c9a86c;
    }
  }

  span {
    font-weight: 600;
    min-width: 20px;
    text-align: center;
    color: #ffffff;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: #ff4444;
    transform: scale(1.1);
  }
`;

const Summary = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 24px;
  border-radius: 12px;
  margin-top: 24px;
  border: 1px solid rgba(198, 165, 107, 0.1);

  div {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    padding: 8px 0;
    font-family: Arial, sans-serif;

    &:last-child {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      margin-top: 8px;
      padding-top: 16px;
      font-size: 24px;

      span:last-child {
        color: #c9a86c;
      }
    }
  }
`;

const CheckoutBtn = styled(Link)`
  display: block;
  width: 100%;
  padding: 16px;
  background: #c9a86c;
  color: #080808;
  text-align: center;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  margin-top: 16px;
  transition: 0.3s;
  text-decoration: none;
  font-family: Arial, sans-serif;
  box-sizing: border-box;

  &:hover {
    background: #b8973e;
    transform: translateY(-2px);
  }
`;

function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getTotalPrice } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <Page>
        <Navbar />
        <Container>
          <Back to="/home">← Back to shop</Back>
          <Empty>
            <h2>🛒 Your cart is empty</h2>
            <p>Start adding some elegant pieces</p>
          </Empty>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar />
      <Container>
        <Back to="/home">← Back to shop</Back>
        <Title>
          🛒 <span>Your Cart</span>
        </Title>

        {cart.map((item) => (
          <Item key={item.id}>
            <Img src={item.img} alt={item.name} />
            <Info>
              <h3>{item.name}</h3>
              <span>{item.cat}</span>
            </Info>
            <Price>${item.price * item.quantity}</Price>

            <Qty>
              <button onClick={() => decreaseQuantity(item.id)}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>
                <FaPlus />
              </button>
            </Qty>

            <RemoveBtn onClick={() => removeFromCart(item.id)}>
              <FaTrash />
            </RemoveBtn>
          </Item>
        ))}

        <Summary>
          <div>
            <span>Total</span>
            <span>${getTotalPrice()}</span>
          </div>
          <CheckoutBtn to="/checkout">Proceed to Checkout</CheckoutBtn>
        </Summary>
      </Container>
    </Page>
  );
}

export default CartPage;