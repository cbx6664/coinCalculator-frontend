import React from "react";

const ResultDisplay = ({ result }) => {
    if (result.length === 0) {
        return null;
    }

    return (
        <div className="result-display">
            <h3>Calculation Result:</h3>
            <ul>
                {result.map((coin, index) => (
                    <li key={index}>{coin.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResultDisplay;
