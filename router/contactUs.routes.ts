import { Router } from "express";
import { contactForm } from "../controller/contactUs.controller";
import { checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router:Router=Router();

router.post('/',
    basicAuthUser,
    contactForm
);

export default router;