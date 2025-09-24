import React, { useState } from 'react';

const emojis = [
  "😎", "🤓", "😒", "🦒", "😺", "🌲", "😶‍🌫️", "😍", "🐶", 
  "🕺", "😁", "🦆", "🦢", "😶", "🤩", "🌟", "🪨", "🌞", "🌚"
];

const EmojiSelection = () => {
  const [player1Emoji, setPlayer1Emoji] = useState(null);
  const [player2Emoji, setPlayer2Emoji] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleConfirm = () => {
    if (!selectedEmoji) {
      alert('Selecione seu Emoji');
      return;
    }

    if (currentPlayer === 1) {
      setPlayer1Emoji(selectedEmoji);
      setCurrentPlayer(2);
      setSelectedEmoji(null);
    } else {
      if (selectedEmoji === player1Emoji) {
        alert('Os emojis não podem ser iguais😒');
        return;
      }
      setPlayer2Emoji(selectedEmoji);
    }
  };

  const renderEmojiGrid = () => {
    return (
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className={`btn btn-outline-primary p-3 ${selectedEmoji === emoji ? 'active' : ''}`}
            onClick={() => handleEmojiSelect(emoji)}
            disabled={currentPlayer === 2 && emoji === player1Emoji}
            style={{ fontSize: '2rem' }}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5 text-center">
      {player1Emoji && player2Emoji ? (
        <div>
          <h2>Jogadores Prontos!</h2>
          <p>Emoji selecionado pelo Jogador 1: {player1Emoji}</p>
          <p>Emoji selecionado pelo Jogador 2: {player2Emoji}</p>
        </div>
      ) : (
        <div>
          <h2>Escolha o emoji do Jogador {currentPlayer}</h2>
          {renderEmojiGrid()}
          <div className="mt-4">
            <button
              className="btn btn-success"
              onClick={handleConfirm}
              disabled={!selectedEmoji}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiSelection;