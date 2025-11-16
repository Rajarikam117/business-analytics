import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageService from '../services/storageService';
import { calculateProfit, formatCurrency } from '../utils/calculations';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCost, setProductCost] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [unitsSoldToday, setUnitsSoldToday] = useState('');
  const [advertisingCost, setAdvertisingCost] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = StorageService.getProducts();
    setProducts(savedProducts);
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    StorageService.saveProducts(products);
  }, [products]);

  const handleAddProduct = () => {
    if (!productName || !productCost || !productPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      name: productName,
      cost: parseFloat(productCost),
      price: parseFloat(productPrice),
      unitsSoldToday: parseInt(unitsSoldToday) || 0,
      advertisingCost: parseFloat(advertisingCost) || 0,
      salesData: [] // Will store historical sales data
    };

    const addedProduct = StorageService.addProduct(newProduct);
    setProducts([...products, addedProduct]);
    resetForm();
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductCost(product.cost);
    setProductPrice(product.price);
    setUnitsSoldToday(product.unitsSoldToday);
    setAdvertisingCost(product.advertisingCost);
    setEditingProductId(product.id);
  };

  const handleUpdateProduct = () => {
    if (!productName || !productCost || !productPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedProduct = {
      id: editingProductId,
      name: productName,
      cost: parseFloat(productCost),
      price: parseFloat(productPrice),
      unitsSoldToday: parseInt(unitsSoldToday) || 0,
      advertisingCost: parseFloat(advertisingCost) || 0,
      salesData: []
    };

    StorageService.updateProduct(updatedProduct);
    const updatedProducts = products.map(product => 
      product.id === editingProductId ? updatedProduct : product
    );

    setProducts(updatedProducts);
    resetForm();
  };

  const handleDeleteProduct = (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      StorageService.deleteProduct(productId);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductCost('');
    setProductPrice('');
    setUnitsSoldToday('');
    setAdvertisingCost('');
    setEditingProductId(null);
  };

  const goToAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="product-management-container">
      <div className="product-management-header">
        <h2>Product Management</h2>
        <button className="analytics-button" onClick={goToAnalytics}>
          View Analytics Dashboard
        </button>
      </div>

      <div className="product-form">
        <h3>{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="productCost">Cost Per Unit ($):</label>
            <input
              type="number"
              id="productCost"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="productPrice">Selling Price ($):</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="unitsSoldToday">Units Sold Today:</label>
            <input
              type="number"
              id="unitsSoldToday"
              value={unitsSoldToday}
              onChange={(e) => setUnitsSoldToday(e.target.value)}
              placeholder="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="advertisingCost">Advertising Cost ($):</label>
            <input
              type="number"
              id="advertisingCost"
              value={advertisingCost}
              onChange={(e) => setAdvertisingCost(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="form-actions">
          {editingProductId ? (
            <>
              <button className="update-button" onClick={handleUpdateProduct}>
                Update Product
              </button>
              <button className="cancel-button" onClick={resetForm}>
                Cancel
              </button>
            </>
          ) : (
            <button className="add-button" onClick={handleAddProduct}>
              Add Product
            </button>
          )}
        </div>
      </div>

      <div className="products-list">
        <h3>Products List</h3>
        {products.length === 0 ? (
          <p>No products added yet. Add your first product above.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Cost</th>
                <th>Price</th>
                <th>Units Sold Today</th>
                <th>Advertising Cost</th>
                <th>Profit Today</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{formatCurrency(product.cost)}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.unitsSoldToday}</td>
                  <td>{formatCurrency(product.advertisingCost)}</td>
                  <td>{formatCurrency(calculateProfit(product.price, product.cost, product.unitsSoldToday, product.advertisingCost))}</td>
                  <td>
                    <button 
                      className="edit-button" 
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductManagementPage;