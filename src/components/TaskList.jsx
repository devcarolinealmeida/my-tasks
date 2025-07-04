import TaskItem from './TaskItem';

function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div 
          key={task.id}
          className="animate-in slide-in-from-left duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <TaskItem
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;