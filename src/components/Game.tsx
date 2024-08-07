"use client";
import React, { useState, useEffect, useRef } from 'react'

export default function Game() {

  const [multiplier, setMultiplier] = useState(1);
  const [isBusted, setIsBusted] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [lastBust, setLastBust] = useState(0);
  const [message, setMessage] = useState('');
  const animationRef = useRef<number>();

  const bustPoint = useRef(Math.floor(Math.random() * 5) + 2);

  useEffect(() => {
    startGame();
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  const startGame = () => {
    setMultiplier(1);
    setIsBusted(false);
    bustPoint.current = Math.floor(Math.random() * 5) + 2;
    animate();
  };

  const animate = () => {
    setMultiplier(prev => {
      const newValue = prev * 1.000001; // Adjust this for faster/slower growth
      if (newValue >= bustPoint.current) {
        setIsBusted(true);
        setLastBust(newValue);
        return newValue;
      }
      animationRef.current = requestAnimationFrame(animate);
      return newValue;
    });
  };

  const handleGuess = () => {
    const guessValue = parseFloat(guessInput);
    if (guessValue > lastBust) {
      setMessage(`YOU WOULD HAVE MULTIPLIED YOUR WAGER BY ${guessValue.toFixed(2)}X BUT COULD OF MULTIPLIED IT BY ${lastBust.toFixed(2)}X!`);
    } else {
      setMessage(`YOU WOULD HAVE MULTIPLIED YOUR WAGER BY 0.00X BUT COULD OF MULTIPLIED IT BY ${lastBust.toFixed(2)}X!`);
    }
  }

  return (
    <div style={{ backgroundColor: '#282c34', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#8a94b8' }}>Try it Out:</h2>
      <div style={{ fontSize: '48px', color: isBusted ? 'red' : '#4caf50', marginBottom: '20px' }}>
        {multiplier.toFixed(2)}x
      </div>
      {isBusted && (
        <>
          <div>GUESS A MULTIPLIER:</div>
          <input
            type="number"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            style={{ margin: '10px', padding: '5px' }}
          />
          <button onClick={handleGuess} style={{ backgroundColor: '#5c6bc0', color: 'white', padding: '5px 10px' }}>
            Guess
          </button>
          <div>{message}</div>
          <button onClick={startGame} style={{ marginTop: '20px', backgroundColor: '#4caf50', color: 'white', padding: '10px 20px' }}>
            Play Again
          </button>
        </>
      )}
    </div>
  )
}