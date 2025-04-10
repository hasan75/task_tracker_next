import { useState, useEffect } from 'react';
import { toggleTaskCompletion, deleteTask } from '@/utils/apis';
import { FiCheck, FiTrash2 } from 'react-icons/fi';

const TaskList = ({ tasks, loading, onTasksUpdated }) => {
    const [localTasks, setLocalTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (tasks) {
            setLocalTasks(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    useEffect(() => {
        const cachedTasks = localStorage.getItem('tasks');
        if (cachedTasks) {
            setLocalTasks(JSON.parse(cachedTasks));
        }
    }, []);

    const handleToggle = async (id: string) => {
        try {
            await toggleTaskCompletion(id);
            onTasksUpdated();
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            onTasksUpdated();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    if (loading) return <p>Loading tasks...</p>;

    return (
        <ul className="space-y-2">
            {localTasks.map((task) => (
                <li
                    key={task.id}
                    className={`p-4 border rounded-lg flex justify-between items-center ${
                        task.completed ? 'bg-gray-50' : 'bg-white'
                    }`}
                >
          <span
              className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
          >
            {task.title}
          </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleToggle(task.id)}
                            className={`p-2 rounded-full ${
                                task.completed
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-600'
                            } hover:bg-opacity-80 transition-colors`}
                            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                            <FiCheck />
                        </button>
                        <button
                            onClick={() => handleDelete(task.id)}
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80 transition-colors"
                            aria-label="Delete task"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;