import React, { useEffect, useState } from 'react';
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
      {/* <Typography variant="h6" textAlign={'center'} gutterBottom style={{ color: '#4A90E2' , fontWeight:'bold'}} >
        FARMER LIST
      </Typography> */}
      <Typography variant="h6"  textAlign={'center'} gutterBottom style={{ color: '#333' , fontSize:'2rem', fontWeight:'bold'}} >
        FARMER LIST
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <th  style={styles.tableHeader}>ID</th>
              <th  style={styles.tableHeader}>Picture</th> 
              <th  style={styles.tableHeader}>Name</th>
              <th  style={styles.tableHeader}>Email</th>
              <th  style={styles.tableHeader}>Phone</th>
            </TableRow>
          </TableHead>
          <TableBody>
          {farmers.map((farmer) => {
  console.log('Farmer data:', farmer); // Add this to debug each farmer's data
  return (
    <TableRow key={farmer.id}>
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
  }
}

export default FarmersList;    //--------------------------------------------------
