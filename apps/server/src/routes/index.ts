import { Router } from "express";
import siteRouter from "./site.router";

const router = Router();

router.use("/site", siteRouter);

export default router;
