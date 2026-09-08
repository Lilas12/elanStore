// src/components/Navbar.jsx
/* eslint-disable no-unused-vars */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';



const navReveal = keyframes`
  from { opacity: 0; transform: translateY(-18px); }
  to { opacity: 1; transform: translateY(0); }
`;



const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: transparent;
  border-bottom: 1px solid rgba(212, 177, 121, 0.2);
  height: auto;
  min-height: 70px;
  flex-wrap: wrap;
  animation: ${navReveal} 0.8s ease forwards;

  @media (min-width: 768px) {
    padding: 0 40px;
    height: 90px;
    flex-wrap: nowrap;
  }

  @media (min-width: 1024px) {
    padding: 0 68px;
    height: 110px;
  }
`;


const NavLeft = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 767px) {
    order: 2;
    gap: 12px;
  }

  @media (min-width: 768px) {
    gap: 32px;
  }

  @media (min-width: 1024px) {
    gap: 48px;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  transition: 0.3s ease;
  position: relative;
  white-space: nowrap;
  text-transform: uppercase;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 1px;
    background: #c9a86c;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #e7c99b;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: #e7c99b;
  }

  &.active::after {
    width: 100%;
  }

  @media (min-width: 768px) {
    font-size: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 13px;
  }
`;


const Logo = styled(Link)`
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: 6px;
  color: #dfbd8b;
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: 767px) {
    order: 1;
    flex: 1;
    text-align: center;
    font-size: 24px;
    letter-spacing: 4px;
  }

  @media (min-width: 768px) {
    font-size: 34px;
    letter-spacing: 8px;
  }

  @media (min-width: 1024px) {
    font-size: 42px;
    letter-spacing: 8px;
  }
`;


const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 767px) {
    order: 4;
    gap: 8px;
  }

  @media (min-width: 768px) {
    gap: 20px;
  }

  @media (min-width: 1024px) {
    gap: 24px;
  }
`;

const NavDivider = styled.div`
  width: 1px;
  height: 28px;
  background: rgba(214, 177, 120, 0.35);

  @media (max-width: 480px) {
    display: none;
  }
`;

const IconButton = styled.button`
  border: none;
  background: transparent;
  color: #d7b985;
  width: 28px;
  height: 28px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #fff0d0;
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.3;
  }

  @media (min-width: 768px) {
    width: 25px;
    height: 25px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const CartWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CartCount = styled.span`
  position: absolute;
  right: -8px;
  top: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d6b47b;
  color: #0b0906;
  font-family: Arial, sans-serif;
  font-size: 9px;
  font-weight: 700;

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 10px;
    right: -9px;
    top: -9px;
  }
`;

const WishlistBadge = styled.span`
  position: absolute;
  right: -8px;
  top: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8c99e;
  color: #0b0906;
  font-family: Arial, sans-serif;
  font-size: 9px;
  font-weight: 700;

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 10px;
    right: -9px;
    top: -9px;
  }
`;


function Navbar({ onLogout }) {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  const wishlistContext = useContext(WishlistContext);
  const wishlistCount = wishlistContext ? wishlistContext.getTotalWishlistItems() : 0;

  return (
    <NavbarContainer>
      <NavLeft>
        <NavLink to="/home" className="active">HOME</NavLink>
        <NavLink to="/products">COLLECTIONS</NavLink>
      </NavLeft>

      <Logo to="/home">ÉLAN</Logo>

      <NavRight>
        <NavDivider />


        <IconButton as={Link} to="/profile" aria-label="Account">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 22 c0-4.5 3.5-7 8-7 s8 2.5 8 7" />
          </svg>
        </IconButton>


        <IconButton as={Link} to="/wishlist" aria-label="Wishlist" style={{ position: 'relative' }}>
          <svg viewBox="0 0 24 24">
            <path d="M20.8 8.7 C20.8 13.5 12 20 12 20 S3.2 13.5 3.2 8.7 C3.2 5.8 5.3 4 7.8 4 C9.5 4 11 4.9 12 6.2 C13 4.9 14.5 4 16.2 4 C18.7 4 20.8 5.8 20.8 8.7Z" />
          </svg>
          {wishlistCount > 0 && <WishlistBadge>{wishlistCount}</WishlistBadge>}
        </IconButton>

        <CartWrapper>
          <IconButton as={Link} to="/cart" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24">
              <path d="M4 8 h16 l-1 13 H5 L4 8Z" />
              <path d="M8 8 V6 C8 3.8 9.7 2 12 2 C14.3 2 16 3.8 16 6 v2" />
            </svg>
          </IconButton>
          {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
        </CartWrapper>
      </NavRight>
    </NavbarContainer>
  );
}

export default Navbar;
