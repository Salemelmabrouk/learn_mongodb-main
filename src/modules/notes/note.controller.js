import { notesModel } from "../../../models/notes.model.js"
import mongoose from 'mongoose';
export const addNote = async(req, res) => {
  const {title, desc, createdBy} = req.body
  const note = await notesModel.insertMany({title, desc, createdBy})
  res.json({message: "success", note})
  //note? res.json({title: title, desc: desc}):res.json({message: "not found"})
}


export const updateNote = async(req, res) => {
  const {title, desc, _id} = req.body
  const noteToUpdate = await notesModel.findByIdAndUpdate({_id: "6708368b6f6f26bd20a0b346"}, {
    title: "new title",
  },
  {
    new: true
  }
)
  res.json({message: "success", noteToUpdate})
}
export const deleteNote = async(req, res) => {
  const {title, desc, _id} = req.body

  const noteToDelete = await notesModel.findByIdAndDelete({_id: "6708368b6f6f26bd20a0b346"})

  res.json({message: "delete completed"})
}
export const getAllNotes = async(req, res) => {
  const {title, desc, _id} = req.body

  const notes = await notesModel.find({})

  res.json({message: "success", notes})
}


export const getNote = async (req, res) => {
  const id = req.params.id;

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note id" });
  }

  try {
    const notes = await notesModel.findOne({ _id: id })
      .populate({
     
        path: 'createdBy',
        select: 'name'   
      });

    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "success" ,notes});
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
};