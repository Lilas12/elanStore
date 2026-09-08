/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';
import Navbar from '../components/Navbar';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: #080705;
  color: #e5c79c;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 5% 80px;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(212, 177, 121, 0.15);
  border-radius: 16px;
  padding: 48px 40px;
  animation: ${fadeUp} 0.6s ease;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(198, 165, 107, 0.15);
  border: 2px solid rgba(198, 165, 107, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 42px;
  color: #c9a86c;
`;

const Name = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;
  font-weight: 400;
  color: #dfbd8b;
  text-align: center;
  margin: 0 0 4px;
`;

const Email = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-bottom: 32px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 177, 121, 0.08);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  .number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #c9a86c;
  }
  .label {
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    margin-top: 4px;
  }
`;

const ActionButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 14px;
  border: 1px solid rgba(198, 165, 107, 0.2);
  background: transparent;
  color: #c9a86c;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: rgba(198, 165, 107, 0.05);
    border-color: rgba(198, 165, 107, 0.4);
  }

  & + & {
    margin-top: 12px;
  }

  &.logout {
    margin-top: 24px;
    background: rgba(220, 53, 69, 0.12);
    border: 1px solid rgba(220, 53, 69, 0.4);
    color: #ff6b6b;

    &:hover {
      background: #dc3545;
      border-color: #dc3545;
      color: #ffffff;
      box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
    }
  }
`;



function ProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const { getTotalItems } = useContext(CartContext);
  const { getTotalWishlistItems } = useContext(WishlistContext);

  const cartCount = getTotalItems ? getTotalItems() : 0;
  const wishlistCount = getTotalWishlistItems ? getTotalWishlistItems() : 0;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <Page>
      <Navbar onLogout={onLogout} />
      <Content>
        <ProfileCard>
          <Avatar>👤</Avatar>
          <Name>ÉLAN Customer</Name>
          <Email>customer@elan.com</Email>
          <StatsGrid>
            <StatCard>
              <div className="number">{cartCount}</div>
              <div className="label">Cart Items</div>
            </StatCard>
            <StatCard>
              <div className="number">{wishlistCount}</div>
              <div className="label">Wishlist</div>
            </StatCard>
            <StatCard>
              <div className="number">0</div>
              <div className="label">Orders</div>
            </StatCard>
          </StatsGrid>
          <ActionButton to="/wishlist">View Wishlist</ActionButton>
          <ActionButton to="/cart">View Cart</ActionButton>
          <ActionButton to="/products">Continue Shopping</ActionButton>
          <ActionButton as="button" className="logout" onClick={handleLogout}>
            Logout
          </ActionButton>
        </ProfileCard>
      </Content>
    </Page>
  );
}

export default ProfilePage;
