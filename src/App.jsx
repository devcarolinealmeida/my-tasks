import { useState } from "react";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: input
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const handleSaveEdit = (id) => {
    if (editingText.trim() !== '') {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, text: editingText } : task
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <input
        value={input}
        title="Enter a new task"
        placeholder="Add a new task"
        style={{ width: '300px', padding: '8px', marginRight: '10px' }}
        type="text"
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleAdd} title="Add a new task">Add</button>
      <div className="output-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              {editingId === task.id ? (
                <>
                  <input
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button onClick={() => handleSaveEdit(task.id)} title="Save">
                    <MdSave />
                  </button>
                  <button onClick={handleCancelEdit} title="Cancel">
                    <MdCancel />
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{task.text}</span>
                  <button onClick={() => handleEdit(task.id, task.text)} title="Edit">
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDelete(task.id)} title="Delete">
                    <MdDelete />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
