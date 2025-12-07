import React, { useState } from 'react';
import Header from './components/Header';
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

function App() { 
  const [userInput, setUserInput] = useState({ ...DEFAULT_INPUTS });
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const handleInputChange = (field, value) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleReset = () => {
    setUserInput({ ...DEFAULT_INPUTS });
    setCurrency(DEFAULT_CURRENCY);
  };

  return (
    <>
      <h1>&emsp;React Investment Calculator</h1>
      <Header />
      <UserInput 
        userInput={userInput}
        onInputChange={handleInputChange}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        onReset={handleReset}
      />
      <OutputData inputValue={userInput} currency={currency} />
    </>
  );
}

export default App;
