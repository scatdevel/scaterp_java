// import React, { useState } from 'react';

// // Inline styles for the Orders Page with grid layout
// const styles = {
//   container: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive grid layout
//     gap: '20px',
//     padding: '30px',
//     backgroundColor: '#f4f4f4',
//   },
//   orderCard: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s, box-shadow 0.3s',
//     cursor: 'pointer',
//     textAlign: 'left',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: '200px',
//   },
//   orderCardHover: {
//     transform: 'scale(1.05)',
//     boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
//   },
//   orderHeader: {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//     color: '#333',
//   },
//   orderDetails: {
//     fontSize: '1rem',
//     color: '#555',
//     marginBottom: '10px',
//   },
//   orderButton: {
//     backgroundColor: '#ff6f61',
//     color: '#fff',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     transition: 'background-color 0.3s',
//     marginTop: 'auto', // Push the button to the bottom of the card
//   },
//   orderButtonHover: {
//     backgroundColor: '#e95f54',
//   },
//   orderStatus: {
//     padding: '5px 15px',
//     borderRadius: '5px',
//     fontWeight: 'bold',
//     width: 'fit-content',
//     marginBottom: '10px',
//   },
//   pending: {
//     backgroundColor: '#ffb84d',
//     color: '#fff',
//   },
//   shipped: {
//     backgroundColor: '#48c78e',
//     color: '#fff',
//   },
//   delivered: {
//     backgroundColor: '#6c757d',
//     color: '#fff',
//   },
// };

// const Orders = () => {
//   // Sample orders data
//   const [orders] = useState([
//     {
//       id: 'ORD001',
//       products: ['Smartphone', 'Wireless Headphones'],
//       total: 399,
//       status: 'Shipped',
//       trackingNumber: '123456789',
//       date: '2024-11-15',
//     },
//     {
//       id: 'ORD002',
//       products: ['Laptop', 'Wireless Mouse'],
//       total: 950,
//       status: 'Pending',
//       trackingNumber: 'N/A',
//       date: '2024-11-18',
//     },
//     {
//       id: 'ORD003',
//       products: ['Smartwatch'],
//       total: 199,
//       status: 'Delivered',
//       trackingNumber: '987654321',
//       date: '2024-11-10',
//     },
//     {
//       id: 'ORD004',
//       products: ['Headphones', 'Bluetooth Speaker'],
//       total: 150,
//       status: 'Shipped',
//       trackingNumber: '1122334455',
//       date: '2024-11-19',
//     },
//     {
//       id: 'ORD005',
//       products: ['Smartphone Case', 'Screen Protector'],
//       total: 50,
//       status: 'Pending',
//       trackingNumber: 'N/A',
//       date: '2024-11-20',
//     },
//   ]);

//   return (
//     <div style={styles.container}>
//       <h1 style={{ gridColumn: 'span 2', textAlign: 'center' }}>My Orders</h1>
//       {orders.map((order) => (
//         <div
//           key={order.id}
//           style={{
//             ...styles.orderCard,
//             ...(order.status === 'Shipped' ? styles.orderCardHover : {}),
//           }}
//         >
//           <h2 style={styles.orderHeader}>Order ID: {order.id}</h2>
//           <p style={styles.orderDetails}>
//             <strong>Products:</strong> {order.products.join(', ')}
//           </p>
//           <p style={styles.orderDetails}>
//             <strong>Total Amount:</strong> ${order.total}
//           </p>
//           <p style={styles.orderDetails}>
//             <strong>Order Date:</strong> {order.date}
//           </p>
//           <div
//             style={{
//               ...styles.orderStatus,
//               ...(order.status === 'Pending'
//                 ? styles.pending
//                 : order.status === 'Shipped'
//                 ? styles.shipped
//                 : styles.delivered),
//             }}
//           >
//             {order.status}
//           </div>
//           <button
//             style={{
//               ...styles.orderButton,
//               ...(order.status === 'Shipped' ? styles.orderButtonHover : {}),
//             }}
//             onClick={() => alert(`Tracking Order ${order.id}`)}
//           >
//             Track Order
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Orders;
import React, { useState } from 'react';

// Inline styles for the Orders Page with grid layout
const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Adjusted to a more responsive grid
    gap: '20px',
    padding: '30px',
    backgroundColor: '#f4f4f4',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
    minHeight: '250px',
  },
  orderCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
  orderHeader: {
    fontSize: '1.6rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
  },
  orderDetails: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    lineHeight: '1.6',
  },
  orderButton: {
    backgroundColor: '#ff6f61',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    marginTop: 'auto', // Push the button to the bottom of the card
    textAlign: 'center',
  },
  orderButtonHover: {
    backgroundColor: '#e95f54',
  },
  orderStatus: {
    padding: '8px 20px',
    borderRadius: '20px',
    fontWeight: '600',
    width: 'fit-content',
    marginBottom: '15px',
  },
  pending: {
    backgroundColor: '#ffb84d',
    color: '#fff',
  },
  shipped: {
    backgroundColor: '#48c78e',
    color: '#fff',
  },
  delivered: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
  header: {
    gridColumn: 'span 2',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#333',
  },
};

const Orders = () => {
  // Sample orders data
  const [orders] = useState([
    {
      id: 'ORD001',
      products: ['Smartphone', 'Wireless Headphones'],
      total: 399,
      status: 'Shipped',
      trackingNumber: '123456789',
      date: '2024-11-15',
    },
    {
      id: 'ORD002',
      products: ['Laptop', 'Wireless Mouse'],
      total: 950,
      status: 'Pending',
      trackingNumber: 'N/A',
      date: '2024-11-18',
    },
    {
      id: 'ORD003',
      products: ['Smartwatch'],
      total: 199,
      status: 'Delivered',
      trackingNumber: '987654321',
      date: '2024-11-10',
    },
    {
      id: 'ORD004',
      products: ['Headphones', 'Bluetooth Speaker'],
      total: 150,
      status: 'Shipped',
      trackingNumber: '1122334455',
      date: '2024-11-19',
    },
    {
      id: 'ORD005',
      products: ['Smartphone Case', 'Screen Protector'],
      total: 50,
      status: 'Pending',
      trackingNumber: 'N/A',
      date: '2024-11-20',
    },
  ]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            ...styles.orderCard,
            ...(order.status === 'Shipped' ? styles.orderCardHover : {}),
          }}
        >
          <h2 style={styles.orderHeader}>Order ID: {order.id}</h2>
          <p style={styles.orderDetails}>
            <strong>Products:</strong> {order.products.join(', ')}
          </p>
          <p style={styles.orderDetails}>
            <strong>Total Amount:</strong> ${order.total}
          </p>
          <p style={styles.orderDetails}>
            <strong>Order Date:</strong> {order.date}
          </p>
          <div
            style={{
              ...styles.orderStatus,
              ...(order.status === 'Pending'
                ? styles.pending
                : order.status === 'Shipped'
                ? styles.shipped
                : styles.delivered),
            }}
          >
            {order.status}
          </div>
          <button
            style={{
              ...styles.orderButton,
              ...(order.status === 'Shipped' ? styles.orderButtonHover : {}),
            }}
            onClick={() => alert(`Tracking Order ${order.id}`)}
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
