import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BusinessTypePage from './pages/BusinessTypePage';
import ProductManagementPage from './pages/ProductManagementPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/business-type" element={<BusinessTypePage />} />
          <Route path="/products" element={<ProductManagementPage />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;