// In-memory storage for products (demo purposes only)
const products = new Map();

// Generate unique ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// @desc    Get all products for a user
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
  try {
    // In a real app, you would filter by user ID
    // For this demo, we'll return all products
    const allProducts = Array.from(products.values());
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res) => {
  try {
    const product = products.get(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { name, cost, price, unitsSoldToday, advertisingCost } = req.body;

    const product = {
      _id: generateId(),
      name,
      cost: parseFloat(cost),
      price: parseFloat(price),
      unitsSoldToday: parseInt(unitsSoldToday) || 0,
      advertisingCost: parseFloat(advertisingCost) || 0,
      user: 'demo_user', // In a real app, this would be the actual user ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.set(product._id, product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const { name, cost, price, unitsSoldToday, advertisingCost } = req.body;

    const product = products.get(req.params.id);

    if (product) {
      // Update product fields
      product.name = name || product.name;
      product.cost = cost !== undefined ? parseFloat(cost) : product.cost;
      product.price = price !== undefined ? parseFloat(price) : product.price;
      product.unitsSoldToday = unitsSoldToday !== undefined ? parseInt(unitsSoldToday) || 0 : product.unitsSoldToday;
      product.advertisingCost = advertisingCost !== undefined ? parseFloat(advertisingCost) || 0 : product.advertisingCost;
      product.updatedAt = new Date().toISOString();

      products.set(product._id, product);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = products.get(req.params.id);

    if (product) {
      products.delete(req.params.id);
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product analytics
// @route   GET /api/products/analytics
// @access  Private
const getProductAnalytics = async (req, res) => {
  try {
    const allProducts = Array.from(products.values());
    
    // Calculate total revenue
    const totalRevenue = allProducts.reduce((sum, product) => sum + (product.price * product.unitsSoldToday), 0);
    
    // Calculate total profit
    const totalProfit = allProducts.reduce((sum, product) => 
      sum + ((product.price - product.cost) * product.unitsSoldToday - product.advertisingCost), 0);
    
    // Calculate total advertising cost
    const totalAdCost = allProducts.reduce((sum, product) => sum + product.advertisingCost, 0);
    
    // Prepare data for charts
    const profitData = allProducts.map(product => ({
      name: product.name,
      profit: (product.price - product.cost) * product.unitsSoldToday - product.advertisingCost
    }));
    
    const salesData = allProducts.map(product => ({
      name: product.name,
      units: product.unitsSoldToday
    }));
    
    const revenueData = allProducts.map(product => ({
      name: product.name,
      revenue: product.price * product.unitsSoldToday
    }));

    res.json({
      summary: {
        totalRevenue,
        totalProfit,
        totalAdCost,
        productCount: allProducts.length
      },
      charts: {
        profitData,
        salesData,
        revenueData
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics
};