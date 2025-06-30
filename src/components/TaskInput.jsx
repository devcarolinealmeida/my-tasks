import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      onAddTask(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <input
        value={input}
        title="Enter a new task"
        placeholder="Add a new task"
        style={{ width: '300px', padding: '8px', marginRight: '10px' }}
        type="text"
        onChange={e => setInput(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button onClick={handleAdd} title="Add a new task">Add</button>
    </div>
  );
}

export default TaskInput;