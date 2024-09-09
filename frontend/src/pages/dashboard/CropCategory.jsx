import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CropCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [viewingCategoryId, setViewingCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

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
        setPicture(category.pictureUrl); // Handle existing picture URL if needed
      }
    }
  }, [id, categories]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (picture) {
        formData.append('picture', picture);
      }

      await axios.post('/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCategories([...categories, { ...formData, id: categories.length + 1 }]);
      setName('');
      setDescription('');
      setPicture(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (picture) {
        formData.append('picture', picture);
      }

      await axios.put(`/api/categories/${editingCategoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCategories(categories.map(cat =>
        cat.id === editingCategoryId
          ? { ...cat, name, description, pictureUrl: picture ? URL.createObjectURL(picture) : cat.pictureUrl }
          : cat
      ));
      setEditingCategoryId(null);
      setName('');
      setDescription('');
      setPicture(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (categoryId = null) => {
    if (categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setName(category.name);
        setDescription(category.description);
        setPicture(null); // Reset picture on open
        setEditingCategoryId(categoryId);
      }
    } else {
      setName('');
      setDescription('');
      setPicture(null);
      setEditingCategoryId(null);
    }
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

  const handleRemoveCategory = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setConfirmDelete(true);
  };

  const confirmRemoveCategory = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/categories/${deleteCategoryId}`); // Replace with your API endpoint
      setCategories(categories.filter(cat => cat.id !== deleteCategoryId));
      setDeleteCategoryId(null);
    } catch (error) {
      console.error('Error removing category:', error);
    } finally {
      setLoading(false);
      setConfirmDelete(false);
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
            Crop Categories
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
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
                        color="primary"
                        onClick={() => handleOpenDialog(category.id)}
                      >
                        <EditIcon />
                      </IconButton>
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

          {/* Dialog for Adding/Editing a Category */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{editingCategoryId ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {editingCategoryId ? 'Update the category details below.' : 'Please enter the category details below.'}
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPicture(e.target.files[0])}
                style={{ marginTop: 16 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={editingCategoryId ? handleEditCategory : handleAddCategory} color="primary">
                {editingCategoryId ? 'Save Changes' : 'Add Category'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Confirm Delete Dialog */}
          <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this category? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDelete(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={confirmRemoveCategory} color="primary">
                Confirm
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
