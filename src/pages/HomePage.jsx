/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';
import dressImage from '../photos/dress.png';
import shoesImage from '../photos/shoes.png';
import backImage from '../photos/back.png';
import jewImage from '../photos/jewelry.png';
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;
const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M5 12h13" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const Page = styled.div`
  min-height: 100vh;
  background: #080705;
  color: #e5c79c;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
`;
const Hero = styled.section`
  min-height: 760px;
  height: 100vh;
  max-height: 900px;
  position: relative;
  display: flex;
  align-items: center;
  background-image: linear-gradient(
      90deg,
      rgba(7, 6, 4, 0.96) 0%,
      rgba(7, 6, 4, 0.78) 32%,
      rgba(7, 6, 4, 0.2) 68%,
      rgba(7, 6, 4, 0.42) 100%
    ),
    ${({ $image }) => `url(${$image})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 0.8s ease;

  @media (max-width: 800px) {
    min-height: 760px;
    background-position: 63% center;
  }
`;
const HeroContent = styled.div`
  width: 53%;
  padding-left: 8%;
  padding-top: 65px;
  animation: ${fadeUp} 1s ease;

  @media (max-width: 800px) {
    width: 100%;
    padding: 160px 30px 60px;
    background: linear-gradient(90deg, rgba(5, 4, 3, 0.92), rgba(5, 4, 3, 0.45), transparent);
  }
@media (max-width: 500px) {
    padding-left: 25px;
    padding-right: 25px;
  }
`;
const SmallTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;

  span {
    font-size: 11px;
    letter-spacing: 4px;
    color: #cda971;
  }
    div {
    width: 43px;
    height: 1px;
    background: #a98759;
  }

  @media (max-width: 500px) {
    span {
      font-size: 8px;
      letter-spacing: 3px;
    }
  }
`;
const HeroTitle = styled.h2`
  margin: 0 0 28px;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(48px, 5vw, 77px);
  line-height: 0.92;
  font-weight: 500;
  letter-spacing: 1px;
  color: #ead7b8;

  span {
    color: #d9c09a;
  }

  @media (max-width: 800px) {
    font-size: 48px;
  }

  @media (max-width: 500px) {
    font-size: 42px;
  }
`;
const HeroDescription = styled.p`
  max-width: 520px;
  margin: 0 0 36px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 21px;
  line-height: 1.45;
  color: #c7b59a;

  @media (max-width: 800px) {
    font-size: 18px;
    max-width: 380px;
  }
`;
const ShopButton = styled(Link)`
  width: 240px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: rgba(9, 8, 6, 0.35);
  border: 1px solid #c9a66f;
  color: #ddbe8a;
  font-size: 11px;
  letter-spacing: 4px;
  text-decoration: none;
  transition: 0.45s ease;

  svg {
    transition: 0.4s ease;
  }
    &:hover {
    background: #c9a66f;
    color: #090705;
    box-shadow: 0 0 35px rgba(205, 166, 108, 0.25);
  }

  &:hover svg {
    transform: translateX(7px);
  }

  @media (max-width: 500px) {
    width: 210px;
  }
`;
const SliderControls = styled.div`
  margin-top: 75px;
  display: flex;
  align-items: center;
  gap: 38px;
`;
const SlideNumber = styled.button`
  position: relative;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? '#dfbd87' : 'rgba(217, 193, 157, 0.35)')};
  font-size: 11px;
  font-weight: 300;
  padding-bottom: 10px;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ $active }) => ($active ? '25px' : '0')};
    height: 1px;
    background: #d1a86e;
    transition: 0.3s ease;
  }
`;
const HeroSideText = styled.div`
  position: absolute;
  right: 5.5%;
  bottom: 15%;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 800px) {
    display: none;
  }
`;
const VerticalLine = styled.div`
  width: 1px;
  height: 72px;
  background: #d4b27d;
