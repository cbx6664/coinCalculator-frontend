import React, { useState } from "react";

const CoinCalculatorForm = ({ onCalculate }) => {
    const [targetAmount, setTargetAmount] = useState("");
    const [denominations, setDenominations] = useState("");
    const [error, setError] = useState("");
    const validDenominations = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // 清除之前的错误

        const parsedTargetAmount = parseFloat(targetAmount);
        const parsedDenominations = denominations
            .split(",")
            .map((coin) => parseFloat(coin.trim()))
            .filter((coin) => !isNaN(coin));

        // 验证目标金额范围
        if (isNaN(parsedTargetAmount) || parsedTargetAmount < 0 || parsedTargetAmount > 10000) {
            setError("Target amount must be a number between 0 and 10,000.00.");
            return;
        }

        // 验证硬币面额是否合法
        const invalidDenominations = parsedDenominations.filter(
            (coin) => !validDenominations.includes(coin)
        );
        if (invalidDenominations.length > 0) {
            setError(`Invalid coin denominations: ${invalidDenominations.join(", ")}`);
            return;
        }

        // 如果没有错误，调用计算函数
        onCalculate(parsedTargetAmount, parsedDenominations);
    };

    return (
        <form className="calculator-form" onSubmit={handleSubmit}>
            {/* 错误信息 */}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label htmlFor="targetAmount">Target Amount:</label>
                <input
                    type="number"
                    id="targetAmount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="Enter a number between 0 and 10,000.00"
                    required
                    step="0.01"
                />
                <small>Must be between 0 and 10,000.00</small>
            </div>

            <div className="form-group">
                <label htmlFor="denominations">Coin Denominations:</label>
                <input
                    type="text"
                    id="denominations"
                    value={denominations}
                    onChange={(e) => setDenominations(e.target.value)}
                    placeholder="Enter valid denominations separated by commas"
                    required
                />
                <small>Valid denominations: {validDenominations.join(", ")}</small>
            </div>

            <button type="submit">Calculate</button>
        </form>
    );
};

export default CoinCalculatorForm;
