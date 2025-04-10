import { useState } from 'react';
import { addTask } from '@/utils/apis';

export default function AddTask ({ onTaskAdded }){
    const [title, setTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsLoading(true);
        try {
            await addTask(title);
            setTitle('');
            onTaskAdded();
        } catch (error) {
            console.error('Failed to add task:', error);
        } finally {
            setIsLoading(false);
        }
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