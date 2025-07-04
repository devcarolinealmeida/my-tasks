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
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <input
        value={input}
        placeholder="Enter a new task..."
        className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-base sm:text-lg"
        type="text"
        onChange={e => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        onClick={handleAdd}
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl sm:rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 font-semibold text-base sm:text-lg"
      >
        <FiPlus className="text-lg sm:text-xl" />
        <span className="sm:inline">Add Task</span>
      </button>
    </div>
  );
}

export default TaskInput;