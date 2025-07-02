import React, { useState } from "react";
import { updateNotes } from "../api";

const NotesModal = ({ open, onClose, problem }) => {
  const [note, setNote] = useState(problem?.notes || "");

  const handleSave = async () => {
    await updateNotes(problem.id, note);
    onClose(true); // true = refetch data
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Notes</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button onClick={() => onClose(false)} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
