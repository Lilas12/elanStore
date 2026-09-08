/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';
import { getProducts } from '../api/products';
import Navbar from '../components/Navbar';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: #080808;
  color: #c9a86c;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 36px;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  font-family: Arial, sans-serif;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
`;

const FilterSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 165, 107, 0.2);
  color: #e5c79c;
  padding: 8px 16px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
  &:hover,
  &:focus {
    border-color: rgba(198, 165, 107, 0.5);
  }
  option {
    background: #080808;
    color: #e5c79c;
  }
`;

const ResetButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  padding: 6px 16px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  &:hover {
    border-color: rgba(198, 165, 107, 0.3);
    color: #c9a86c;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  animation: ${fadeIn} 0.6s ease;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(198, 165, 107, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    transform: translateY(-6px);
    border-color: rgba(198, 165, 107, 0.3);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    margin-bottom: 12px;
  }
  .name {
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    font-family: Georgia, 'Times New Roman', serif;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 44px;
  }
  .category-tag {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: Arial, sans-serif;
  }
  .price {
    color: #c9a86c;
    font-size: 18px;
    font-weight: 600;
  }
  .add-btn {
    margin-top: 12px;
    padding: 8px 20px;
    border: 1px solid rgba(198, 165, 107, 0.3);
    background: transparent;
    color: #c9a86c;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 12px;
    font-family: Arial, sans-serif;
    &:hover {
      background: #c9a86c;
      color: #080808;
    }
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(8, 7, 5, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 177, 121, 0.25);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ $isFavorited }) => ($isFavorited ? '#ff6b6b' : 'rgba(255,255,255,0.5)')};
  font-size: 18px;
  z-index: 5;
  padding: 0;
  border: none;
  &:hover {
    transform: scale(1.15);
    border-color: rgba(212, 177, 121, 0.6);
    background: rgba(8, 7, 5, 0.95);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  padding: 60px 0;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.3);
  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #dfbd8b;
    margin-bottom: 12px;
  }
  p {
    font-size: 14px;
  }
`;

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const { addToCart } = useContext(CartContext);

  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) {
    console.error('WishlistContext not found!');
    return <div>Error: WishlistContext missing</div>;
  }
  const { toggleWishlist, isInWishlist } = wishlistContext;

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.cat))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.cat === selectedCategory);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const resetFilter = () => {
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <Page>
        <Navbar />
        <Container>
          <LoadingText>Loading products...</LoadingText>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar />
      <Container>
        <Header>
          <div>
            <Title>✦ Our Collection</Title>
            <Subtitle>Discover timeless pieces for every aesthetic</Subtitle>
          </div>
          <FilterWrapper>
            <FilterLabel>Filter by:</FilterLabel>
            <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/['"]/g, '').toUpperCase()}
                </option>
              ))}
            </FilterSelect>
            {selectedCategory !== 'all' && (
              <ResetButton onClick={resetFilter}>✕ Clear</ResetButton>
            )}
          </FilterWrapper>
        </Header>

        {filteredProducts.length === 0 ? (
          <EmptyState>
            <h3>No products in this category</h3>
            <p>Try selecting a different category.</p>
          </EmptyState>
        ) : (
          <Grid>
            {filteredProducts.map((product) => {
              const isFavorited = isInWishlist(product.id);
              return (
                <ProductCard key={product.id}>
                  <WishlistButton
                    $isFavorited={isFavorited}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isFavorited ? '❤️' : '🤍'}
                  </WishlistButton>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.img} alt={product.name} />
                    <div className="name">{product.name}</div>
                    <div className="category-tag">{product.cat}</div>
                    <div className="price">${product.price}</div>
                  </Link>
                  <button className="add-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </ProductCard>
              );
            })}
          </Grid>
        )}
      </Container>
    </Page>
  );
}

export default ProductsPage;