const express = require("express");
const router = express.Router();

const taskControllers = require("./controllers/tasksControllers");
const taskMiddlewares = require("./middlewares/taskMiddleware");

router.get("/task", taskControllers.getAll);
router.post("/task", taskMiddlewares.validateTitle, taskControllers.createTask);
router.delete("/task/:id", taskControllers.deleteTask);
router.put(
  "/task/:id",
  taskMiddlewares.validateStatus,
  taskControllers.updateTask
);

module.exports = router;
