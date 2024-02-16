import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkRequestBodyParams } from "../middleware/Validators";
import { savePrivacyPolicy,updatePrivacyPolicy,getPrivacyPolicy } from "../controller/privacyPolicy.contriller";
const router:Router=Router()

router.post("/",
    basicAuthUser,
    savePrivacyPolicy
);
router.put("/",
    basicAuthUser,
    checkRequestBodyParams("_id"),
    updatePrivacyPolicy
);
router.get("/",
    basicAuthUser,
    getPrivacyPolicy
);
export default router;