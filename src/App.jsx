import { useState, useEffect } from 'react';
import './App.css';
import EmojiSelector from './components/EmojiSelector';
import Farol from './components/Farol';
import Footer from './components/Footer';

function App() {
  const [stage, setStage] = useState('parado');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [player1Emoji, setPlayer1Emoji] = useState(null);
  const [player2Emoji, setPlayer2Emoji] = useState(null);
  const [goStartTime, setGoStartTime] = useState(null);
  const [player1PressTime, setPlayer1PressTime] = useState(null);
  const [player2PressTime, setPlayer2PressTime] = useState(null);

  const startRace = () => {
    setStage('acendendo');
    setActiveIndex(-1);
    setWinner(null);
    setPlayer1PressTime(null);
    setPlayer2PressTime(null);
    setGoStartTime(null);
  };

  useEffect(() => {
    if (stage === 'acendendo') {
      if (activeIndex < 4) {
        const timer = setTimeout(() => setActiveIndex(activeIndex + 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => {
          setStage('go');
          setGoStartTime(Date.now());
        }, 1000);
      }
    }
  }, [stage, activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (stage === 'fim' || winner) return;

      const currentTime = Date.now();

      if (e.key.toLowerCase() === 'a') {
        if (stage !== 'go') {
          setWinner('Jogador 2');
          setScore((prev) => ({ ...prev, p2: prev.p2 + 1 }));
          setStage('fim');
        } else {
          setPlayer1PressTime(currentTime);
        }
      }

      if (e.key.toLowerCase() === 'l') {
        if (stage !== 'go') {
          setWinner('Jogador 1');
          setScore((prev) => ({ ...prev, p1: prev.p1 + 1 }));
          setStage('fim');
        } else {
          setPlayer2PressTime(currentTime);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, winner]);

  useEffect(() => {
    if (stage === 'go' && player1PressTime && player2PressTime) {
      const player1ReactionTime = player1PressTime - goStartTime;
      const player2ReactionTime = player2PressTime - goStartTime;

      if (player1ReactionTime < player2ReactionTime) {
        setWinner('Jogador 1');
        setScore((prev) => ({ ...prev, p1: prev.p1 + 1 }));
      } else {
        setWinner('Jogador 2');
        setScore((prev) => ({ ...prev, p2: prev.p2 + 1 }));
      }
      setStage('fim');
    } else if (stage === 'go' && (player1PressTime || player2PressTime)) {
      if (player1PressTime) {
        setWinner('Jogador 1');
        setScore((prev) => ({ ...prev, p1: prev.p1 + 1 }));
        setStage('fim');
      } else if (player2PressTime) {
        setWinner('Jogador 2');
        setScore((prev) => ({ ...prev, p2: prev.p2 + 1 }));
        setStage('fim');
      }
    }
  }, [player1PressTime, player2PressTime, stage, goStartTime]);

  const handleEmojiSelection = (p1Emoji, p2Emoji) => {
    setPlayer1Emoji(p1Emoji);
    setPlayer2Emoji(p2Emoji);
  };

  return (
    <div className="container text-center mt-1">
      <h1>Jogo de Reflexo</h1>
      {!player1Emoji || !player2Emoji ? (
        <EmojiSelector onSelection={handleEmojiSelection} />
      ) : (
        <>
          <div className="mb-1">
            <p>Jogador 1 ({player1Emoji}): Tecla A</p>
            <p>Jogador 2 ({player2Emoji}): Tecla L</p>
          </div>
          {stage !== 'go' && stage !== 'fim' ? (
            <div  className="d-flex justify-content-center gap-2 mb-1">
              <Farol color="red" active={activeIndex >= 0} />
              <Farol color="red" active={activeIndex >= 1} />
              <Farol color="red" active={activeIndex >= 2} />
              <Farol color="red" active={activeIndex >= 3} />
              <Farol color="red" active={activeIndex >= 4} />
            </div>
          ) : (
            <div className="mb-1 d-flex justify-content-center flex-column align-items-center">
              <Farol color="green" active={true} />
              <h2 className="text-success mt-1 mb-1">GO!</h2>
            </div>
          )}

          {winner && (
            <h2 className="mb-1">
              🏆 Vencedor: {winner} {winner === 'Jogador 1' ? player1Emoji : player2Emoji}
            </h2>
          )}

          <h3 className="mb-1">Placar</h3>
          <p className="mb-1">
            Jogador 1 ({player1Emoji}): {score.p1} | Jogador 2 ({player2Emoji}): {score.p2}
          </p>

          <button className="btn btn-primary mt-1 mb-1" onClick={startRace}>
            Iniciar Nova Rodada
          </button>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;