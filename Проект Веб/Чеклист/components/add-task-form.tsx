"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddTaskFormProps {
  onAdd: (text: string) => void
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
        className="flex-1"
      />
      <Button type="submit" size="icon" className="shrink-0">
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  )
}
