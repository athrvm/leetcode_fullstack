const express = require('express');
const adminMiddleware = require('../middlewares/adminMiddleware');
const problemRouter = express.Router();

// Create
// fetch
// update
// delete 

// These three endpoints rquire admin access.
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.patch("/:id", updateProblem);
problemRouter.delete("/:id", deleteProblem);


problemRouter.get("/:id", getProblemById);
problemRouter.get("/", getAllProblem);
problemRouter.get("/user", solvedAllProblembyUser);

