import { useState } from "react";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

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

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      {isEditing ? (
        <>
          <input
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={handleSave} title="Save">
            <MdSave />
          </button>
          <button onClick={handleCancel} title="Cancel">
            <MdCancel />
          </button>
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{task.text}</span>
          <button onClick={handleEdit} title="Edit">
            <MdEdit />
          </button>
          <button onClick={() => onDelete(task.id)} title="Delete">
            <MdDelete />
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;