import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGameStore, formatTime } from "../store/game";

export function HUD() {
  const score = useGameStore((s) => s.score);
  const high = useGameStore((s) => s.highScore);
  const timeLeft = useGameStore((s) => s.timeLeftMs);
  const isRunning = useGameStore((s) => s.isRunning);
  const scoreRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scoreRef.current) return;
    gsap.fromTo(
      scoreRef.current,
      { scale: 1.0 },
      { scale: 1.1, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" }
    );
  }, [score]);

  useEffect(() => {
    if (!barRef.current) return;
    const progress = 1 - Math.min(1, Math.max(0, timeLeft / 10000));
    gsap.to(barRef.current, {
      width: `${progress * 100}%`,
      duration: 0.05,
      ease: "none",
    });
  }, [timeLeft]);

  return (
    <div className="hud">
      <div className="row">
        <div className="score" ref={scoreRef} aria-live="polite">
          {score}
        </div>
        <div className="spacer" />
        <div className="high">Best: {high}</div>
      </div>
      <div className="timer">
        <div className="timer-bar" ref={barRef} />
        <div className="time-text">
          {isRunning ? formatTime(timeLeft) : "10.00"}
        </div>
      </div>
    </div>
  );
}
