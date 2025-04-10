'use client';

import { useState, useEffect } from 'react';
import { toggleTaskCompletion, deleteTask } from '@/utils/apis';
import { FiCheck, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ConfirmationDialog from '@/components/ConfirmationDialog';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[]
    loading: boolean
    onTasksUpdated: () => void
}

export default function TaskList({ tasks, loading, onTasksUpdated }: TaskListProps) {
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
            const updatedTask = await toggleTaskCompletion(id);
            onTasksUpdated();
            toast.success(
                `Task marked as ${updatedTask.completed ? 'complete' : 'incomplete'}!`,
                {
                    icon: updatedTask.completed ? '✅' : '⬜',
                    style: {
                        background: '#0a1a2f',
                        color: '#fff',
                        border: '1px solid #00DC82',
                    },
                }
            )
        } catch (error) {
            console.error('Failed to toggle task:', error);
            toast.error('Failed to update task status', {
                style: {
                    background: '#0a1a2f',
                    color: '#fff',
                    border: '1px solid #ff4d4f',
                },
            })
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            onTasksUpdated();
            toast.success('Task deleted successfully!', {
                icon: '🗑️',
                style: {
                    background: '#0a1a2f',
                    color: '#fff',
                    border: '1px solid #00DC82',
                },
            })
        } catch (error) {
            console.error('Failed to delete task:', error);
            toast.error('Failed to delete task', {
                style: {
                    background: '#0a1a2f',
                    color: '#fff',
                    border: '1px solid #ff4d4f',
                },
            });
        };
    };

    if (loading) return <p className="text-center text-gray-600">Loading tasks...</p>

    return (
        <ul className="space-y-3">
            {localTasks.map((task) => (
                <li
                    key={task.id}
                    className={`p-4 rounded-lg flex justify-between items-center transition-all ${
                        task.completed
                            ? 'bg-gray-50 border border-sky-900 shadow'
                            : 'bg-white border border-sky-800 shadow-lg'
                    }
                    `}
                >
          <span
              className={`flex-1 ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
          >
            {task.title}
          </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleToggle(task.id)}
                            className={`p-2 rounded-full transition-colors cursor-pointer ${
                                task.completed
                                    ? 'bg-green-700 text-white hover:bg-green-50 hover:text-gray-800'
                                    : 'bg-green-50 text-gray-800 hover:bg-green-600 hover:text-white'
                            }`}
                            title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                            <FiCheck size={18} />
                        </button>

                        <ConfirmationDialog
                            trigger={
                                <button
                                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-300 hover:text-red-500 transition-colors cursor-pointer"
                                    aria-label="Delete task"
                                    title="Delete task"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            }
                            title="Delete Task"
                            description="Are you sure you want to delete this task? This action cannot be undone."
                            onConfirm={() => handleDelete(task.id)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};