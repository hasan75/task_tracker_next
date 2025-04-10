interface Task {
    id: string;
    title: string;
    completed: boolean;
}

type TaskListProps = {
    tasks: Task[];
    loading: boolean;
    onTasksUpdated: () => void;
};

type AddTaskProps = {
    onTaskAdded: () => void;
};