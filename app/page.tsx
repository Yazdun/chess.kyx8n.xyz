"use client";

import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Button } from "@/components/ui/button";
import { GameInfo } from "@/components/game-info";
import { MoveInput } from "@/components/move-input";
import { ChessBoard } from "@/components/chess-board";

export default function Home() {
  const [game, setGame] = useState<Chess | null>(null);
  const [fen, setFen] = useState("");
  const [move, setMove] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
  }, []);

  const handleMove = (moveStr: string) => {
    if (!game) return;

    try {
      setError("");
      const result = game.move(moveStr, { sloppy: true });

      if (result) {
        setFen(game.fen());
        setMove("");
      } else {
        setError("Invalid move");
      }
    } catch (err) {
      setError("Invalid move notation");
    }
  };

  const resetGame = () => {
    if (game) {
      game.reset();
      setFen(game.fen());
      setMove("");
      setError("");
    }
  };

  const undoMove = () => {
    if (game) {
      game.undo();
      setFen(game.fen());
      setError("");
    }
  };

  if (!game) return null;

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Board */}
          <ChessBoard fen={fen} game={game} />

          {/* Game Info */}
          <GameInfo game={game} />

          {/* Move Input */}
          <MoveInput
            move={move}
            setMove={setMove}
            onMove={handleMove}
            error={error}
          />

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              onClick={undoMove}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Undo
            </Button>
            <Button
              onClick={resetGame}
              variant="destructive"
              className="flex-1"
            >
              New Game
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
