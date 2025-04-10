import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get<Task[]>(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const addTask = async (title: string): Promise<Task> => {
    try {
        const response = await axios.post<Task>(`${API_URL}/tasks`, { title });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

export const toggleTaskCompletion = async (id: string): Promise<Task> => {
    try {
        const response = await axios.put<Task>(`${API_URL}/tasks/${id}/complete`);
        return response.data;
    } catch (error) {
        console.error('Error toggling task:', error);
        throw error;
    }
};

export const deleteTask = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};