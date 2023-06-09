const express = require("express");
const taskControllers = require("./controllers/tasksControllers");

const router = express.Router();

router.get("/task", taskControllers.getAll);

module.exports = router;
