import React, { useState } from 'react';
import { Header } from './components/Header';
import UserInput from './components/UserInput';
import OutputData from './components/OutputData';
import './App.css'

const DEFAULT_INPUTS = {
  initialInvestment: 10000,
  annualInvestment: 1000,
  expectedReturn: 7,
  duration: 20
};
const DEFAULT_CURRENCY = "GBP";
const DEFAULT_VIEW = 'yearly';

function App() { 
  const [userInput, setUserInput] = useState({ ...DEFAULT_INPUTS });
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [viewMode, setViewMode] = useState(DEFAULT_VIEW);

  const handleInputChange = (field, value) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
  };

  const handleReset = () => {
    setUserInput({ ...DEFAULT_INPUTS });
    setCurrency(DEFAULT_CURRENCY);
    // Reset view mode
    setViewMode(DEFAULT_VIEW); 
  };

  return (
    <>
      <h1>React Investment Calculator</h1>
      <Header />
      <UserInput 
        userInput={userInput}
        onInputChange={handleInputChange}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        onReset={handleReset}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      <OutputData userInput={userInput} currency={currency} viewMode={viewMode} />
    </>
  );
}

export default App;
