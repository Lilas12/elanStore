/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { theme } from '../theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(198, 165, 107, 0.06);
  transition: all 0.4s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(198, 165, 107, 0.15);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ImgWrap = styled.div`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 16px;
    transition: 0.5s;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const HeartBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(198, 165, 107, 0.1);
  background: rgba(0, 0, 0, 0.6);
  color: ${(props) => (props.$liked ? '#c6a56b' : 'rgba(255,255,255,0.3)')};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  cursor: pointer;
  backdrop-filter: blur(8px);

  &:hover {
    transform: scale(1.1);
    border-color: #c6a56b;
    color: #c6a56b;
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const Cat = styled.span`
  color: #c6a56b;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Name = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin: 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 44px;
  font-family: Georgia, 'Times New Roman', serif;
`;

const Price = styled.div`
  color: #c6a56b;
  font-size: 20px;
  font-weight: 600;
  margin: 8px 0;
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fdcb6e;
  font-size: 14px;
  margin-bottom: 12px;

  span {
    color: rgba(255, 255, 255, 0.3);
    margin-left: 4px;
  }
`;

const AddBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: #c6a56b;
  color: #070707;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: 0.3s;
  font-family: Arial, sans-serif;

  &:hover {
    background: #b8973e;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #c6a56b;
  color: #070707;
  font-size: 9px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

function ProductCard({ item, onAdd }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const goToDetails = () => {
    navigate(`/product/${item.id}`, {
      state: { product: item },
    });
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(item);
  };

  return (
    <Card onClick={goToDetails}>
      <ImgWrap>
        <img src={item.img} alt={item.name} loading="lazy" />
        <Badge>New</Badge>
        <HeartBtn $liked={liked} onClick={toggleLike}>
          <FaHeart />
        </HeartBtn>
      </ImgWrap>

      <Content>
        <Cat>{item.cat}</Cat>
        <Name>{item.name}</Name>
        <Rate>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < Math.floor(item.rate) ? '#fdcb6e' : 'rgba(255,255,255,0.1)'} />
          ))}
          <span>({item.rate})</span>
        </Rate>
        <Price>${item.price}</Price>
        <AddBtn onClick={handleAdd}>
          <FaShoppingCart /> Add to Cart
        </AddBtn>
      </Content>
    </Card>
  );
}

export default ProductCard;