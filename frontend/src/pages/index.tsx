import { useEffect, useState } from 'react';
import TaskCard from '@/components/TaskCard';
import { fetchTasks, addTask, toggleTask, deleteTask } from '@/services/api';

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!title || !description) return;
    await addTask({ title, description });
    setTitle('');
    setDescription('');
    loadTasks();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Restomart Task Manager</h1>
        <div className="bg-white shadow p-4 rounded mb-6">
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Add Task
          </button>
        </div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}
