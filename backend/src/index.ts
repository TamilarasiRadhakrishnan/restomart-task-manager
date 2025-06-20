import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// GET all tasks
app.get("/tasks", async (_: Request, res: Response) => {
  const tasks = await AppDataSource.getRepository(Task).find();
  res.json(tasks);
});

// POST new task
app.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  const task = new Task();
  task.title = title;
  task.isCompleted = false;

  await AppDataSource.getRepository(Task).save(task);
  res.status(201).json(task);
});

// PUT update task
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;

  const taskRepo = AppDataSource.getRepository(Task);
  const task = await taskRepo.findOneBy({ id: parseInt(id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title ?? task.title;
  task.isCompleted = isCompleted ?? task.isCompleted;
  await taskRepo.save(task);

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const taskRepo = AppDataSource.getRepository(Task);
  const task = await taskRepo.findOneBy({ id: parseInt(id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await taskRepo.remove(task);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is runnin
