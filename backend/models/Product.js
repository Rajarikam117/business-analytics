const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  unitsSoldToday: {
    type: Number,
    default: 0,
    min: 0
  },
  advertisingCost: {
    type: Number,
    default: 0,
    min: 0
  },
  salesData: [{
    date: {
      type: Date,
      default: Date.now
    },
    unitsSold: {
      type: Number,
      default: 0,
      min: 0
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Calculate profit method
productSchema.methods.calculateProfit = function() {
  return (this.price - this.cost) * this.unitsSoldToday - this.advertisingCost;
};

// Calculate revenue method
productSchema.methods.calculateRevenue = function() {
  return this.price * this.unitsSoldToday;
};

module.exports = mongoose.model('Product', productSchema);