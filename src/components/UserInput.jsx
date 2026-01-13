import React, { useMemo, useState } from "react";
import "../App.css";
import "../Index.css";

const UserInput = ({
  userInput,
  onInputChange,
  currency,
  onCurrencyChange,
  onReset,
  viewMode,
  onViewModeChange,
}) => {
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (field, rawValue) => {
    if (rawValue === "" || rawValue == null) {
      onInputChange(field, null);
    } else {
      const parsed = Number(rawValue);
      onInputChange(field, Number.isNaN(parsed) ? null : parsed);
    }
  };

  // Field-level validation rules
  const errors = useMemo(() => {
    const e = {};

    const initial = userInput.initialInvestment;
    const annual = userInput.annualInvestment;
    const ret = userInput.expectedReturn;
    const dur = userInput.duration;

    if (initial == null || initial === "") e.initialInvestment = "Initial investment is required.";
    else if (initial <= 0) e.initialInvestment = "Must be greater than 0.";

    if (annual == null || annual === "") e.annualInvestment = "Annual investment is required.";
    else if (annual <= 0) e.annualInvestment = "Must be greater than 0.";

    if (ret == null || ret === "") e.expectedReturn = "Expected return is required.";
    else if (ret <= 0) e.expectedReturn = "Must be greater than 0.";

    if (dur == null || dur === "") e.duration = "Duration is required.";
    else if (dur < 1) e.duration = "Must be at least 1 year.";

    return e;
  }, [userInput]);

  const showError = (field) => submitAttempted || touched[field];
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleReset = () => {
    onReset();
    setTouched({});
    setSubmitAttempted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) return;
  };

  const onRadioKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") onViewModeChange("yearly");
    if (e.key === "ArrowRight" || e.key === "ArrowDown") onViewModeChange("monthly");
  };

  return (
    <section id="user-input">
      <form onSubmit={handleSubmit}>
        {/* Summary message after submit attempt */}
        {submitAttempted && !isValid && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Please fix the highlighted fields.
          </p>
        )}

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

        <div className="input-group">
          <label htmlFor="initial-investment">Initial Investment ({currency})</label>
          <input
            type="number"
            id="initial-investment"
            min="0"
            step="1"
            value={userInput.initialInvestment ?? ""}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
            onBlur={() => handleBlur("initialInvestment")}
            aria-invalid={!!errors.initialInvestment}
            aria-describedby="initial-investment-error"
          />
          {showError("initialInvestment") && errors.initialInvestment && (
            <small id="initial-investment-error" style={{ color: "red" }}>
              {errors.initialInvestment}
            </small>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="annual-investment">Annual Investment ({currency})</label>
          <input
            type="number"
            id="annual-investment"
            min="0"
            step="1"
            value={userInput.annualInvestment ?? ""}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
            onBlur={() => handleBlur("annualInvestment")}
            aria-invalid={!!errors.annualInvestment}
            aria-describedby="annual-investment-error"
          />
          {showError("annualInvestment") && errors.annualInvestment && (
            <small id="annual-investment-error" style={{ color: "red" }}>
              {errors.annualInvestment}
            </small>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="expected-return">Expected Return (%)</label>
          <input
            type="number"
            id="expected-return"
            min="0"
            step="0.1"
            value={userInput.expectedReturn ?? ""}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
            onBlur={() => handleBlur("expectedReturn")}
            aria-invalid={!!errors.expectedReturn}
            aria-describedby="expected-return-error"
          />
          {showError("expectedReturn") && errors.expectedReturn && (
            <small id="expected-return-error" style={{ color: "red" }}>
              {errors.expectedReturn}
            </small>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input
            type="number"
            id="duration"
            min="1"
            step="1"
            value={userInput.duration ?? ""}
            onChange={(e) => handleChange("duration", e.target.value)}
            onBlur={() => handleBlur("duration")}
            aria-invalid={!!errors.duration}
            aria-describedby="duration-error"
          />
          {showError("duration") && errors.duration && (
            <small id="duration-error" style={{ color: "red" }}>
              {errors.duration}
            </small>
          )}
        </div>

        <div className="input-group controls">
          <button type="button" onClick={handleReset}>
            Reset
          </button>

          <div role="radiogroup" aria-label="Time period" onKeyDown={onRadioKeyDown}>
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === "yearly"}
              onClick={() => onViewModeChange("yearly")}
            >
              Yearly
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={viewMode === "monthly"}
              onClick={() => onViewModeChange("monthly")}
            >
              Monthly
            </button>
          </div>

          {/* Force validation on action */}
          <button type="submit" disabled={!isValid}>Calculate</button>
        </div>
      </form>
    </section>
  );
};

export default UserInput;
