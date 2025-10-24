import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useGameStore } from "../store/game";

export function ConfettiBurst() {
  const isNewHigh = useGameStore((s) => s.isNewHigh);
  const acknowledge = useGameStore((s) => s.acknowledgeNewHigh);

  useEffect(() => {
    if (!isNewHigh) return;
    const shoot = (angle: number, originX: number) => {
      confetti({
        particleCount: 60,
        spread: 55,
        angle,
        origin: { x: originX, y: 0.6 },
        scalar: 1.0,
      });
    };
    shoot(60, 0);
    shoot(120, 1);
    const t = setTimeout(() => acknowledge(), 100);
    return () => clearTimeout(t);
  }, [isNewHigh, acknowledge]);

  return null;
}

