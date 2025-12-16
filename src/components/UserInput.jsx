import React, { useEffect, useState } from 'react';
import '../App.css';
import '../Index.css';

const UserInput = ({ userInput, onInputChange, currency, onCurrencyChange, onReset, viewMode, onViewModeChange }) => {
  const [errorMessage, setErrorMessage] = useState('');

  // Validation: check values from userInput
  const isValid =
    userInput.initialInvestment > 0 &&
    userInput.annualInvestment > 0 &&
    userInput.expectedReturn > 0 &&
    userInput.duration > 0;

  // Update error message whenever validity changes
  useEffect(() => {
    if (!isValid) {
      setErrorMessage('Please enter valid positive numbers for all fields.');
      console.error('Validation failed: Please enter valid positive numbers for all fields.');
    } else {
      setErrorMessage(''); // clear the message when valid
      console.error('');
    }
  }, [isValid]);

  const handleChange = (field, rawValue) => {
    if (rawValue === "" || rawValue == null) {
      onInputChange(field, null);
    } else {
      const parsed = Number(rawValue);
      onInputChange(field, Number.isNaN(parsed) ? null : parsed);
    }
  };

  return (
    <section id="user-input">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Validation message */}
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errorMessage}
          </p>
        )}

        {/* Currency selection */}
        <div className="input-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
          >
            <option value="GBP">GBP £</option>
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
          </select>
        </div>

        {/* Initial Investment input */}
        <div className="input-group">
          <label htmlFor="initial-investment">Initial Investment ({currency})</label>
          <input
            type="number"
            id="initial-investment"
            min="0"
            step="1"
            value={userInput.initialInvestment ?? ""}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
          />
        </div>

        {/* Annual Investment input */}
        <div className="input-group">
          <label htmlFor="annual-investment">Annual Investment ({currency})</label>
          <input
            type="number"
            id="annual-investment"
            min="0"
            step="1"
            value={userInput.annualInvestment ?? ""}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </div>

        {/* Expected Return input */}
        <div className="input-group">
          <label htmlFor="expected-return">Expected Return (%)</label>
          <input
            type="number"
            id="expected-return"
            min="0"
            step="0.1"
            value={userInput.expectedReturn ?? ""}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
        </div>

        {/* Duration input */}
        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input
            type="number"
            id="duration"
            min="1"
            step="1"
            value={userInput.duration ?? ""}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="input-group controls">
          {/* Reset button */}
          <button type="button" onClick={onReset}>
            Reset
          </button>

          {/* Yearly view button */}
          <button 
            type="button" 
            onClick={() => onViewModeChange('yearly')}
            // Highlight the active button
            className={`button small-button ${viewMode === 'yearly' ? 'active-toggle' : 'secondary-button'}`}
          >
            Yearly
          </button>

          <button 
            type="button" 
            onClick={() => onViewModeChange('monthly')}
            // Highlight the active button
            className={`button small-button ${viewMode === 'monthly' ? 'active-toggle' : 'secondary-button'}`}
          >
            Monthly
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserInput;