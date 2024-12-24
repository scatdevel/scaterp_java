import React, { useState, useEffect, useMemo } from 'react';
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
  const [picture, setPicture] = useState(null);
  const [viewingCategoryId, setViewingCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [page, setPage] = useState(1);  // Current page
  const categoriesPerPage = 10;  // Number of categories per page

  const navigate = useNavigate();
  const { id } = useParams();

  const totalPages = useMemo(() => Math.ceil(categories.length / categoriesPerPage), [categories, categoriesPerPage]);
  const currentPageCategories = useMemo(() => categories.slice((page - 1) * categoriesPerPage, page * categoriesPerPage), [categories, page, categoriesPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/crops/categories/get/all');
        const categoriesWithPictures = response.data.map(category => ({
          ...category,
          picture: category.picture ? `data:image/jpeg;base64,${category.picture}` : null,
        }));
        setCategories(categoriesWithPictures);
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
        formData.append('picture', picture);
      }

      const response = await axios.post('http://localhost:8080/crops/categories/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newCategory = {
        ...response.data,
        picture: response.data.picture ? `data:image/jpeg;base64,${response.data.picture}` : null,
      };
      setCategories([...categories, newCategory]);
      handleCloseDialog();
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
        formData.append('picture', picture);
      }

      await axios.put(`http://localhost:8080/crops/categories/update/${viewingCategoryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updatedCategories = categories.map(cat =>
        cat.id === viewingCategoryId
          ? { ...cat, name, description, picture: picture instanceof File ? URL.createObjectURL(picture) : cat.picture }
          : cat
      );

      setCategories(updatedCategories);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating category:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category) => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setPicture(category.picture); // Directly use the base64 string for editing
      setViewingCategoryId(category.id);
      setIsEditMode(true);
    } else {
      setName('');
      setDescription('');
      setPicture(null);
      setViewingCategoryId(null);
      setIsEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewingCategoryId(null);
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
      handleCloseConfirmDialog();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  if (loading) return <CircularProgress />;
const styles= {
  tableRowEven: {
    backgroundColor: '#f9f9f9',
},
tableRowOdd: {
    backgroundColor: '#ffffff',
},    paginationButtonDisabled: {
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
}

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" textAlign={'center'} gutterBottom style={{  fontSize:'2rem', fontWeight:'bold'}} >
       CROP CATEGORIES
      </Typography>
      <Button
  variant="contained"
  color="primary"
  startIcon={<AddIcon />}
  onClick={() => handleOpenDialog(null)} // Open dialog for adding
  sx={{
    mb: 3,                        // Margin bottom
    ml: 'auto',                   // Align to the right
    display: 'flex',               // Flex display for alignment
    padding: '12px 20px',         // Adjusted padding for larger size
    fontSize: '12px',             // Increased font size
    backgroundColor: '#007BFF',   // Custom Blue color
    color: '#fff',                // White text
    borderRadius: '5px',          // Rounded corners
    cursor: 'pointer',           // Pointer cursor on hover
    textAlign: 'center',          // Center the text inside
  }}
>
  Add Category
</Button>

      <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ width: '100%',  border: '1px solid #ddd'}}>
          <TableHead>
            <TableRow  sx={ {backgroundColor: '#f2f2f2'}}  >
              <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>ID</TableCell>
              <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>Picture</TableCell>
              <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>Name</TableCell>
              <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>Description</TableCell>
              <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {currentPageCategories.map((category,index) => (
              <TableRow key={category.id}
              style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>{category.id}</TableCell>
                <TableCell sx={{border: '1px solid #ddd'}}>
                  {category.picture ? (
                    <img
                      src={category.picture}
                      alt={category.name}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  ) : (
                    <Typography>No Picture</Typography>
                  )}
                </TableCell>
                <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>{category.name}</TableCell>
                <TableCell sx={{border: '1px solid #ddd', textAlign:'center'}}>{category.description}</TableCell>
                <TableCell sx={{border: '1px solid #ddd'}}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog(category)} // Pass category for editing
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
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
      
        {/* Pagination Controls */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={
            page === 1
              ? { ...styles.paginationButton, ...styles.paginationButtonDisabled }
              : { ...styles.paginationButton }
          }          >
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
          }          >
          Next
        </button>
      </div> 
          

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
              src={typeof picture === 'string' ? picture : URL.createObjectURL(picture)}
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
