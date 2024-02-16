import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkRequestBodyParams } from "../middleware/Validators";
import { saveClientDetails,updateClients,filterClientdetails,filterclient, filterdetails } from "../controller/datingApp.controller";
const router:Router=Router()

router.post("/",
    basicAuthUser,
    saveClientDetails
);
router.put("/",
    basicAuthUser,
    checkRequestBodyParams("_id"),
    updateClients
);
router.put("/filterclient",
    basicAuthUser,
    filterClientdetails
);
router.put("/reducefilter",
    basicAuthUser,
    filterclient
);
router.put("/filterdetails",
    basicAuthUser,
    filterdetails
);
export default router;