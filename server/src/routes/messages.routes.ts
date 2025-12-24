import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messages.controller";

const router = Router();

router.get("/messages", getMessages);
router.post("/messages/send", sendMessage);

export default router;
