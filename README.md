## Tap Game — 10-second Click Speed Test

A clean, mobile-friendly game where you tap as fast as possible for 10 seconds.

### Stack

- React + TypeScript + Vite
- Zustand (state + local persistence)
- GSAP (micro-interactions)
- canvas-confetti (celebration on new high score)

### Features

- 10-second timer with responsive HUD
- Haptic feedback on taps where supported
- Local high score persistence
- Animated tap button, score pop, and timer bar
- Lightweight theming (Classic, Coin, Cat)

### Scripts

- `npm run dev` – start dev server
- `npm run build` – type-check and build
- `npm run preview` – preview the build

### Project Structure

- `src/store/game.ts` – Zustand store: score, timer loop, high score, theme
- `src/components` – UI components: `TapButton`, `HUD`, `ThemeToggle`, `ConfettiBurst`
- `src/utils/haptics.ts` – safe vibration helpers
- `src/index.css` – CSS variables, themes, responsive layout

### Implementation Notes

- Timer uses a 50ms interval with deadline tracking for accuracy and efficiency.
- Store persistence saves only `highScore` and `theme`.
- Haptics are no-ops on unsupported devices.
- GSAP animations are short and cheap to keep 60fps on mobile.

### Future Enhancements

- Sound effects toggle
- PWA install + offline
- Share score (Web Share API)
