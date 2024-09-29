import { Router } from "express";
import { createSite } from "../controllers/site.controller";

const siteRouter = Router();

siteRouter.post("/create", createSite);

export default siteRouter;
