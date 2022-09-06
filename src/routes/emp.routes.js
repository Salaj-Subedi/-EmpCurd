const express = require("express");
const { returnOne, returnAll, create, deleted, updates } = require("../controllers/emp.cntl");
const auth = require ("../middlewares/auth.mdl")
const empRouter = express.Router();

empRouter.post("/",auth, create);
empRouter.get("/:id",auth,returnOne);
empRouter.get("/",auth, returnAll); // any user can access all data needs debug
empRouter.delete("/:id",auth,deleted);
empRouter.put("/:id",auth,updates)

module.exports = empRouter;

// app.post("/emps", emps.create);
//   app.get("/emps/:empID", emps.returnOne);
//   app.get("/emps", emps.returnAll);
//   app.put("/emps/:empID", emps.updates);
//   app.delete("/emps/:empID", emps.deleted);
