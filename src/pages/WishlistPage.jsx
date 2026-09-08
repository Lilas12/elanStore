/* eslint-disable no-unused-vars */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import WishlistContext from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Page = styled.div`
  min-height: 100vh;
  background: #080705;
  color: #e5c79c;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 5% 80px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 2px;
  color: #dfbd8b;
  margin: 0;
  span {
    color: #c9a86c;
    font-weight: 600;
  }
  @media (min-width: 768px) {
    font-size: 42px;
  }
`;

const Count = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  margin-top: -20px;
  margin-bottom: 30px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 28px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(212, 177, 121, 0.1);
  overflow: hidden;
  animation: ${fadeUp} 0.6s ease forwards;
  transition: all 0.4s ease;
  position: relative;
  &:hover {
    transform: translateY(-6px);
    border-color: rgba(212, 177, 121, 0.3);
    box-shadow: 0 8px 30px rgba(198, 165, 107, 0.06);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  padding-top: 120%;
  position: relative;
  background-image: ${({ $src }) => `url(${$src})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #0a0907;
  cursor: pointer;
  transition: transform 0.6s ease;
  ${ProductCard}:hover & {
    transform: scale(1.03);
  }
  &::after {
    content: '🖼️ No Image';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.15);
    font-size: 12px;
    letter-spacing: 2px;
    background: #0a0907;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &.no-image::after {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  padding: 18px 18px 22px;
`;

const ProductName = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  color: #e5c79c;
  margin: 0 0 4px;
  letter-spacing: 0.5px;
`;

const ProductCategory = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
`;

const ProductPrice = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #c9a86c;
  margin-top: 10px;
  letter-spacing: 1px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(212, 177, 121, 0.08);
`;

const AddToCartButton = styled.button`
  flex: 1;
  background: transparent;
  border: 1px solid rgba(198, 165, 107, 0.3);
  color: #c9a86c;
  padding: 8px 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(198, 165, 107, 0.1);
    border-color: #c9a86c;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 100, 100, 0.2);
  color: rgba(255, 100, 100, 0.5);
  padding: 8px 16px;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: rgba(255, 100, 100, 0.5);
    color: #ff6b6b;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  animation: ${fadeIn} 0.8s ease;
  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    color: #dfbd8b;
    margin-bottom: 16px;
  }
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    max-width: 400px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }
  a {
    color: #c9a86c;
    text-decoration: none;
    border-bottom: 1px solid rgba(198, 165, 107, 0.3);
    padding-bottom: 2px;
    transition: border-color 0.3s ease;
    &:hover {
      border-color: #c9a86c;
    }
  }
`;

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const getImageUrl = (product) => {
    const possibleKeys = ['img', 'image', 'thumbnail', 'images', 'imageUrl', 'picture'];
    for (const key of possibleKeys) {
      const value = product[key];
      if (value) {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        if (typeof value === 'string' && value.startsWith('http')) {
          return value;
        }
        if (typeof value === 'string') {
          return value;
        }
      }
    }
    return 'https://via.placeholder.com/300x300?text=No+Image';
  };

  return (
    <Page>
      <Navbar />
      <Content>
        <Header>
          <div>
            <Title>
              <span>My</span> Wishlist
            </Title>
          </div>
        </Header>

        <Count>
          {wishlistItems.length === 0
            ? 'No items in your wishlist'
            : `${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} saved`}
        </Count>

        <ProductGrid>
          {wishlistItems.length > 0 ? (
            wishlistItems.map((product) => {
              const imageUrl = getImageUrl(product);
              const hasImage = imageUrl && !imageUrl.includes('placeholder');
              return (
                <ProductCard key={product.id}>
                  <ProductLink to={`/product/${product.id}`}>
                    <ProductImage $src={imageUrl} className={!hasImage ? 'no-image' : ''} />
                  </ProductLink>
                  <ProductInfo>
                    <ProductLink to={`/product/${product.id}`}>
                      <ProductName>{product.name || product.title}</ProductName>
                      <ProductCategory>{product.cat || product.category || 'Fashion'}</ProductCategory>
                      <ProductPrice>${product.price}</ProductPrice>
                    </ProductLink>
                    <CardActions>
                      <AddToCartButton onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </AddToCartButton>
                      <RemoveButton onClick={() => removeFromWishlist(product.id)}>
                        Remove
                      </RemoveButton>
                    </CardActions>
                  </ProductInfo>
                </ProductCard>
              );
            })
          ) : (
            <EmptyState>
              <h2>Your wishlist is empty</h2>
              <p>
                Start adding your favorite pieces to your wishlist.
                <br />
                <Link to="/products">Browse our collection</Link>
              </p>
            </EmptyState>
          )}
        </ProductGrid>
      </Content>
    </Page>
  );
}

export default WishlistPage;