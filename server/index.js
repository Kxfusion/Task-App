"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_service_1 = require("./services/task-service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 4444;
const isTaskRequest = (task) => {
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
};
app.get('/tasks', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, task_service_1.getTasks)();
    res.json(tasks);
}));
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(JSON.stringify(req.body));
    if (isTaskRequest(req.body)) {
        yield (0, task_service_1.createTask)(req.body);
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}));
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    if (isTaskRequest(req.body) && Number.isSafeInteger(id)) {
        yield (0, task_service_1.updateTask)(id, req.body);
    }
    res.status(200);
}));
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    if (Number.isSafeInteger(id)) {
        yield (0, task_service_1.deleteTask)(id);
    }
    res.status(200);
}));
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
