import { Router } from "express";
import { createFaq } from "../controller/faq.controller";
import { basicAuthUser } from "../middleware/checkAuth";
const router:Router=Router()

router.post('/',
basicAuthUser,
createFaq)
export default router;