import { useState } from 'react';
import { addTask } from '@/utils/apis';
import toast from 'react-hot-toast';

interface AddTaskProps {
    onTaskAdded: () => void;
    existingTasks: string[];
}

export default function AddTask({ onTaskAdded, existingTasks }: AddTaskProps) {
    const [title, setTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            toast.error('Task title cannot be empty');
            return;
        };

        // Check for duplicates (case-insensitive)
        const isDuplicate = existingTasks.some(
            task => task.toLowerCase() === trimmedTitle.toLowerCase()
        );

        if (isDuplicate) {
            toast.error('This task already exists!');
            return;
        };

        setIsLoading(true);
        try {
            await addTask(trimmedTitle);
            setTitle('');
            onTaskAdded();
            toast.success('Task added successfully!');
        } catch (error) {
            console.error('Failed to add task:', error);
            toast.error('Failed to add task');
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 border border-sky-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-950 disabled:opacity-50 transition-colors cursor-pointer"
                >
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};