import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Block as BlockIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CropCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [viewingCategoryId, setViewingCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories'); // Replace with your API endpoint
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [editingCategoryId]);

  useEffect(() => {
    if (id) {
      const category = categories.find(cat => cat.id === parseInt(id));
      if (category) {
        setName(category.name);
        setDescription(category.description);
      }
    }
  }, [id, categories]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCategory = { name, description };
      await axios.post('/api/categories', newCategory); // Replace with your API endpoint
      setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
      setName('');
      setDescription('');
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setName('');
    setDescription('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleViewDetails = (categoryId) => {
    setViewingCategoryId(categoryId);
    navigate(`/admin-dashboard/crop-categories/${categoryId}`);
  };

  const handleBackToList = () => {
    setViewingCategoryId(null);
    navigate('/admin-dashboard/crop-categories');
  };

  const handleRemoveCategory = async (categoryId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/categories/${categoryId}`); // Replace with your API endpoint
      setCategories(categories.filter(cat => cat.id !== categoryId));
    } catch (error) {
      console.error('Error removing category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (categoryId) => {
    setLoading(true);
    try {
      await axios.post(`/api/categories/${categoryId}/block`); // Replace with your API endpoint
      // Handle any additional state changes or user feedback here
    } catch (error) {
      console.error('Error blocking user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="xl">
      {!viewingCategoryId ? (
        <>
          <Typography variant="h7" gutterBottom>
            {/* Crop Categories */}

          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{ mb: 2 }}
          >
            Add Category
          </Button>
          <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Picture</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>
                      <img
                        src={category.pictureUrl} // Ensure your data includes pictureUrl
                        alt={category.name}
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveCategory(category.id)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleBlockUser(category.id)}
                      >
                        <BlockIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleViewDetails(category.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog for Adding a New Category */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the category details below.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Category Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddCategory} color="primary">
                Add Category
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Crop Category Details
          </Typography>
          <Typography variant="h6">Name: {name}</Typography>
          <Typography variant="body1">Description: {description}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToList}
            sx={{ mt: 2 }}
          >
            Back to List
          </Button>
        </>
      )}
    </Container>
  );
};

export default CropCategory;
