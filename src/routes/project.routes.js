import { createProject } from "../controllers/project.controller.js";
import { Router } from "express";

const projectRouter = Router();

projectRouter.route("/express").get(createProject);

export {projectRouter}
