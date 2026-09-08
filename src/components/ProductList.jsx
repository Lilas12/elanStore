import styled from 'styled-components';
import ProductCard from './ProductCard';


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 24px 0 60px;
`;

const Empty = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  padding: 40px 0;
  font-size: 18px;
`;

function ProductList({ items, onAdd }) {
  if (!items || items.length === 0) {
    return <Empty>No products found</Empty>;
  }

  return (
    <Grid>
      {items.map((item) => (
        <ProductCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </Grid>
  );
}

export default ProductList;