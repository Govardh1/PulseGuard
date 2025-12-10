import { Router } from "express";
const router =Router()
import userRouter from "./users"
import websiteRouter from "./websites"

router.use("/user",userRouter)
router.use("/website",websiteRouter)

export default router;