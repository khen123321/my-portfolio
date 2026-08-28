import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const GRID_SIZE = 20;
const START_SNAKE = [
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const START_DIRECTION = { x: 1, y: 0 };
const MAX_NAME_LENGTH = 16;
const NAME_PATTERN = /^[A-Za-z0-9 _.-]{1,16}$/;

function sameCell(a, b) {
  return a.x === b.x && a.y === b.y;
}

function cellKey(cell) {
  return `${cell.x}-${cell.y}`;
}

function getLevel(score) {
  return Math.floor(score / 3) + 1;
}

function getMoveDelay(score) {
  return Math.max(75, 180 - (getLevel(score) - 1) * 15);
}

function formatNumber(value) {
  return String(value).padStart(3, "0");
}

function createFood(snake) {
  const occupied = new Set(snake.map(cellKey));
  const openCells = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const candidate = { x, y };
      if (!occupied.has(cellKey(candidate))) {
        openCells.push(candidate);
      }
    }
  }

  if (openCells.length === 0) return null;
  return openCells[Math.floor(Math.random() * openCells.length)];
}

function isReverse(current, next) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

function normalizeName(value) {
  return value.trim().replace(/\s+/g, " ");
}

function isValidName(value) {
  const normalized = normalizeName(value);
  return normalized.length > 0 && normalized.length <= MAX_NAME_LENGTH && NAME_PATTERN.test(normalized);
}

function DirectionButton({ label, direction, onDirection }) {
  return (
    <button
      className={`snake-dpad-btn snake-dpad-${direction}`}
      type="button"
      aria-label={`Move ${label}`}
      onClick={() => onDirection(direction)}
    >
      {label}
    </button>
  );
}

