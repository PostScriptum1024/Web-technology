"use client"

import { useState } from "react"
import { ChecklistItem } from "@/components/checklist-item"
import { AddTaskForm } from "@/components/add-task-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface Task {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Купить продукты", completed: false },
    { id: 2, text: "Сделать зарядку", completed: true },
    { id: 3, text: "Прочитать книгу", completed: false },
  ])

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-balance">Мой Чеклист</CardTitle>
            <CardDescription className="text-base">Управляйте своими задачами эффективно</CardDescription>
            <div className="pt-2">
              <div className="text-sm text-muted-foreground">
                Выполнено: {completedCount} из {totalCount}
              </div>
              {totalCount > 0 && (
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(completedCount / totalCount) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <AddTaskForm onAdd={addTask} />

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">Нет задач</p>
                  <p className="text-sm mt-2">Добавьте новую задачу выше</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <ChecklistItem
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleComplete}
                    onEdit={editTask}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
