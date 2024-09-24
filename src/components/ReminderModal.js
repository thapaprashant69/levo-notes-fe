import React, { useState } from "react";
import './ReminderModal.css';

const ReminderModal = ({ noteId, onClose, handleReminder }) => {
  const [email, setEmail] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  // Handle the reminder form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !reminderDate) {
      alert("Please enter both email and reminder date.");
      return;
    }

    // Call the parent component's reminder handler
    handleReminder(noteId, email, reminderDate);

    // Close the modal
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Set Reminder</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>
          <label>
            Reminder Date and Time:
            <input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit">Set Reminder</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;
