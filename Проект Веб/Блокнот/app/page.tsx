"use client"

import { useState } from "react"
import styled from "styled-components"

type Note = {
  id: number
  title: string
  text: string
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid #ddd;
  padding: 20px;
  background-color: #f5f5f5;
`

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 900;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const NotesList = styled.div``

const NoteItem = styled.div<{ $selected: boolean }>`
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.$selected ? "#fffacd" : "white")};
  color: ${(props) => (props.$selected ? "black" : "black")};
  border-radius: 5px;
  cursor: pointer;
`

const NoteTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
`

const NotePreview = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DeleteButton = styled.button`
  margin-top: 5px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`

const EditButton = styled.button`
  margin-top: 5px;
  margin-right: 5px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`

const MainArea = styled.div`
  flex: 1;
  padding: 20px;
`

const EditorContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TitleInput = styled.input`
  font-size: 24px;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
`

const TextArea = styled.textarea`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
`

const SaveButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 120px;

  &:hover {
    background-color: #218838;
  }
`

const EmptyState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`

const Toast = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.$show ? "1" : "0")};
  transform: translateY(${(props) => (props.$show ? "0" : "-20px")});
  transition: all 0.3s ease;
  pointer-events: none;
  font-weight: bold;
`

const DeleteToast = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.$show ? "1" : "0")};
  transform: translateY(${(props) => (props.$show ? "0" : "-20px")});
  transition: all 0.3s ease;
  pointer-events: none;
  font-weight: bold;
`

export default function NotePad() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [currentText, setCurrentText] = useState("")
  const [search, setSearch] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showDeleteToast, setShowDeleteToast] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentTitle, setCurrentTitle] = useState("")

  function addNote() {
    const note: Note = {
      id: Date.now(),
      title: "Заметка " + (notes.length + 1),
      text: "",
    }
    setNotes([...notes, note])
    setSelectedId(note.id)
    setCurrentText("")
    setHasUnsavedChanges(false)
  }

  function openNote(note: Note) {
    setSelectedId(note.id)
    setCurrentText(note.text)
    setCurrentTitle(note.title)
    setHasUnsavedChanges(false)
    setIsEditing(false)
  }

  function startEditing() {
    setIsEditing(true)
  }

  function save() {
    if (selectedId) {
      setNotes(notes.map((n) => (n.id === selectedId ? { ...n, text: currentText, title: currentTitle } : n)))
      setHasUnsavedChanges(false)
      setIsEditing(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  function remove(id: number) {
    setNotes(notes.filter((n) => n.id !== id))
    if (selectedId === id) {
      setSelectedId(null)
      setCurrentText("")
      setHasUnsavedChanges(false)
    }
    setShowDeleteToast(true)
    setTimeout(() => setShowDeleteToast(false), 2000)
  }

  const filtered = notes.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.text.toLowerCase().includes(search.toLowerCase()),
  )

  const current = notes.find((n) => n.id === selectedId)

  return (
    <Container>
      <Toast $show={showToast}>Сохранено!</Toast>
      <DeleteToast $show={showDeleteToast}>Заметка удалена!</DeleteToast>

      <Sidebar>
        <Title>Блокнот</Title>

        <Button onClick={addNote}>+ Новая заметка</Button>

        <SearchInput type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <NotesList>
          {filtered.map((note) => (
            <NoteItem key={note.id} $selected={selectedId === note.id}>
              <div onClick={() => openNote(note)}>
                <NoteTitle>{note.title}</NoteTitle>
                <NotePreview>
                  {note.text ? note.text.substring(0, 30) + (note.text.length > 30 ? "..." : "") : "Пустая заметка"}
                </NotePreview>
              </div>
              <ButtonsContainer>
                {!(selectedId === note.id && isEditing) && (
                  <EditButton
                    onClick={() => {
                      openNote(note)
                      startEditing()
                    }}
                  >
                    Редактировать
                  </EditButton>
                )}
                <DeleteButton onClick={() => remove(note.id)}>Удалить</DeleteButton>
              </ButtonsContainer>
            </NoteItem>
          ))}
        </NotesList>
      </Sidebar>

      <MainArea>
        {current ? (
          <EditorContainer>
            <TitleInput
              value={currentTitle}
              onChange={(e) => {
                setCurrentTitle(e.target.value)
                setHasUnsavedChanges(true)
              }}
              disabled={!isEditing}
              placeholder="Название заметки"
            />

            <TextArea
              value={currentText}
              onChange={(e) => {
                setCurrentText(e.target.value)
                setHasUnsavedChanges(true)
              }}
              placeholder="Пишите здесь..."
              disabled={!isEditing}
            />

            {isEditing && hasUnsavedChanges && <SaveButton onClick={save}>Сохранить</SaveButton>}
          </EditorContainer>
        ) : (
          <EmptyState>
            <p>Выберите заметку или создайте новую</p>
          </EmptyState>
        )}
      </MainArea>
    </Container>
  )
}
