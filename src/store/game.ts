import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type GameTheme = "classic" | "coin" | "cat";

type GameState = {
  score: number;
  highScore: number;
  isRunning: boolean;
  timeLeftMs: number;
  theme: GameTheme;
  isNewHigh: boolean;
  startGame: () => void;
  tap: () => void;
  stopGame: () => void;
  reset: () => void;
  setTheme: (theme: GameTheme) => void;
  acknowledgeNewHigh: () => void;
};

const GAME_DURATION_MS = 10_000;

type TimerRefs = {
  intervalId: number | null;
  endTimeMs: number | null;
};

const timerRefs: TimerRefs = {
  intervalId: null,
  endTimeMs: null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      score: 0,
      highScore: 0,
      isRunning: false,
      timeLeftMs: GAME_DURATION_MS,
      theme: "classic",
      isNewHigh: false,
      startGame: () => {
        if (get().isRunning) return;
        // Initialize countdown
        timerRefs.endTimeMs = Date.now() + GAME_DURATION_MS;
        set({
          isRunning: true,
          score: 0,
          timeLeftMs: GAME_DURATION_MS,
          isNewHigh: false,
        });

        // Update timer at ~20Hz which is smooth enough and light
        if (timerRefs.intervalId) window.clearInterval(timerRefs.intervalId);
        timerRefs.intervalId = window.setInterval(() => {
          const remaining = Math.max(
            0,
            (timerRefs.endTimeMs ?? 0) - Date.now()
          );
          set({ timeLeftMs: remaining });
          if (remaining <= 0) {
            get().stopGame();
          }
        }, 50);
      },
      tap: () => {
        if (!get().isRunning) return;
        set((s) => ({ score: s.score + 1 }));
      },
      stopGame: () => {
        if (!get().isRunning) return;
        if (timerRefs.intervalId) {
          window.clearInterval(timerRefs.intervalId);
          timerRefs.intervalId = null;
        }
        timerRefs.endTimeMs = null;
        const { score, highScore } = get();
        const achievedNewHigh = score > highScore;
        set({
          isRunning: false,
          timeLeftMs: 0,
          highScore: achievedNewHigh ? score : highScore,
          isNewHigh: achievedNewHigh,
        });
      },
      reset: () => {
        if (timerRefs.intervalId) {
          window.clearInterval(timerRefs.intervalId);
          timerRefs.intervalId = null;
        }
        timerRefs.endTimeMs = null;
        set({
          score: 0,
          isRunning: false,
          timeLeftMs: GAME_DURATION_MS,
          isNewHigh: false,
        });
      },
      setTheme: (theme) => set({ theme }),
      acknowledgeNewHigh: () => set({ isNewHigh: false }),
    }),
    {
      name: "tap-game-store",
      version: 1,
      partialize: (state) => ({
        highScore: state.highScore,
        theme: state.theme,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const formatTime = (ms: number): string => {
  const seconds = ms / 1000;
  return seconds.toFixed(2);
};
