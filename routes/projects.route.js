import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import ProjectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/projects", ProjectController.create);
router.get("/projects", auth, ProjectController.index);
router.get("/projects/status", ProjectController.indexProjectStatus);
router.get("/projects/members/roles", ProjectController.indexProjectMemberRole);
router.get("/projects/:id", auth, ProjectController.show);
router.get("/projects/:id/members", ProjectController.indexProjectMembers);
router.get(
  "/projects/:id/issuesStatusCount",
  ProjectController.showIssuesStatusCount
);
router.post("/projects/:id/members", ProjectController.createProjectMember);
router.post("/projects/:id/members/invite", auth, ProjectController.invite);
router.get("/projects/:id/members/confirm", ProjectController.confirmInvite);
router.patch("/projects/:id", auth, ProjectController.update);
router.delete("/projects/:id", ProjectController.destroy);

export default router;
