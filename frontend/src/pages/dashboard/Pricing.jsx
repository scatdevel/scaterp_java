import React, { useState, useEffect } from 'react';

// Inline styles for a more professional design
const styles = {
  pricingContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive grid with minimum 280px per card
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f7f7f7',
  },
  pricingCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '380px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
  },
  pricingCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
  productImage: {
    maxWidth: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    marginBottom: '15px',
    borderRadius: '8px',
  },
  header: {
    color: '#333',
    fontSize: '1.25rem',
    marginBottom: '10px',
    fontWeight: '600',
  },
  price: {
    fontSize: '1.2rem',
    color: '#ff6347',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  rating: {
    color: '#FFD700',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: 'auto', // Pushes the button to the bottom
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  paragraph: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
  },
};

const Pricing = () => {
  const [products, setProducts] = useState([
    { id: 1, price: 100, stock: 50, name: 'Product 1', image: 'https://via.placeholder.com/300', rating: 4.5 },
    { id: 2, price: 120, stock: 30, name: 'Product 2', image: 'https://via.placeholder.com/300', rating: 4.0 },
    { id: 3, price: 80, stock: 20, name: 'Product 3', image: 'https://via.placeholder.com/300', rating: 3.5 },
    { id: 4, price: 150, stock: 10, name: 'Product 4', image: 'https://via.placeholder.com/300', rating: 4.7 },
    { id: 5, price: 90, stock: 15, name: 'Product 5', image: 'https://via.placeholder.com/300', rating: 3.8 },
  ]);

  // Dynamic Pricing based on stock level (Supply and Demand)
  useEffect(() => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.stock < 20
          ? { ...product, price: 200 } // Price increases when stock is low
          : { ...product, price: 100 } // Default price
      )
    );
  }, [products]);

  // Function to simulate sale
  const handleSale = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, stock: product.stock - 1 }
          : product
      )
    );
  };

  return (
    <div style={styles.pricingContainer}>
      {products.map(product => (
        <div
          key={product.id}
          style={{
            ...styles.pricingCard,
            ...(product.stock <= 0 ? styles.buttonDisabled : {}),
            ...(product.stock > 0 ? styles.pricingCardHover : {}),
          }}
        >
          <img src={product.image} alt={product.name} style={styles.productImage} />
          <h2 style={styles.header}>{product.name}</h2>
          <h3 style={styles.price}>${product.price}</h3>
          <div style={styles.rating}>
            {'★'.repeat(Math.round(product.rating))}{' '}
            <span style={{ color: '#666' }}>{product.rating}</span>
          </div>
          <p style={styles.paragraph}>Stock Available: {product.stock}</p>

          <div>
            <button
              onClick={() => handleSale(product.id)}
              disabled={product.stock <= 0}
              style={{
                ...styles.button,
                ...(product.stock <= 0 ? styles.buttonDisabled : {}),
              }}
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            {product.stock <= 0 && <p style={styles.paragraph}>Out of Stock!</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
