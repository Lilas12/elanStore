const API = 'https://dummyjson.com';

const TARGET_CATEGORIES = [
  'womens-dresses',
  'womens-shoes',
  'womens-bags',
  'womens-jewellery',
  'mens-shirts',
  'mens-shoes',
  'sunglasses',
  'tops',
  'fragrances',
];

export const getProducts = async () => {
  try {
    const res = await fetch(`${API}/products?limit=100&select=id,title,description,price,thumbnail,images,category,stock,rating`);
    const data = await res.json();
    const filtered = data.products.filter((item) =>
      TARGET_CATEGORIES.includes(item.category)
    );
    return filtered.map((item) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      cat: item.category,
      img: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image',
      desc: item.description,
      rate: item.rating || 4.5,
      stock: item.stock > 0,
    }));
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

export const getProduct = async (id) => {
  try {
    const res = await fetch(`${API}/products/${id}`);
    const item = await res.json();
    return {
      id: item.id,
      name: item.title,
      price: item.price,
      cat: item.category,
      img: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image',
      desc: item.description,
      rate: item.rating || 4.5,
      stock: item.stock > 0,
    };
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    throw err;
  }
};

export const searchProducts = async (query) => {
  try {
    const res = await fetch(`${API}/products/search?q=${encodeURIComponent(query)}&limit=50`);
    const data = await res.json();
    const filtered = data.products.filter((item) =>
      TARGET_CATEGORIES.includes(item.category)
    );
    return filtered.map((item) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      cat: item.category,
      img: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image',
      desc: item.description,
      rate: item.rating || 4.5,
      stock: item.stock > 0,
    }));
  } catch (err) {
    console.error('Error searching products:', err);
    return [];
  }
};