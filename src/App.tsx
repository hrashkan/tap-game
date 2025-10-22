import "./App.css";
import { useGameStore } from "./store/game";
import { TapButton } from "./components/TapButton";
import { HUD } from "./components/HUD";
import { ConfettiBurst } from "./components/ConfettiBurst";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const startGame = useGameStore((s) => s.startGame);
  const stopGame = useGameStore((s) => s.stopGame);
  const reset = useGameStore((s) => s.reset);
  const isRunning = useGameStore((s) => s.isRunning);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">Tap Game</div>
        <ThemeToggle />
      </header>
      <main className="main">
        <HUD />
        <div className="playfield">
          <TapButton />
        </div>
        <div className="controls">
          {!isRunning ? (
            <button className="primary" onClick={startGame}>
              Start
            </button>
          ) : (
            <button className="secondary" onClick={stopGame}>
              Stop
            </button>
          )}
          <button className="ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </main>
      <ConfettiBurst />
    </div>
  );
}

export default App;
