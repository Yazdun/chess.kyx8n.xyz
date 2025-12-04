"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MoveInputProps {
  move: string
  setMove: (move: string) => void
  onMove: (move: string) => void
  error: string
}

export  function MoveInput({ move, setMove, onMove, error }: MoveInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (move.trim()) {
      onMove(move)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Enter Move (e.g., e2e4, Nf3, O-O)</label>
        <Input
          value={move}
          onChange={(e) => setMove(e.target.value.toLowerCase())}
          placeholder="e2e4"
          className="font-mono"
          autoFocus
        />
      </div>

      {error && <div className="p-2 bg-destructive/20 text-destructive text-sm rounded">{error}</div>}

      <Button type="submit" className="w-full">
        Play Move
      </Button>

      <div className="p-3 bg-muted rounded text-sm space-y-1">
        <p className="font-semibold">Move Format:</p>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>
            • Standard: <code className="font-mono">e2e4</code>
          </li>
          <li>
            • Algebraic: <code className="font-mono">Nf3</code>, <code className="font-mono">Bxe5</code>
          </li>
          <li>
            • Castling: <code className="font-mono">O-O</code> (kingside), <code className="font-mono">O-O-O</code>{" "}
            (queenside)
          </li>
        </ul>
      </div>
    </form>
  )
}
