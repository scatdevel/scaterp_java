import React, { useState } from 'react';

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  searchBar: {
    width: '100%',
    maxWidth: '600px',
    padding: '12px 15px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    padding: '20px',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    textAlign: 'center',
  },
  productCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productDetails: {
    padding: '15px',
  },
  productTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
    height: '45px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  productPrice: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#f39c12',
    marginBottom: '10px',
  },
  productRating: {
    color: '#f1c40f',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed',
  },
  buttonHover: {
    backgroundColor: '#27ae60',
  },
  noResults: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2rem',
    color: '#888',
  },
};

const Inventory = () => {
  const [products] = useState([
    { id: 1, name: 'Wheat', price: 299, image: 'https://via.placeholder.com/250', rating: 4.2, stock: 10 },
    { id: 2, name: 'Laptop', price: 799, image: 'https://via.placeholder.com/250', rating: 4.7, stock: 5 },
    { id: 3, name: 'Wireless Headphones', price: 99, image: 'https://via.placeholder.com/250', rating: 4.1, stock: 20 },
    { id: 4, name: 'Smartwatch', price: 199, image: 'https://via.placeholder.com/250', rating: 4.3, stock: 50 },
    { id: 5, name: 'Bluetooth Speaker', price: 49, image: 'https://via.placeholder.com/250', rating: 3.9, stock: 100 },
    { id: 6, name: '4K TV', price: 599, image: 'https://via.placeholder.com/250', rating: 4.8, stock: 2 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search for products..."
        style={styles.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div style={styles.gridContainer}>
        {filteredProducts.length === 0 ? (
          <div style={styles.noResults}>No products found.</div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                ...styles.productCard,
                ...(product.stock === 0 ? styles.buttonDisabled : {}),
                ...(product.stock > 0 ? styles.productCardHover : {}),
              }}
            >
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <div style={styles.productDetails}>
                <h3 style={styles.productTitle}>{product.name}</h3>
                <p style={styles.productPrice}>${product.price}</p>
                <p style={styles.productRating}>
                  {'⭐'.repeat(Math.floor(product.rating))}{' '}
                  {product.rating.toFixed(1)} ({Math.floor(Math.random() * 200)} reviews)
                </p>
                <button
                  style={{
                    ...styles.button,
                    ...(product.stock === 0 ? styles.buttonDisabled : {}),
                  }}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;
