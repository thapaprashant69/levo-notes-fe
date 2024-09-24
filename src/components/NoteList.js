import React, { useEffect, useState } from "react";
import './NoteList.css';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ReminderModal from "./ReminderModal";

const NoteList = ({ notes, setSelectedNote, handleDeleteNote, updateNotes, handleReminder }) => {
  const [search, setSearch] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const navigate = useNavigate();

  // Load data on pageload
  useEffect(() => {
    updateNotes();
  }, []);

  // Handles note click for update
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    navigate(`/edit/${note.id}`);
  };

  // Handles create note button click
  const createNote = () => {
    setSelectedNote(null);n
    navigate('/create');
  };

  // Open the reminder modal for a specific note
  const handleReminderModal = (noteId) => {
    setSelectedNoteId(noteId);
    setShowReminderModal(true);
  };

  // Close the reminder modal
  const closeReminderModal = () => {
    setShowReminderModal(false);
    setSelectedNoteId(null);
  };

  return (
    <div className="note-container">
      <Header page="Notes List" />
      <input
        type="text"
        className="search-input"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="note-list">
        {notes
          .filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
          .map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-content" onClick={() => handleSelectNote(note)}>
                {note.content.substring(0, 50)}...
              </div>
              <div className="note-actions">
                <button className="action-button delete-button" onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </button>
                <button className="action-button" onClick={() => handleReminderModal(note.id)}>
                  Set Reminder
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="home-buttons">
        <div className="create-note">
          <button className="action-button" onClick={createNote}>
            Create Note
          </button>
        </div>
      </div>

      {/* ReminderModal Component */}
      {showReminderModal && (
        <ReminderModal 
          noteId={selectedNoteId} 
          onClose={closeReminderModal} 
          handleReminder={handleReminder} 
        />
      )}
    </div>
  );
};

export default NoteList;
