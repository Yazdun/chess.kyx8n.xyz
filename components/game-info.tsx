import type { Chess } from "chess.js";

interface GameInfoProps {
  game: Chess;
}

export function GameInfo({ game }: GameInfoProps) {
  const isCheckmate = game.isCheckmate();
  const isStalemate = game.isStalemate();
  const isCheck = game.isCheck();
  const moveCount = game.moves({ verbose: true }).length;
  const turn = game.turn() === "w" ? "White" : "Black";
  const pgn = game.pgn();

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Current Turn</p>
          <p className="text-lg font-semibold">{turn}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Legal Moves</p>
          <p className="text-lg font-semibold">{moveCount}</p>
        </div>
      </div>

      {isCheckmate && (
        <div className="p-3 bg-destructive/20 text-destructive rounded border border-destructive/30">
          <p className="font-semibold">Checkmate!</p>
          <p className="text-sm">
            {turn === "White" ? "Black" : "White"} wins!
          </p>
        </div>
      )}

      {isStalemate && (
        <div className="p-3 bg-muted rounded border border-border">
          <p className="font-semibold">Stalemate - Draw</p>
        </div>
      )}

      {isCheck && !isCheckmate && (
        <div className="p-3 bg-amber-100 text-amber-900 rounded border border-amber-300">
          <p className="font-semibold">{turn} is in check!</p>
        </div>
      )}

      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-2">Game</p>
        <p className="font-mono text-xs break-all leading-relaxed">
          {pgn || "1."}
        </p>
      </div>
    </div>
  );
}
