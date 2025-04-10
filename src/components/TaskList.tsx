'use client';

import { useState, useEffect } from 'react';
import { toggleTaskCompletion, deleteTask } from '@/utils/apis';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ConfirmationDialog from '@/components/ConfirmationDialog';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    loading: boolean;
    onTasksUpdated: () => void;
    setExistingTasks: (titles: string[]) => void;
}

export default function TaskList({ tasks, loading, onTasksUpdated, setExistingTasks }: TaskListProps) {
    const [localTasks, setLocalTasks] = useState<Task[]>([]);
    const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

    // Sort tasks with completed ones at the bottom
    useEffect(() => {
        const sorted = [...localTasks].sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
        setSortedTasks(sorted);
    }, [localTasks]);

    // Update existing tasks when tasks change
    useEffect(() => {
        if (tasks) {
            setLocalTasks(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            setExistingTasks(tasks.map(task => task.title));
        }
    }, [tasks, setExistingTasks]);

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

            // Optimistic UI update
            setLocalTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, completed: updatedTask.completed } : task
                )
            );

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
            );
        } catch (error) {
            console.error('Failed to toggle task:', error);
            toast.error('Failed to update task status', {
                style: {
                    background: '#0a1a2f',
                    color: '#fff',
                    border: '1px solid #ff4d4f',
                },
            });
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
            });
        } catch (error) {
            console.error('Failed to delete task:', error);
            toast.error('Failed to delete task', {
                style: {
                    background: '#0a1a2f',
                    color: '#fff',
                    border: '1px solid #ff4d4f',
                },
            });
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading tasks...</p>;

    return (
        <ul className="space-y-3">
            {sortedTasks.map((task, index) => {
                // Check if we need to show the divider
                const showDivider = task.completed &&
                    (index === 0 || !sortedTasks[index - 1].completed);

                return (
                    <div key={task.id}>
                        {showDivider && (
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 py-1 bg-white text-sm text-gray-500 rounded-md">
                                        Completed Tasks
                                    </span>
                                </div>
                            </div>
                        )}
                        <li
                            className={`p-4 rounded-lg flex justify-between items-center transition-all duration-300 ease-in-out ${
                                task.completed
                                    ? 'bg-gray-200 shadow border border-gray-300'
                                    : 'bg-white border border-sky-200 shadow-sm'
                            }`}
                        >
                            <span
                                className={`flex-1 ${
                                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                }`}
                            >
                                {task.title}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggle(task.id)}
                                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                                        task.completed
                                            ? 'bg-green-300 text-sky-900 hover:bg-green-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                    title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                                    aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                                >
                                    <FiCheck size={18} />
                                </button>
                                <ConfirmationDialog
                                    trigger={
                                        <button
                                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
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
                    </div>
                );
            })}
        </ul>
    );
};