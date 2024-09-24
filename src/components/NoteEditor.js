import React, { useState, useEffect, useRef } from "react";
import './NoteEditor.css';
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const NoteEditor = ({ notes, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const DEBOUNCE_DELAY = 1000; 

  // Get selected note if notes are passed and defined
  const selectedNote = notes ? notes.find(note => note.id === id) : null;

  const [noteContent, setNoteContent] = useState(selectedNote ? selectedNote.content : "");
  const lastSavedContent = useRef(noteContent);  // Track the last saved content to avoid unnecessary saves
  const debounceTimeout = useRef(null);

  // Debounce save on typing
  useEffect(() => {
    // Clearing previous debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new debounce timer
    debounceTimeout.current = setTimeout(async () => {
      if (noteContent !== lastSavedContent.current) {
        const note_details = { id, content: noteContent };
        await onSave(note_details);
        lastSavedContent.current = noteContent;
      }
    }, DEBOUNCE_DELAY);

    // Cleanup the debounce timer on component unmount
    return () => clearTimeout(debounceTimeout.current);
  }, [noteContent]);

  // Handle manual save button click
  const handleImmediateSave = async () => {
    const note_details = { id, content: noteContent };
    if (noteContent !== lastSavedContent.current) {
      await onSave(note_details);
      lastSavedContent.current = noteContent;
    }
    navigate('/');
  };

  return (
    <div className="note-editor">
      <Header page={selectedNote ? "Edit Note" : "Create Note"} />
      <textarea
        className="note-input"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Write your note here..."
      />
      <button className="save-button" onClick={handleImmediateSave}>
        Save Note
      </button>
    </div>
  );
};

export default NoteEditor;
