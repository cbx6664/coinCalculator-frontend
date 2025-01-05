import React, {useState} from "react";
import CoinCalculatorForm from "./components/CoinCalculatorForm";
import ResultDisplay from "./components/ResultDisplay";
import "./styles/App.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
    const [result, setResult] = useState([]);
    const [error, setError] = useState("");

    const calculateCoins = async (targetAmount, denominations) => {
        setError("");
        setResult([]);
        try {
            const response = await fetch(`${API_BASE_URL}/coins`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    targetAmount,
                    coinDenominations: denominations,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong.");
            }

            const data = await response.json();
            setResult(data.coins);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Coin Calculator</h1>
                <p>Calculate the minimum number of coins for a target amount</p>
            </header>
            <main>
                <CoinCalculatorForm onCalculate={calculateCoins}/>
                {error && <div className="error-message">{error}</div>}
                <ResultDisplay result={result}/>
            </main>
        </div>
    );
};

export default App;
