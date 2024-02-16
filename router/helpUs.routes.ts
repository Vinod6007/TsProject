import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { helpUs } from "../controller/helpUs.conroller";


const router : Router=Router() 

router.post("/",
basicAuthUser,
helpUs
);
export default router;