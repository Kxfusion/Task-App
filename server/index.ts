import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from './services/task-service';
const app = express();
app.use(express.json());
const port = 4444;

type TaskRequest = {
    title: string;
    color: string;
    completed: boolean;
};

const isTaskRequest = (task: Partial<TaskRequest>): task is TaskRequest => {
    if (!task) {
        return false;
    }

    if (!('title' in task) || typeof task.title !== 'string') {
        return false;
    }

    if (!('color' in task) || typeof task.color !== 'string') {
        return false;
    }

    if (!('completed' in task) || typeof task.completed !== 'boolean') {
        return false;
    }

    return true;
}

app.get('/tasks', async (_, res) => {
    const tasks = await getTasks();

    console.log(tasks);

    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    if (isTaskRequest(req.body)) {
        await createTask(req.body);
        res.status(200).json();
    } else {
        res.status(400).json();
    }
});

app.put('/tasks/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (isTaskRequest(req.body) && Number.isSafeInteger(id)) {
        await updateTask(id, req.body);
    }

    res.status(200).json();
});

app.delete('/tasks/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isSafeInteger(id)) {
        await deleteTask(id);
    }

    res.status(200).json();
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

module.exports = app;
