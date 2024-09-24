
const API_BASE_URL = 'http://localhost:5000'

// Simple service for handling notes
const noteService = {

    // Save note API request
    saveNote: async (noteContent) => {
      try{
        const response = await fetch(`${API_BASE_URL}/notes`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({content: noteContent}),
        });

        const data = await response.json();
        return data;
      }catch(error){
        console.error('Error saving note:', error);
      }
    },

    // Update note API request
    updateNote: async (note) => {
      console.log(note);
      try{
        const response = await fetch(`${API_BASE_URL}/notes/${note.id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: note.content }),
        });

        const data = await response.json();
        return data;
      } catch (error){
        console.error('Error updating note:', error);
      }
    },

    // Get all notes API request
    getNotes: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        const data = await response.json();
        return data; // Returns the array of notes
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },

    // Get note by uuid API request
    getNote: async (uuid) => {
      try {
        const response = await fetch(`${API_BASE_URL}/notes/${uuid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        const data = await response.json();
        return data; // Returns the array of notes
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },

    // Delete a note on the backend API request
    deleteNote: async (id) => {
      try {
        await fetch(`${API_BASE_URL}/notes/${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    },

    // Schedule a reminder for a note via backend API request
    setReminder: async (noteId, email, reminderDt) => {
      try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}/reminder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reminder_time: reminderDt, email: email, timezone: userTimezone }), // Assuming you are sending an email for the reminder
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error setting reminder:', error);
      }
    }
  };
  
  export default noteService;
  