export function vibrate(durationMs: number | number[] = 10): void {
  if (typeof window === "undefined") return;
  const navigatorAny = navigator as typeof window.navigator;
  if (navigatorAny?.vibrate) {
    try {
      navigatorAny.vibrate(durationMs);
    } catch {
      // ignore
    }
  }
}

export function hapticTap(): void {
  vibrate(8);
}

export function hapticSuccess(): void {
  vibrate([10, 20, 10]);
}
