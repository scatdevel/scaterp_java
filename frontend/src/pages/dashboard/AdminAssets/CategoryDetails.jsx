import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Button, CircularProgress, Paper
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetails = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/crops/categories/get/all');
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="xl">
      {category && (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Category Details
          </Typography>
          <Typography variant="h6">Name: {category.name}</Typography>
          <Typography variant="body1">Description: {category.description}</Typography>
          {category.picture && (
            <img
              src={`data:image/jpeg;base64,${category.picture}`} // Assuming picture is in base64 format
              alt="Category"
              style={{ width: 200, height: 200, marginTop: 16, borderRadius: '10%' }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin-dashboard/crop-categories')}
            sx={{ mt: 2 }}
          >
            Back to List
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default CategoryDetails;
