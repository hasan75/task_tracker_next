import { useState } from 'react';
import { addTask } from '@/utils/apis';

const AddTask = ({ onTaskAdded }) => {
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
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-950 disabled:bg-blue-300 transition-colors"
                >
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default AddTask;