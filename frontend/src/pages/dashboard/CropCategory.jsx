
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CropCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null); // State for picture
  const [viewingCategoryId, setViewingCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Flag to determine if we're editing
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State for confirmation dialog
  const [categoryToDelete, setCategoryToDelete] = useState(null); // State to hold the category id for deletion

  const navigate = useNavigate();
  const { id } = useParams();

    // Use the environment variable for the API URL

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/crops/categories/get/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchCategoryById = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8080/crops/categories/get/${id}`);
          const category = response.data;
          if (category) {
            setName(category.name);
            setDescription(category.description);
            setPicture(category.picture ? `data:image/jpeg;base64,${category.picture}` : null);
            setViewingCategoryId(category.id);
            setIsEditMode(true);
            setOpenDialog(true);
          }
        } catch (error) {
          console.error('Error fetching category by ID:', error);
        } finally {
          setLoading(false);
        }
      }; 

      fetchCategoryById();
    }
  }, [id]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (picture instanceof File) {
        formData.append('picture', picture); // Append file object
      }

      const response = await axios.post('http://localhost:8080/crops/categories/add', formData, {
        headers: {
           'Content-Type': 'multipart/form-data'
        }
      });
      setCategories([...categories, response.data]);
      handleCloseDialog(); // Close the dialog after adding
    } catch (error) {
      console.error('Error adding category:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (picture instanceof File) {
        formData.append('picture', picture); // Append file object
      }

      await axios.put(`http://localhost:8080/crops/categories/update/${viewingCategoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Update the category in the state
      setCategories(categories.map(cat =>
        cat.id === viewingCategoryId ? { ...cat, name, description, picture: picture ? URL.createObjectURL(picture) : cat.picture } : cat
      ));
      handleCloseDialog(); // Close the dialog after updating
    } catch (error) {
      console.error('Error updating category:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setName('');
    setDescription('');
    setPicture(null);
    setViewingCategoryId(null);
    setIsEditMode(false); // Add mode
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewingCategoryId(null); // Clear the viewingCategoryId
    setName('');
    setDescription('');
    setPicture(null);
  };

  const handleOpenConfirmDialog = (categoryId) => {
    setCategoryToDelete(categoryId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCategoryToDelete(null);
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/crops/categories/delete/${categoryToDelete}`);
      setCategories(categories.filter(cat => cat.id !== categoryToDelete));
    } catch (error) {
      console.error('Error removing category:', error);
    } finally {
      setLoading(false);
      handleCloseConfirmDialog(); // Close the confirmation dialog after deleting
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file); // Set the file object
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="xl">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog} // Open dialog in add mode
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
                  {category.picture ? (
                    <img
                      src={`data:image/jpeg;base64,${category.picture}`}
                      alt={category.name}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  ) : (
                    <Typography>No Picture</Typography>
                  )}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell sx={{ display: '', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#a5d6a7',
                      '&:hover': {
                        bgcolor: 'green',
                      },
                    }}
                    onClick={() => {
                      setName(category.name);
                      setDescription(category.description);
                      setPicture(category.picture ? `data:image/jpeg;base64,${category.picture}` : null);
                      setViewingCategoryId(category.id);
                      setIsEditMode(true);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      bgcolor: '#f48fb1',
                      '&:hover': {
                        bgcolor: 'red',
                      },
                    }}
                    onClick={() => handleOpenConfirmDialog(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Category */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>   
        <DialogTitle>{isEditMode ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditMode ? 'Please edit the category details below.' : 'Please enter the category details below.'}
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
            label="Category Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: 16 }}
          />
          {picture && (
            <img
              src={picture instanceof File ? URL.createObjectURL(picture) : picture}
              alt="Preview"
              style={{ width: 100, height: 100, marginTop: 16, borderRadius: '10%' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={isEditMode ? handleUpdateCategory : handleAddCategory}
            color="primary"
          >
            {isEditMode ? 'Update Category' : 'Add Category'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="secondary">
            No
          </Button>
          <Button
            onClick={handleDeleteCategory}
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CropCategory;  
