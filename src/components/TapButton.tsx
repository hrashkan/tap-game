import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGameStore } from "../store/game";
import { hapticTap } from "../utils/haptics";

export function TapButton() {
  const tap = useGameStore((s) => s.tap);
  const isRunning = useGameStore((s) => s.isRunning);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const el = btnRef.current;
    const ctx = gsap.context(() => {
      gsap.set(el, { scale: 1 });
    }, el);
    return () => ctx.revert();
  }, []);

  const handleTap = () => {
    if (!isRunning) return;
    hapticTap();
    tap();
    if (!btnRef.current) return;
    gsap.fromTo(
      btnRef.current,
      { scale: 1 },
      { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  return (
    <button
      ref={btnRef}
      className="tap-btn"
      onClick={handleTap}
      aria-label="Tap"
    >
      Tap
    </button>
  );
}

