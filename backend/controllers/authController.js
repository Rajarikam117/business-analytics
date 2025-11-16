// Since we're not connecting to MongoDB, we'll use a simple in-memory store for demo purposes
const users = new Map();

// Generate a simple token (in a real app, you would use JWT)
const generateToken = (id) => {
  return Buffer.from(`user_${id}`).toString('base64');
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    if (users.has(username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      password, // In a real app, you would hash this
      businessType: '',
      customBusinessType: ''
    };

    users.set(username, user);

    res.status(201).json({
      _id: user.id,
      username: user.username,
      businessType: user.businessType,
      customBusinessType: user.customBusinessType,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for user
    const user = users.get(username);

    if (user && user.password === password) {
      res.json({
        _id: user.id,
        username: user.username,
        businessType: user.businessType,
        customBusinessType: user.customBusinessType,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // In a real app, you would get the user from the token
    // For this demo, we'll just return a generic profile
    res.json({
      _id: 'demo_user',
      username: 'demo',
      businessType: '',
      customBusinessType: ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update business type
// @route   PUT /api/auth/business-type
// @access  Private
const updateBusinessType = async (req, res) => {
  try {
    const { businessType, customBusinessType } = req.body;

    // In a real app, you would update the user in the database
    // For this demo, we'll just return the updated data
    res.json({
      _id: 'demo_user',
      username: 'demo',
      businessType,
      customBusinessType: customBusinessType || '',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateBusinessType,
};