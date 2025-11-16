import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StorageService from '../services/storageService';
import { calculateProfit, calculateRevenue, calculateROIPercentage, formatCurrency } from '../utils/calculations';

const AnalyticsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [timeRange, setTimeRange] = useState('daily');
  const navigate = useNavigate();

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = StorageService.getProducts();
    setProducts(savedProducts);
  }, []);

  const goToProducts = () => {
    navigate('/products');
  };

  // Calculate total profit
  const calculateTotalProfit = () => {
    return products.reduce((total, product) => {
      const profit = calculateProfit(product.price, product.cost, product.unitsSoldToday, product.advertisingCost);
      return total + profit;
    }, 0);
  };

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    return products.reduce((total, product) => {
      return total + calculateRevenue(product.price, product.unitsSoldToday);
    }, 0);
  };

  // Calculate total advertising cost
  const calculateTotalAdCost = () => {
    return products.reduce((total, product) => {
      return total + product.advertisingCost;
    }, 0);
  };

  // Prepare data for charts
  const prepareProfitData = () => {
    return products.map(product => ({
      name: product.name,
      profit: calculateProfit(product.price, product.cost, product.unitsSoldToday, product.advertisingCost)
    }));
  };

  const prepareSalesData = () => {
    return products.map(product => ({
      name: product.name,
      units: product.unitsSoldToday
    }));
  };

  const prepareRevenueData = () => {
    return products.map(product => ({
      name: product.name,
      revenue: calculateRevenue(product.price, product.unitsSoldToday)
    }));
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h2>Business Analytics Dashboard</h2>
        <button className="back-button" onClick={goToProducts}>
          Back to Products
        </button>
      </div>

      <div className="dashboard-controls">
        <div className="time-range-selector">
          <label>Time Range: </label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>{formatCurrency(calculateTotalRevenue())}</p>
        </div>
        <div className="summary-card">
          <h3>Total Profit</h3>
          <p>{formatCurrency(calculateTotalProfit())}</p>
        </div>
        <div className="summary-card">
          <h3>Total Ad Spend</h3>
          <p>{formatCurrency(calculateTotalAdCost())}</p>
        </div>
        <div className="summary-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Profit by Product</h3>
          <BarChart
            width={500}
            height={300}
            data={prepareProfitData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="profit" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart-container">
          <h3>Sales Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={prepareSalesData()}
              cx={200}
              cy={150}
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="units"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {prepareSalesData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="chart-container">
          <h3>Revenue by Product</h3>
          <LineChart
            width={500}
            height={300}
            data={prepareRevenueData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>

      {/* AI Suggestions Section */}
      <div className="ai-suggestions">
        <h3>AI Recommendations</h3>
        <div className="suggestions-container">
          {products.length > 0 ? (
            products.map(product => {
              const profit = calculateProfit(product.price, product.cost, product.unitsSoldToday, product.advertisingCost);
              const roi = calculateROIPercentage(profit, product.advertisingCost);
              
              return (
                <div key={product.id} className="suggestion-card">
                  <h4>{product.name}</h4>
                  <p>Current Profit: {formatCurrency(profit)}</p>
                  <p>ROI: {roi.toFixed(2)}%</p>
                  
                  {profit < 0 ? (
                    <div className="recommendation negative">
                      <p>⚠️ This product is currently losing money. Consider:</p>
                      <ul>
                        <li>Increasing the selling price</li>
                        <li>Reducing production costs</li>
                        <li>Decreasing advertising spend</li>
                        <li>Discontinuing this product</li>
                      </ul>
                    </div>
                  ) : roi < 50 ? (
                    <div className="recommendation warning">
                      <p>🔔 Low ROI detected. Consider:</p>
                      <ul>
                        <li>Optimizing advertising channels</li>
                        <li>Adjusting pricing strategy</li>
                        <li>Improving product features</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="recommendation positive">
                      <p>✅ This product is performing well!</p>
                      <ul>
                        <li>Consider increasing marketing budget</li>
                        <li>Explore upselling opportunities</li>
                        <li>Maintain current strategy</li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No products available for analysis. Add products to see recommendations.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;