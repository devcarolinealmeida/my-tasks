import { useState } from "react";
import { FiPlus } from "react-icons/fi";

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
    <div className="flex gap-4">
      <input
        value={input}
        placeholder="Enter a new task..."
        className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-lg"
        type="text"
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button 
        onClick={handleAdd}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-semibold"
      >
        <FiPlus className="text-xl" />
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;