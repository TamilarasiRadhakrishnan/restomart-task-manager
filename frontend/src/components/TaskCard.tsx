import React from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

const TaskCard = ({ task, onToggle, onDelete }: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Status: {task.isCompleted ? "✅ Done" : "❌ Pending"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onToggle(task.id)} className="text-sm px-2 py-1 bg-blue-500 text-white rounded">Toggle</button>
          <button onClick={() => onDelete(task.id)} className="text-sm px-2 py-1 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
