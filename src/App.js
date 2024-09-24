import { useEffect, useState } from 'react';
import './App.css';
import NoteList from './components/NoteList.js';
import noteService from './services/NoteService.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteEditor from "./components/NoteEditor";

function App(){
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch all notes on page load
  useEffect(() => {
    updateNotes();
  }, []);
  
  const updateNotes = async() => {
    const fetchedNotes = await noteService.getNotes();
    setNotes(Object.values(fetchedNotes));
  }

  // Function to delete a note and update state
  const handleDeleteNote = async (id) => {
    await noteService.deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  
  // Function to handle save note
  const handleSaveNote = async (note_obj) => {
    if (note_obj.id) {
      await noteService.updateNote(note_obj);
    } else {
      const newNote = await noteService.saveNote(note_obj.content);
      updateNotes();
      return newNote;
    }
  };

  // Function to handle reminder invoke
  const handleReminder = (id, email, reminderDt) => {
    noteService.setReminder(id, email, reminderDt);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notes} setSelectedNote={setSelectedNote} handleDeleteNote={handleDeleteNote} updateNotes={updateNotes} handleReminder={handleReminder}/>}
        />
        <Route
          path="/edit/:id"
          element={<NoteEditor notes={notes} onSave={handleSaveNote} />}
        />
        <Route
          path="/create"
          element={<NoteEditor selectedNote={null} onSave={handleSaveNote} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
