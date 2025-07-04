import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

function TaskItem({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditingText(task.text);
  };

  const handleSave = () => {
    if (editingText.trim() !== '') {
      onEdit(task.id, editingText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingText(task.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
      {isEditing ? (
        <div className="flex items-center gap-3">
          <input
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            autoFocus
          />
          <button 
            onClick={handleSave}
            className="p-3 bg-green-500/20 text-green-300 rounded-xl hover:bg-green-500/30 transition-all duration-200 border border-green-500/30"
            title="Save"
          >
            <FiCheck className="text-lg" />
          </button>
          <button 
            onClick={handleCancel}
            className="p-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30"
            title="Cancel"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-white text-lg font-medium flex-1 mr-4">
            {task.text}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={handleEdit}
              className="p-3 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30"
              title="Edit"
            >
              <FiEdit2 className="text-lg" />
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30"
              title="Delete"
            >
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;