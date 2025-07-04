import { useState, useEffect } from "react";
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import DebugPanel from './components/DebugPanel';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from Local Storage when component mounts
  useEffect(() => {
    console.log('🔄 Loading tasks from localStorage...');
    const savedTasks = localStorage.getItem('my-tasks');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        console.log('✅ Tasks loaded successfully:', parsedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('❌ Error loading tasks from localStorage:', error);
        setTasks([]);
      }
    } else {
      console.log('ℹ️ No tasks found in localStorage');
    }
    
    setIsLoaded(true);
  }, []);

  // Save tasks to Local Storage whenever the list changes
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Saving tasks to localStorage:', tasks);
      localStorage.setItem('my-tasks', JSON.stringify(tasks));
      console.log('✅ Tasks saved successfully');
    }
  }, [tasks, isLoaded]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      createdAt: new Date().toISOString()
    };
    console.log('➕ Adding new task:', newTask);
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (id, newText) => {
    console.log('✏️ Editing task:', id, 'with text:', newText);
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, text: newText, updatedAt: new Date().toISOString() } 
        : task
    ));
  };

  const handleDeleteTask = (id) => {
    console.log('🗑️ Deleting task:', id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      console.log('🧹 Clearing all tasks');
      setTasks([]);
    }
  };

  // Debug function
  window.debugTasks = () => {
    console.log('📊 Current tasks state:', tasks);
    console.log('💾 localStorage content:', localStorage.getItem('my-tasks'));
    console.log('🔄 Is loaded:', isLoaded);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%239C92AC%27 fill-opacity=%270.1%27%3E%3Ccircle cx=%2730%27 cy=%2730%27 r=%274%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-start md:justify-center p-4 py-8 md:py-4">
          <div className="w-full max-w-4xl">
            {/* Header - Responsivo */}
            <div className="text-center mb-6 md:mb-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                My Tasks
              </h1>
              <p className="text-lg md:text-xl text-purple-200 font-light px-4">
                Organize your life, one task at a time
              </p>
            </div>

            {/* Main Card - Responsivo */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 p-4 md:p-8">
              {/* Stats Bar - Responsivo */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 space-y-2 sm:space-y-0">
                <div className="text-white text-center sm:text-left">
                  <span className="text-xl md:text-2xl font-bold">{tasks.length}</span>
                  <span className="text-purple-200 ml-2">
                    {tasks.length === 1 ? 'Task' : 'Tasks'}
                  </span>
                </div>
                {tasks.length > 0 && (
                  <button
                    onClick={clearAllTasks}
                    className="px-3 md:px-4 py-2 bg-red-500/20 text-red-300 rounded-lg md:rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30 text-sm md:text-base"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Task Input - Responsivo */}
              <div className="mb-6 md:mb-8">
                <TaskInput onAddTask={handleAddTask} />
              </div>

              {/* Task List - Responsivo */}
              <div className="space-y-3 md:space-y-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-12 md:py-16">
                    <div className="text-5xl md:text-6xl mb-4">📝</div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-purple-200 px-4">
                      Add your first task to get started!
                    </p>
                  </div>
                ) : (
                  <TaskList 
                    tasks={tasks} 
                    onEditTask={handleEditTask} 
                    onDeleteTask={handleDeleteTask} 
                  />
                )}
              </div>
            </div>

            {/* Footer - Responsivo */}
            <div className="text-center mt-6 md:mt-8 text-purple-200">
              <p className="text-sm md:text-base">by Caroline Almeida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel */}
      <DebugPanel tasks={tasks} />
    </>
  );
}

export default App;
