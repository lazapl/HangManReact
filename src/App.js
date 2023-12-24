import React, { useState, useEffect } from 'react';

const Wisielec = () => {
  const words = ['XD', 'LOL'];
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [hiddenWord, setHiddenWord] = useState('');
  const [attempts, setAttempt] = useState(6);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setHiddenWord(words[randomIndex]);
  }, []);

  const visibilityOfWord = () => {
    return hiddenWord.split('').map((letter) => (guessedLetter.includes(letter) ? letter : '_')).join(' ');
  }

  const handleClick = (letter) => {
    if (guessedLetter.includes(letter)) return
    if (!hiddenWord.includes(letter)) {
      setAttempt(attempts - 1);
    }
    setGuessedLetter([...guessedLetter, letter]);
  }

  const isGameWon = () => !visibilityOfWord().includes('_');
  const isGameLost = () => attempts === 0;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#333' }}>HangMan</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>{visibilityOfWord()}</h2>
      <p>Pozostało ci jeszcze {attempts} prób</p>

      {isGameWon() && <p style={{ color: 'green' }}>Odgadłeś hasło!</p>}
      {isGameLost() && <p style={{ color: 'red' }}>Przegrałeś!</p>}

      {isGameWon() || isGameLost() ? (
        <button
          style={{ marginTop: '20px', padding: '10px 15px', fontSize: '16px', cursor: 'pointer' }}
          onClick={() => window.location.reload()}
        >
          Zagraj ponownie
        </button>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)).map((letter) => (
            <button
              key={letter}
              style={{
                marginRight: '10px',
                padding: '8px 12px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: guessedLetter.includes(letter) ? '#ccc' : '#fff',
              }}
              onClick={() => handleClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wisielec;