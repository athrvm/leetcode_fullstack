const express = require('express');

const problemRouter =  express.Router();

// Create
// fetch
// update
// delete 

// These three endpoints rquire admin access.
problemRouter.post("/create",problemCreate);
problemRouter.patch("/:id", problemUpdate);
problemRouter.delete("/:id",problemDelete);


problemRouter.get("/:id",problemFetch);
problemRouter.get("/", getAllProblem);
problemRouter.get("/user", solvedProblem);

