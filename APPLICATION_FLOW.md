# Application Flow

## User Journey

### 1. Initial Access
- User opens the application in a web browser
- Landing page shows the Login screen

### 2. Authentication
- User enters any username and password (demo mode)
- System validates credentials (always passes in demo mode)
- User is redirected to Business Type Selection page

### 3. Business Type Selection
- User selects one of the predefined business types:
  - Retail
  - Product Based
  - Service Based
- User can also select "Other" to enter a custom business type
- Selection is saved to localStorage
- User is redirected to Product Management page

### 4. Product Management
- User can view existing products (if any)
- User can add new products by filling out the form:
  - Product Name
  - Cost Per Unit
  - Selling Price
  - Units Sold Today
  - Advertising Cost
- User can edit existing products
- User can delete products
- All product data is saved to localStorage
- User can navigate to Analytics Dashboard

### 5. Analytics Dashboard
- Dashboard displays financial summary cards:
  - Total Revenue
  - Total Profit
  - Total Advertising Spend
  - Total Products
- Interactive charts visualize product performance:
  - Profit by Product (Bar Chart)
  - Sales Distribution (Pie Chart)
  - Revenue by Product (Line Chart)
- Time range selector allows filtering data by:
  - Daily
  - Weekly
  - Monthly
  - Yearly
- AI Recommendations section provides product-specific advice:
  - High-performing products (Green)
  - Products needing attention (Yellow)
  - Underperforming products (Red)
- User can navigate back to Product Management

## Component Architecture

### LoginPage
- Handles user authentication
- Redirects to BusinessTypePage on successful login

### BusinessTypePage
- Displays business type options
- Handles business type selection
- Saves selection to localStorage
- Redirects to ProductManagementPage

### ProductManagementPage
- Displays product list
- Handles product creation, editing, and deletion
- Saves product data to localStorage
- Provides navigation to AnalyticsDashboard

### AnalyticsDashboard
- Displays financial summaries
- Renders interactive charts
- Provides AI recommendations
- Provides navigation back to ProductManagementPage

## Data Flow

### Storage
- All data is stored in browser localStorage
- Business type is stored with key "businessType"
- Products are stored as an array with key "products"

### Product Data Structure
```javascript
{
  id: Number,              // Unique identifier
  name: String,            // Product name
  cost: Number,            // Cost per unit
  price: Number,           // Selling price
  unitsSoldToday: Number,  // Units sold today
  advertisingCost: Number, // Advertising cost
  salesData: Array         // Historical sales data (reserved for future use)
}
```

## State Management

### React State
- Component-level state for form inputs
- Product list state in ProductManagementPage and AnalyticsDashboard
- Time range selection state in AnalyticsDashboard

### Navigation State
- React Router manages page navigation
- Routes:
  - "/" → LoginPage
  - "/business-type" → BusinessTypePage
  - "/products" → ProductManagementPage
  - "/analytics" → AnalyticsDashboard

## Business Logic

### Calculations
- Profit = (Price - Cost) * Units Sold - Advertising Cost
- Revenue = Price * Units Sold
- ROI = (Profit / Advertising Cost) * 100
- Profit Margin = ((Price - Cost) / Price) * 100

### AI Recommendations
- Products with negative profit receive discontinuation recommendations
- Products with ROI < 50% receive optimization recommendations
- Products with ROI >= 50% receive growth recommendations

## Error Handling

### Form Validation
- Required fields must be filled
- Numeric fields must contain valid numbers
- Alert messages for validation errors

### Data Persistence
- localStorage operations are wrapped in try/catch blocks
- Graceful handling of storage errors

### User Actions
- Confirmation dialogs for destructive actions (product deletion)
- Success feedback for completed actions

## Responsive Design

### Layout
- Flexible grid layouts adapt to different screen sizes
- Mobile-friendly form layouts
- Responsive chart sizing

### Breakpoints
- Desktop: 1200px and above
- Tablet: 768px to 1199px
- Mobile: Below 768px

## Accessibility

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order follows visual layout

### Screen Readers
- Semantic HTML elements
- Proper labeling of form controls
- ARIA attributes where needed

## Performance Considerations

### Data Loading
- Efficient localStorage operations
- Minimal re-renders through React.memo and useCallback

### Chart Rendering
- Virtualized chart rendering for large datasets
- Lazy loading of chart components

### Memory Management
- Cleanup of event listeners
- Proper unmounting of components