import TaskItem from './TaskItem';

function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="output-list">
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;