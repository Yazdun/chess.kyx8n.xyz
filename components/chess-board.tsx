import type { Chess } from "chess.js";
import { PIECE_SYMBOLS } from "@/lib/chess-types";
import type { ChessPiece } from "@/lib/chess-types";

interface ChessBoardProps {
  fen: string;
  game: Chess;
}

export function ChessBoard({ fen, game }: ChessBoardProps) {
  const board = game.board();
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"] as const;

  const whiteKingPos = board
    .flat()
    .findIndex((p) => p?.type === "k" && p?.color === "w");
  const blackKingPos = board
    .flat()
    .findIndex((p) => p?.type === "k" && p?.color === "b");

  const getSquareColor = (file: number, rank: number): string => {
    return (file + rank) % 2 === 0 ? "bg-amber-100" : "bg-amber-700";
  };

  const getTextColor = (piece: ChessPiece | null): string => {
    return piece && piece.color === "w" ? "text-slate-900" : "text-slate-100";
  };

  const getSquareHighlight = (fileIdx: number, rankIdx: number): string => {
    const squareIndex = rankIdx * 8 + fileIdx;
    const isCheck = game.isCheck();

    if (!isCheck) return "";

    const kingIndex = game.turn() === "w" ? whiteKingPos : blackKingPos;
    if (squareIndex === kingIndex) {
      return "ring-2 ring-destructive ring-inset";
    }
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex gap-2 w-full">
        <div className="flex-1 max-w-full">
          <div className="aspect-square flex gap-0">
            <div className="flex flex-col gap-0 flex-1">
              {ranks.map((rank, rankIdx) => (
                <div key={rank} className="flex gap-0 flex-1">
                  {files.map((file, fileIdx) => {
                    const piece = board[rankIdx][fileIdx];
                    const squareColor = getSquareColor(fileIdx, rankIdx);
                    const highlight = getSquareHighlight(fileIdx, rankIdx);

                    return (
                      <div
                        key={`${file}${rank}`}
                        className={`
                          flex-1 aspect-square flex items-center justify-center
                          text-4xl sm:text-5xl lg:text-6xl font-bold cursor-default
                          ${squareColor}
                          ${piece ? getTextColor(piece) : "text-transparent"}
                          ${highlight}
                          transition-all duration-200
                        `}
                      >
                        {piece ? PIECE_SYMBOLS[piece.type.toUpperCase()] : ""}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
