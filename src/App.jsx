import { useState } from "react";
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList 
        tasks={tasks} 
        onEditTask={handleEditTask} 
        onDeleteTask={handleDeleteTask} 
      />
    </>
  );
}

export default App;
