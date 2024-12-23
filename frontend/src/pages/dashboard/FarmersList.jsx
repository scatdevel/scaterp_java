import React, { useEffect, useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Box
} from '@mui/material';
import axios from 'axios';
import { textAlign } from '@mui/system';

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);  // Current page
  const farmersPerPage = 10;  // Number of farmers per page

  // Pagination logic
  const totalPages = useMemo(() => Math.ceil(farmers.length / farmersPerPage), [farmers, farmersPerPage]);
  const currentPageFarmers = useMemo(() => farmers.slice((page - 1) * farmersPerPage, page * farmersPerPage), [farmers, page, farmersPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/all'); // Replace with your API endpoint
        console.log('API Response:', response.data); // Log the response to inspect it
        setFarmers(response.data);
      } catch (error) {
        setError('Error fetching farmers. Please try again later.');
        console.error('Error fetching farmers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Typography color="error" variant="h6" align="center">
      {error}
    </Typography>
  );

  return (
    <div>
      <Typography variant="h6" textAlign={'center'} gutterBottom style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        FARMER LIST
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Picture</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Phone</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageFarmers.map((farmer, index) => {
              console.log('Farmer data:', farmer); // Add this to debug each farmer's data
              return (
                <TableRow key={farmer.id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                  <td style={styles.tableCell}>{farmer.id}</td>
                  <TableCell>
                    <img
                      src={`http://localhost:8080/users/image/${farmer.username}` || 'https://via.placeholder.com/50'}
                      alt={farmer.username}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/50'} // Fallback image on error
                    />
                  </TableCell>
                  <td style={styles.tableCell}>{farmer.username}</td>
                  <td style={styles.tableCell}>{farmer.email || 'N/A'}</td>
                  <td style={styles.tableCell}>{farmer.phoneNumber || 'N/A'}</td>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={
            page === 1
              ? { ...styles.paginationButton, ...styles.paginationButtonDisabled }
              : { ...styles.paginationButton }
          }        >
          Previous
        </button>
        <span style={{ margin: '0 20px' }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          style={
            page === totalPages
              ? { ...styles.paginationButton, ...styles.paginationButtonDisabled }
              : { ...styles.paginationButton }
          }        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign:'center'
  },
  tableRowEven: {
    backgroundColor: '#f9f9f9',
  },
  tableRowOdd: {
    backgroundColor: '#ffffff',
  },
  paginationButtonDisabled: {
    backgroundColor: '#cccccc', // Gray color for disabled button
    cursor: 'not-allowed',
  },
  paginationButton: {
    textAlign: 'center',
    padding: '5px 10px',  // Smaller padding for smaller button size
    fontSize: '14px',     // Smaller font size
    margin: '0 5px',      // Reduced margin between buttons
    backgroundColor: '#ff6347', // Vibrant Tomato red for normal button
    color: 'white',
    border: 'none',
    borderRadius: '20px', // Rounded corners for a more modern look
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth color and scale transition
  },
};

export default FarmersList;
