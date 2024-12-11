import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    flexWrap: "wrap",
  },
  sidebar: {
    width: "100%",
    maxWidth: "20%",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  filterSelect: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  sliderContainer: {
    marginBottom: "20px",
  },
  sliderLabel: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.2s",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  productDetails: {
    padding: "10px",
    textAlign: "center",
  },
  productTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  productPrice: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#e74c3c",
  },
  walletDialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  walletImage: {
    width: "30px",
    height: "30px",
    marginBottom: "10px",
  },
  walletText: {
    marginBottom: "10px",
  },
  dialogWrapper: {
    position: "fixed",
    top: "10%",
    right: "0",
    zIndex: 1000,
  },
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const Inventory = () => {
  const [crops, setCrops] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/crops/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/crops/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCrops();
    fetchCategories();
  }, [token]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handlePriceChange = (event, newRange) => setPriceRange(newRange);
  const handleProductClick = (product) => setSelectedProduct(product);
  const handleCloseProductDialog = () => setSelectedProduct(null);
  const handleBuyNowClick = () => setWalletDialogOpen(true);
  const handleCloseWalletDialog = () => setWalletDialogOpen(false);

  const filteredCrops = crops.filter(
    (crop) =>
      crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || crop.category === selectedCategory) &&
      crop.projectedProduction >= priceRange[0] &&
      crop.projectedProduction <= priceRange[1]
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <input
          type="text"
          placeholder="Search for crops..."
          style={styles.searchBar}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          style={styles.filterSelect}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div style={styles.sliderContainer}>
          <div style={styles.sliderLabel}>
            Price Range (₹{formatCurrency(priceRange[0])} - ₹{formatCurrency(priceRange[1])})
          </div>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={100000}
            step={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatCurrency(value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <Grid container spacing={2}>
          {filteredCrops.length === 0 ? (
            <p>No crops found.</p>
          ) : (
            filteredCrops.map((crop) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={crop.id}>
                <div
                  style={styles.productCard}
                  onClick={() => handleProductClick(crop)}
                >
                  <img
                    src={crop.imageUrl || "defaultImage.jpg"}
                    alt={crop.cropName}
                    style={styles.productImage}
                  />
                  <div style={styles.productDetails}>
                    <h3 style={styles.productTitle}>{crop.cropName}</h3>
                    <p style={styles.productPrice}>{formatCurrency(crop.projectedProduction)}</p>
                  </div>
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={true} onClose={handleCloseProductDialog}>
          <DialogTitle>{selectedProduct.cropName}</DialogTitle>
          <DialogContent>
            <img
              src={selectedProduct.imageUrl || "defaultImage.jpg"}
              alt={selectedProduct.cropName}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <p>Price: {formatCurrency(selectedProduct.projectedProduction)}</p>
            <p>{selectedProduct.description || "No description available."}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBuyNowClick} color="primary">
              Buy Now
            </Button>
            <Button onClick={handleCloseProductDialog} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Wallet Modal */}
      <Dialog
  open={walletDialogOpen}
  onClose={handleCloseWalletDialog}
  PaperProps={{
    style: {
      width: '700px', // Set the width to a specific value or use a percentage, e.g., '80%'
      maxWidth: '100%', // Ensures it doesn't exceed the viewport width
      height: 'auto', // Can be adjusted as needed
      position: 'absolute', // Change to 'fixed' for fixed positioning
      top: '3%', // Adjust as needed to move the dialog vertically
      left: '70%', // Centers the dialog horizontally
      transform: 'translate(-50%, 0)', // Ensures the dialog is centered
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Optional: adds shadow for better visibility
    }
  }}
>
  <DialogTitle>Pay Via for {selectedProduct?.cropName}</DialogTitle>
  <DialogContent style={styles.walletDialogContent}>
    <img
      src="https://agri-nexus.online/assets/templates/basic/images/wallet.png"
      alt="Wallet"
      style={styles.walletImage}
    />
    <h4 style={styles.walletText}>Wallet</h4>
    <p style={styles.walletText}>
      Payment completed instantly with one click if sufficient balance is available.
    </p>

    <p>Your wallet balance is {formatCurrency(5000)}.</p>
    <p>
      {5000 >= selectedProduct?.projectedProduction
        ? "You have enough balance to buy this product."
        : "Insufficient balance. Please add funds."}
    </p>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseWalletDialog} color="primary">
      Close
    </Button>
    {5000 >= selectedProduct?.projectedProduction && (
      <Button color="secondary">Confirm Purchase</Button>
    )}
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Inventory;
