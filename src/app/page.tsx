'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getTasks } from '@/utils/apis';
import Spinner from '@/components/Spinner';
import AddTask from '@/components/AddTask';
import TaskList from '@/components/TaskList';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [existingTasks, setExistingTasks] = useState<string[]>([]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
      <div className="py-4">
        <Head>
          <title>Task Tracker</title>
          <meta name="description" content="A simple task tracking application" />
        </Head>

        <main className="container mx-auto px-4 max-w-md min-h-[550px] min-w-[450px] bg-gray-100 py-8 rounded-md shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Tracker</h1>

          <AddTask
              onTaskAdded={fetchTasks}
              existingTasks={existingTasks}
          />

          {error && (
              <div className="p-4 mb-4 bg-red-900/50 text-red-100 rounded-lg border border-red-700">
                {error}
              </div>
          )}

          {loading && tasks.length === 0 ? (
              <Spinner />
          ) : (
              <TaskList
                  tasks={tasks}
                  loading={loading}
                  onTasksUpdated={fetchTasks}
                  setExistingTasks={setExistingTasks}
              />
          )}
        </main>
      </div>
  );
};