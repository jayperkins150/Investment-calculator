import React from 'react';
import '../App.css';
import '../Index.css';

const UserInput = ({ userInput, onInputChange, currency, onCurrencyChange, onReset }) => {
  if (!userInput) {
    return <p>No input available.</p>;
  }

  // Validation
  const isValid =
    typeof userInput.initialInvestment === "number" && userInput.initialInvestment > 0 &&
    typeof userInput.annualInvestment === "number" && userInput.annualInvestment > 0 &&
    typeof userInput.expectedReturn === "number" && userInput.expectedReturn > 0 &&
    typeof userInput.duration === "number" && userInput.duration > 0;

  // Handle input changes
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
      {/* Input fields */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Validation message */}
        {!isValid && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Please enter valid positive numbers for all fields.
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

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
        >
          Reset
        </button>
      </form> 
    </section>
  );
};

export default UserInput;
