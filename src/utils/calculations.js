// Utility functions for financial calculations

export const calculateProfit = (price, cost, unitsSold, advertisingCost = 0) => {
  return (price - cost) * unitsSold - advertisingCost;
};

export const calculateRevenue = (price, unitsSold) => {
  return price * unitsSold;
};

export const calculateROIPercentage = (profit, investment) => {
  if (investment <= 0) return 0;
  return (profit / investment) * 100;
};

export const calculateProfitMargin = (price, cost) => {
  if (price <= 0) return 0;
  return ((price - cost) / price) * 100;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Time period calculations
export const getTimePeriodFilter = (period) => {
  const now = new Date();
  
  switch (period) {
    case 'daily':
      return now.toISOString().split('T')[0];
    case 'weekly':
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return weekAgo.toISOString().split('T')[0];
    case 'monthly':
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      return monthAgo.toISOString().split('T')[0];
    case 'yearly':
      const yearAgo = new Date(now);
      yearAgo.setFullYear(now.getFullYear() - 1);
      return yearAgo.toISOString().split('T')[0];
    default:
      return now.toISOString().split('T')[0];
  }
};