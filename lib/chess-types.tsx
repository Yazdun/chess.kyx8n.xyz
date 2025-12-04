import type { Square, PieceSymbol, Color, Move } from "chess.js";
import { FaChessBishop } from "react-icons/fa";
import { FaChessKing, FaChessKnight } from "react-icons/fa6";
import { GiChessKnight, GiChessQueen, GiChessRook } from "react-icons/gi";
import {
  TbChessBishopFilled,
  TbChessFilled,
  TbChessKnightFilled,
} from "react-icons/tb";

export type ChessSquare = Square;
export type ChessPieceSymbol = PieceSymbol;
export type ChessColor = Color;
export type ChessMoveResult = Move | null;

export interface ChessPiece {
  type: PieceSymbol;
  color: Color;
}

export interface ChessBoardSquare extends ChessPiece {
  square?: Square;
}

export const PIECE_SYMBOLS: Record<string, React.ReactElement> = {
  K: <FaChessKing />,
  Q: <GiChessQueen />,
  R: <GiChessRook />,
  B: <TbChessBishopFilled />,
  N: <TbChessKnightFilled />,
  P: <TbChessFilled />,
  k: <FaChessKnight />,
  q: <GiChessQueen />,
  r: <GiChessRook />,
  b: <FaChessBishop />,
  n: <GiChessKnight />,
  p: <TbChessBishopFilled />,
};