`;
const SideWords = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  span {
    font-size: 9px;
    letter-spacing: 3px;
    color: #d4c0a2;
  }
`;
const SideStar = styled.div`
  position: absolute;
  right: 8px;
  bottom: -40px;
  font-size: 20px;
  color: #e1c08a;
  animation: ${float} 3s ease-in-out infinite;
`;
const CategoriesSection = styled.section`
  padding: 38px 5% 90px;
  background: #090806;
  border-top: 1px solid rgba(212, 177, 121, 0.16);
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;
const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  span {
    font-size: 11px;
    letter-spacing: 4px;
    color: #cba66d;
  }
div {
    width: 85px;
    height: 1px;
    background: #886a43;
  }

  @media (max-width: 500px) {
    div {
      display: none;
    }
  }
`;
const ViewAll = styled(Link)`
  color: #cba66d;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 9px;
  letter-spacing: 3px;

  svg {
    transition: 0.3s ease;
  }

  &:hover svg {
    transform: translateX(6px);
  }
`;
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 23px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
const CategoryCard = styled(Link)`
  height: 230px;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.05)),
    ${({ $image }) => `url(${$image})`};
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(214, 176, 116, 0.2);
  transition: 0.5s ease;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(205, 165, 104, 0.08);
    opacity: 0;
    transition: 0.5s ease;
  }
    &:hover {
    transform: translateY(-5px);
    border-color: rgba(220, 184, 126, 0.65);
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 800px) {
    height: 300px;
  }
`;
const CategoryContent = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 21px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CategoryName = styled.h3`
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  color: #e5c99d;
`;

const CategoryArrow = styled.span`
  color: #e1bd82;
  font-size: 20px;
  transition: 0.3s ease;

  ${CategoryCard}:hover & {
    transform: translateX(7px);
  }
`;
const BrandSection = styled.section`
  min-height: 500px;
  padding: 90px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(circle at center, rgba(116, 81, 39, 0.14), transparent 55%), #080705;
`;

const BrandLine = styled.div`
  width: 110px;
  height: 1px;
  background: #8e7048;
  margin: 20px 0 30px;
`;
const BrandSmall = styled.span`
  font-size: 10px;
  letter-spacing: 5px;
  color: #b89360;
`;

const BrandTitle = styled.h2`
  margin: 25px 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px;
  font-weight: 400;
  line-height: 1;
  color: #e0c29a;

  span {
    color: #ae8959;
  }

  @media (max-width: 600px) {
    font-size: 38px;
  }
`;

const BrandDescription = styled.p`
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px;
  line-height: 1.5;
  color: #9f917d;
`;

const DiscoverButton = styled(Link)`
  margin-top: 30px;
  padding: 15px 30px;
  background: transparent;
  border: 1px solid #9d7a4c;
  color: #d1ad75;
  letter-spacing: 3px;
  font-size: 9px;
  text-decoration: none;
  transition: 0.4s ease;

  span {
    margin-left: 15px;
  }

  &:hover {
    background: #b28a56;
    color: #0b0805;
  }
`;

const Footer = styled.footer`
  padding: 70px 5% 25px;
  border-top: 1px solid rgba(211, 174, 119, 0.15);
  background: #060504;
`;

const FooterLogo = styled.div`
  text-align: center;
  margin-bottom: 55px;

  span {
    font-size: 13px;
  }

  h2 {
    margin: 8px 0 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 400;
    letter-spacing: 8px;
  }

  p {
    margin-top: 12px;
    font-size: 8px;
    letter-spacing: 4px;
    color: #806b4e;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 150px;
  margin-bottom: 60px;

  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  h4 {
    margin-bottom: 8px;
    font-size: 9px;
    letter-spacing: 3px;
    color: #c29b65;
  }

  a {
    text-decoration: none;
    font-size: 10px;
    color: #81796e;
    transition: 0.3s ease;

    &:hover {
      color: #d8bb8c;
    }
  }

  @media (max-width: 800px) {
    gap: 50px;
    flex-wrap: wrap;
  }

  @media (max-width: 500px) {
    justify-content: space-between;
    gap: 30px;
  }
`;

