import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageService from '../services/storageService';
import businessTypes from '../data/businessTypes';

const BusinessTypePage = () => {
  const [businessType, setBusinessType] = useState('');
  const [customType, setCustomType] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    // Save business type to localStorage for now
    const type = businessType === 'other' ? customType : businessType;
    StorageService.setBusinessType(type);
    navigate('/products');
  };

  return (
    <div className="business-type-container">
      <div className="business-type-form">
        <h2>Select Your Business Type</h2>
        <div className="business-type-options">
          {businessTypes.map(type => (
            <div 
              key={type.id}
              className={`business-type-option ${businessType === type.id ? 'selected' : ''}`}
              onClick={() => setBusinessType(type.id)}
            >
              <h3>{type.name}</h3>
              <p>{type.description}</p>
            </div>
          ))}
          
          <div 
            className={`business-type-option ${businessType === 'other' ? 'selected' : ''}`}
            onClick={() => setBusinessType('other')}
          >
            <h3>Other</h3>
            <p>Enter business type manually</p>
          </div>
        </div>
        
        {businessType === 'other' && (
          <div className="custom-type-input">
            <label htmlFor="customType">Enter Business Type:</label>
            <input
              type="text"
              id="customType"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              placeholder="e.g., E-commerce, Consulting, etc."
            />
          </div>
        )}
        
        <button 
          className="continue-button" 
          onClick={handleContinue}
          disabled={!businessType || (businessType === 'other' && !customType)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BusinessTypePage;