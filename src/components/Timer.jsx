function fmt(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Presentational timer. `seconds` is the elapsed time for the current set;
 * `target` (optional, pacing mode) is the allowed budget — the display turns
 * red once elapsed exceeds it.
 */
export default function Timer({ seconds, target }) {
  const over = target != null && seconds > target;
  return (
    <div className={`timer ${over ? 'timer-over' : ''}`}>
      <span className="timer-clock">⏱ {fmt(seconds)}</span>
      {target != null && (
        <span className="timer-target">
          / target {fmt(target)} {over ? '— over pace!' : ''}
        </span>
      )}
    </div>
  );
}
