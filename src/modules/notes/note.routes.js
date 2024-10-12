import express from 'express'
import { addNote, deleteNote, getAllNotes, updateNote,getNote } from './note.controller.js'

const notesRouter = express.Router()

notesRouter.post("/", addNote)
notesRouter.put("/", updateNote)
notesRouter.delete("/", deleteNote)
notesRouter.get("/", getAllNotes)
notesRouter.get("/:id", getNote)

export default notesRouter