const FooterBottom = styled.div`
  padding-top: 22px;
  border-top: 1px solid rgba(211, 174, 119, 0.1);
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  letter-spacing: 2px;
  color: #625b52;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

function HomePage({ onLogout }) {
  const { getTotalItems } = useContext(CartContext);
  const cartCount = getTotalItems ? getTotalItems() : 0;

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'LUXURY FASHION',
      subtitle: 'FOR MODERN WOMEN',
      description:
        'Discover a curated collection of premium pieces designed to elevate your everyday style.',
      image:
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2000&q=90',
    },
    {
      title: 'TIMELESS',
      subtitle: 'ELEGANCE',
      description: 'Where sophisticated silhouettes meet effortless modern luxury.',
      image:
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=90',
    },
    {
      title: 'THE ART OF',
      subtitle: 'DRESSING',
      description: 'Exceptional pieces created for moments worth remembering.',
      image:
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=2000&q=90',
    },
  ];

  const categories = [
    { name: 'DRESSES', image: dressImage },
    { name: 'BAGS', image: backImage },
    { name: 'SHOES', image: shoesImage },
    { name: 'JEWELRY', image: jewImage },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[activeSlide];

  return (
    <Page>
      <Navbar onLogout={onLogout} />
      <Hero $image={currentSlide.image}>
        <HeroContent>
          <SmallTitle>
            <span>TIMELESS ELEGANCE</span>
            <div />
          </SmallTitle>
          <HeroTitle>
            {currentSlide.title}
            <br />
            <span>{currentSlide.subtitle}</span>
          </HeroTitle>
          <HeroDescription>{currentSlide.description}</HeroDescription>
          <ShopButton to="/products">
            <span>SHOP NOW</span>
            <ArrowIcon />
          </ShopButton>
          <SliderControls>
            {slides.map((_, index) => (
              <SlideNumber
                key={index}
                $active={activeSlide === index}
                onClick={() => setActiveSlide(index)}
              >
                0{index + 1}
              </SlideNumber>
            ))}
          </SliderControls>
        </HeroContent>
        <HeroSideText>
          <VerticalLine />
          <SideWords>
            <span>MORE</span>
            <span>THAN</span>
            <span>FASHION</span>
          </SideWords>
          <SideStar>✦</SideStar>
        </HeroSideText>
      </Hero>
      <CategoriesSection id="collections">
        <SectionHeader>
          <SectionTitle>
            <span>SHOP BY CATEGORY</span>
            <div />
          </SectionTitle>
          <ViewAll to="/products">
            VIEW ALL
            <ArrowIcon />
          </ViewAll>
        </SectionHeader>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryCard key={category.name} $image={category.image} to="/products">
              <CategoryContent>
                <CategoryName>{category.name}</CategoryName>
                <CategoryArrow>→</CategoryArrow>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategoriesSection>
      <BrandSection>
        <BrandLine />
        <BrandSmall>THE ÉLAN EXPERIENCE</BrandSmall>
        <BrandTitle>
          MORE THAN FASHION.
          <br />
          <span>IT&apos;S A STATEMENT.</span>
        </BrandTitle>
        <BrandDescription>
          Curated pieces. Exceptional details.
          <br />
          A style that speaks without words.
        </BrandDescription>
        <DiscoverButton to="/products">
          DISCOVER ÉLAN
          <span>→</span>
        </DiscoverButton>
        <BrandLine />
      </BrandSection>
      <Footer>
        <FooterLogo>
          <span>✦</span>
          <h2>ÉLAN</h2>
          <p>LUXURY FASHION HOUSE</p>
        </FooterLogo>
        <FooterLinks>
          <div>
            <h4>EXPLORE</h4>
            <a href="/">Home</a>
            <a href="#collections">Collections</a>
            <a href="/products">Shop</a>
          </div>
          <div>
            <h4>ABOUT</h4>
            <a href="#about">Our Story</a>
            <a href="#about">Contact</a>
            <a href="#about">Shipping</a>
          </div>
          <div>
            <h4>FOLLOW</h4>
            <a href="#instagram">Instagram</a>
            <a href="#facebook">Facebook</a>
            <a href="#pinterest">Pinterest</a>
          </div>
        </FooterLinks>
        <FooterBottom>
          <span>© 2025 ÉLAN. ALL RIGHTS RESERVED.</span>
          <span>EST. 2025</span>
        </FooterBottom>
      </Footer>
    </Page>
  );
}

export default HomePage;
