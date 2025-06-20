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
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const Task_1 = require("./entity/Task");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    const taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
    // GET /tasks - Fetch all tasks
    app.get("/tasks", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield taskRepository.find();
        res.json(tasks);
    }));
    // POST /tasks - Create a new task
    app.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, status, dueDate } = req.body;
        if (!title || !status) {
            return res.status(400).json({ error: "Title and status are required" });
        }
        const newTask = taskRepository.create({
            title,
            description,
            status,
            dueDate,
        });
        const result = yield taskRepository.save(newTask);
        res.status(201).json(result);
    }));
    // PUT /tasks/:id - Update a task
    app.put("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const task = yield taskRepository.findOneBy({ id });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        Object.assign(task, req.body);
        const result = yield taskRepository.save(task);
        res.json(result);
    }));
    // DELETE /tasks/:id - Delete a task
    app.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield taskRepository.delete({ id });
        if (result.affected === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(204).send();
    }));
    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ Failed to initialize data source", err);
});
