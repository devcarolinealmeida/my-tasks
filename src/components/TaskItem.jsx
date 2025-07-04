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
    <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <input
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full flex-1 px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/30 rounded-lg md:rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm md:text-base"
            autoFocus
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={handleSave}
              className="flex-1 sm:flex-none p-2 md:p-3 bg-green-500/20 text-green-300 rounded-lg md:rounded-xl hover:bg-green-500/30 transition-all duration-200 border border-green-500/30"
              title="Save"
            >
              <FiCheck className="text-base md:text-lg mx-auto" />
            </button>
            <button 
              onClick={handleCancel}
              className="flex-1 sm:flex-none p-2 md:p-3 bg-red-500/20 text-red-300 rounded-lg md:rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30"
              title="Cancel"
            >
              <FiX className="text-base md:text-lg mx-auto" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <span className="text-white text-base md:text-lg font-medium flex-1 mr-2 break-words">
            {task.text}
          </span>
          <div className="flex gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            <button 
              onClick={handleEdit}
              className="p-2 md:p-3 bg-blue-500/20 text-blue-300 rounded-lg md:rounded-xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30"
              title="Edit"
            >
              <FiEdit2 className="text-sm md:text-lg" />
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-2 md:p-3 bg-red-500/20 text-red-300 rounded-lg md:rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30"
              title="Delete"
            >
              <FiTrash2 className="text-sm md:text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;