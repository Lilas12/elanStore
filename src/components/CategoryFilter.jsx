/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/rules-of-hooks */
// src/pages/CategoryFilter.jsx
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';
import Navbar from '../components/Navbar';


const allProducts = [
  {
    id: 1,
    name: 'Elegant Silk Dress',
    category: 'Dresses',
    price: 299,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
    description: 'Luxurious silk dress with a flowing silhouette.',
  },
  {
    id: 2,
    name: 'Leather Tote Bag',
    category: 'Bags',
    price: 189,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted leather tote with gold hardware.',
  },
  {
    id: 3,
    name: 'Gold Chain Necklace',
    category: 'Jewelry',
    price: 79,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Elegant 18k gold plated chain necklace.',
  },
  {
    id: 4,
    name: 'High Heel Sandals',
    category: 'Shoes',
    price: 159,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    description: 'Stunning heeled sandals with ankle strap.',
  },
  {
    id: 5,
    name: 'Cashmere Scarf',
    category: 'Accessories',
    price: 99,
    image: 'https://images.unsplash.com/photo-1584370857937-c0daf0e8ecc5?auto=format&fit=crop&w=600&q=80',
    description: 'Soft cashmere scarf in neutral tones.',
  },
  {
    id: 6,
    name: 'Tailored Blazer',
    category: 'Dresses',
    price: 249,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    description: 'Perfectly tailored blazer for a sophisticated look.',
  },
  {
    id: 7,
    name: 'Minimalist Watch',
    category: 'Accessories',
    price: 139,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description: 'Classic minimalist watch with leather strap.',
  },
  {
    id: 8,
    name: 'Embroidered Evening Gown',
    category: 'Dresses',
    price: 459,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80',
    description: 'Stunning evening gown with intricate embroidery.',
  },
];

// =========================================================
// ANIMATIONS
// =========================================================

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// =========================================================
// STYLED COMPONENTS
// =========================================================

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

const SearchQuery = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  margin: 0;

  strong {
    color: #e7c99b;
    font-weight: 500;
  }
`;

const ClearButton = styled(Link)`
  background: transparent;
  border: 1px solid rgba(198, 165, 107, 0.3);
  color: #c9a86c;
  padding: 6px 18px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(198, 165, 107, 0.1);
    border-color: #c9a86c;
  }
`;

const ResultsCount = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  margin-top: -20px;
  margin-bottom: 30px;
`;

// =========================================================
// PRODUCT GRID
// =========================================================

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
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-color: #0a0907;
  cursor: pointer;
  transition: transform 0.6s ease;

  ${ProductCard}:hover & {
    transform: scale(1.03);
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

// ✅ زر المفضلة (القلب) مع تحسينات
const WishlistButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(8, 7, 5, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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

  &:hover {
    transform: scale(1.15);
    border-color: rgba(212, 177, 121, 0.6);
    background: rgba(8, 7, 5, 0.95);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const NoResults = styled.div`
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



function CategoryFilter() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ استخدام سياق المفضلة
  const wishlistContext = useContext(WishlistContext);

  // التحقق من وجود السياق
  if (!wishlistContext) {
    console.error('WishlistContext not found! Make sure WishlistProvider is wrapping the app.');
    return <div>Error: WishlistContext missing</div>;
  }

  const { toggleWishlist, isInWishlist } = wishlistContext;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(results);
  }, [searchQuery]);

  return (
    <Page>
      <Navbar />
      <Content>
        <Header>
          <div>
            <Title>
              <span>Search</span> Results
            </Title>
            {searchQuery && (
              <SearchQuery>
                Showing results for: <strong>“{searchQuery}”</strong>
              </SearchQuery>
            )}
          </div>
          {searchQuery && (
            <ClearButton to="/products">Clear Search</ClearButton>
          )}
        </Header>

        {searchQuery && (
          <ResultsCount>
            {filteredProducts.length === 0
              ? 'No products found'
              : `${filteredProducts.length} product${
                  filteredProducts.length > 1 ? 's' : ''
                } found`}
          </ResultsCount>
        )}

        <ProductGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isFavorited = isInWishlist(product.id);
              return (
                <ProductCard key={product.id}>
                  <WishlistButton
                    $isFavorited={isFavorited}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                      // ✅ تحديث فوري (سيحدث تلقائياً)
                    }}
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isFavorited ? '❤️' : '🤍'}
                  </WishlistButton>

                  <ProductLink to={`/product/${product.id}`}>
                    <ProductImage image={product.image} />
                  </ProductLink>
                  <ProductInfo>
                    <ProductLink to={`/product/${product.id}`}>
                      <ProductName>{product.name}</ProductName>
                      <ProductCategory>{product.category}</ProductCategory>
                      <ProductPrice>${product.price}</ProductPrice>
                    </ProductLink>
                  </ProductInfo>
                </ProductCard>
              );
            })
          ) : searchQuery ? (
            <NoResults>
              <h2>No Results Found</h2>
              <p>
                We couldn't find any products matching “{searchQuery}”.
                <br />
                Try adjusting your search or{' '}
                <Link to="/products">browse all products</Link>.
              </p>
            </NoResults>
          ) : (
            <NoResults>
              <h2>Enter a Search Term</h2>
              <p>
                Use the search bar above to find your favorite pieces.
              </p>
            </NoResults>
          )}
        </ProductGrid>
      </Content>
    </Page>
  );
}

export default CategoryFilter;
