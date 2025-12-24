import { Router } from "express";
import messagesRoutes from "./messages.routes";

const router = Router();

router.use(messagesRoutes);

export default router;