export default function Play() {
  const [playerName, setPlayerName] = useState("");
  const [nameError, setNameError] = useState("");
  const [gameState, setGameState] = useState("idle");
  const [snake, setSnake] = useState(START_SNAKE);
  const [food, setFood] = useState(() => createFood(START_SNAKE));
  const [direction, setDirection] = useState(START_DIRECTION);
  const [queuedDirection, setQueuedDirection] = useState(START_DIRECTION);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardError, setLeaderboardError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const scoreSubmittedRef = useRef(false);
  const pointerStartRef = useRef(null);

  const level = getLevel(score);
  const moveDelay = getMoveDelay(score);
  const normalizedPlayerName = normalizeName(playerName);

  const snakeCells = useMemo(() => new Set(snake.map(cellKey)), [snake]);
  const headKey = cellKey(snake[0]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLeaderboardError("");
      const response = await fetch("/api/snake", {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Leaderboard request failed");
      }

      const data = await response.json();
      setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : []);
    } catch {
      setLeaderboardError("leaderboard unavailable_");
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const resetGame = useCallback((nextState = "playing") => {
    const initialSnake = START_SNAKE.map((cell) => ({ ...cell }));
    setSnake(initialSnake);
    setFood(createFood(initialSnake));
    setDirection(START_DIRECTION);
    setQueuedDirection(START_DIRECTION);
    setScore(0);
    setSubmitError("");
    scoreSubmittedRef.current = false;
    setGameState(nextState);
  }, []);

  const startGame = (event) => {
    event.preventDefault();
    const nextName = normalizeName(playerName);

    if (!isValidName(nextName)) {
      setNameError("Use 1-16 letters, numbers, spaces, _, -, or .");
      return;
    }

    setPlayerName(nextName);
    setNameError("");
    resetGame("playing");
  };

  const queueDirection = useCallback((nextDirection) => {
    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    const next = directions[nextDirection];

    if (!next) return;

    setQueuedDirection((currentQueued) => {
      if (isReverse(direction, next) || isReverse(currentQueued, next)) {
        return currentQueued;
      }
      return next;
    });
  }, [direction]);

  const togglePause = useCallback(() => {
    setGameState((current) => {
      if (current === "playing") return "paused";
      if (current === "paused") return "playing";
      return current;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const directionKeys = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
      };

      if (directionKeys[key] && (gameState === "playing" || gameState === "paused")) {
        event.preventDefault();
        if (gameState === "playing") {
          queueDirection(directionKeys[key]);
        }
        return;
      }

      if ((key === " " || key === "p") && (gameState === "playing" || gameState === "paused")) {
        event.preventDefault();
        togglePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, queueDirection, togglePause]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setGameState((current) => (current === "playing" ? "paused" : current));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return undefined;

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const nextDirection = isReverse(direction, queuedDirection) ? direction : queuedDirection;
        const nextHead = {
          x: currentSnake[0].x + nextDirection.x,
          y: currentSnake[0].y + nextDirection.y,
        };

        const ateFood = food && sameCell(nextHead, food);
        const bodyToCheck = ateFood ? currentSnake : currentSnake.slice(0, -1);

        if (
          nextHead.x < 0 ||
          nextHead.x >= GRID_SIZE ||
          nextHead.y < 0 ||
          nextHead.y >= GRID_SIZE ||
          bodyToCheck.some((cell) => sameCell(cell, nextHead))
        ) {
          setGameState("game-over");
          return currentSnake;
        }

        const nextSnake = [nextHead, ...currentSnake];

        if (!ateFood) {
          nextSnake.pop();
        } else {
          setScore((currentScore) => currentScore + 1);
          setFood(createFood(nextSnake));
        }

        setDirection(nextDirection);
        return nextSnake;
      });
    }, moveDelay);

    return () => window.clearInterval(timer);
  }, [direction, food, gameState, moveDelay, queuedDirection]);

  useEffect(() => {
    if (gameState !== "game-over" || scoreSubmittedRef.current || !isValidName(normalizedPlayerName)) {
      return undefined;
    }

    const controller = new AbortController();
    scoreSubmittedRef.current = true;

    async function submitScore() {
      try {
        setSubmitError("");
        const response = await fetch("/api/snake", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            playerName: normalizedPlayerName,
            score,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Score submission failed");
        }

        const data = await response.json();
        setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSubmitError("score could not be submitted_");
        }
      }
    }

    submitScore();
    return () => controller.abort();
  }, [gameState, normalizedPlayerName, score]);

  const handlePointerDown = (event) => {
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;

    if (!start || gameState !== "playing") return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const distance = Math.max(Math.abs(dx), Math.abs(dy));

    if (distance < 22) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      queueDirection(dx > 0 ? "right" : "left");
      return;
    }

    queueDirection(dy > 0 ? "down" : "up");
  };

  const qualifiesForTopThree = score > 0 && (
    leaderboard.length < 3 ||
    leaderboard.some((entry) => score > entry.score)
  );

  return (
    <section className="section play-section">
      <div className="site-container">
        <div className="section-header play-header">
          <span className="section-kicker">06 / Play</span>
          <h1 className="section-title">snake<span className="cursor-mark">_</span></h1>
          <p className="section-copy">Classic Snake. Eat, grow, survive.</p>
        </div>

        <div className="play-layout">
          <div className="snake-panel">
            <div className="snake-scorebar" aria-label="Snake score">
              <div>
                <span>Score</span>
                <strong>{formatNumber(score)}</strong>
              </div>
              <div>
                <span>Level</span>
                <strong>{String(level).padStart(2, "0")}</strong>
              </div>
            </div>

            <div
              className="snake-board"
              role="application"
              aria-label="Snake game board"
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
                const cell = { x: index % GRID_SIZE, y: Math.floor(index / GRID_SIZE) };
                const key = cellKey(cell);
                const isSnake = snakeCells.has(key);
                const isHead = key === headKey;
                const isFood = food && sameCell(cell, food);

                return (
                  <span
                    className={[
                      "snake-cell",
                      isSnake ? "is-snake" : "",
                      isHead ? "is-head" : "",
                      isFood ? "is-food" : "",
                    ].filter(Boolean).join(" ")}
                    key={key}
                    aria-hidden="true"
                  />
                );
              })}

              {gameState === "idle" && (
                <form className="snake-overlay snake-start" onSubmit={startGame}>
                  <h2>snake<span className="cursor-mark">_</span></h2>
                  <label htmlFor="snake-player-name">Enter a nickname</label>
                  <input
                    id="snake-player-name"
                    type="text"
                    value={playerName}
                    maxLength={MAX_NAME_LENGTH}
                    autoComplete="off"
                    inputMode="text"
                    onChange={(event) => {
                      setPlayerName(event.target.value);
                      setNameError("");
                    }}
                  />
                  {nameError && <p className="snake-error">{nameError}</p>}
                  <button className="text-link snake-action" type="submit">Start -&gt;</button>
                </form>
              )}

              {gameState === "paused" && (
                <div className="snake-overlay snake-status" role="status">
                  <h2>paused<span className="cursor-mark">_</span></h2>
                  <button className="text-link snake-action" type="button" onClick={togglePause}>Resume -&gt;</button>
                </div>
              )}

              {gameState === "game-over" && (
                <div className="snake-overlay snake-status" role="status">
                  <h2>game over<span className="cursor-mark">_</span></h2>
                  <p>score {formatNumber(score)}</p>
                  {qualifiesForTopThree && <p className="snake-top-note">top 3 score_</p>}
                  {submitError && <p className="snake-error">{submitError}</p>}
                  <div className="snake-end-actions">
                    <button className="text-link snake-action" type="button" onClick={() => resetGame("playing")}>Play again -&gt;</button>
                    <button className="text-link snake-action" type="button" onClick={() => setGameState("idle")}>Exit -&gt;</button>
                  </div>
                </div>
              )}
            </div>

            <div className="snake-mobile-controls" aria-label="Snake direction controls">
              <DirectionButton label="up" direction="up" onDirection={queueDirection} />
              <DirectionButton label="left" direction="left" onDirection={queueDirection} />
              <DirectionButton label="down" direction="down" onDirection={queueDirection} />
              <DirectionButton label="right" direction="right" onDirection={queueDirection} />
            </div>
          </div>

          <aside className="snake-side">
            <button
              className="btn-secondary snake-pause"
              type="button"
              onClick={togglePause}
              disabled={gameState !== "playing" && gameState !== "paused"}
            >
              {gameState === "paused" ? "Resume" : "Pause"}
            </button>

            <div className="snake-leaderboard">
              <h2>Top 3</h2>
              {leaderboardError ? (
                <p className="snake-error">{leaderboardError}</p>
              ) : (
                <ol>
                  {[0, 1, 2].map((index) => {
                    const entry = leaderboard[index];
                    return (
                      <li key={index}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {entry ? (
                          <>
                            <strong>{entry.playerName}</strong>
                            <em>{formatNumber(entry.score)}</em>
                          </>
                        ) : (
                          <strong className="snake-empty">-</strong>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            <div className="snake-instructions">
              <h2>Controls</h2>
              <p>Desktop: arrows or WASD. Space or P pauses.</p>
              <p>Mobile: swipe the board or use the direction controls.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
