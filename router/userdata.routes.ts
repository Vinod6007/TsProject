import { Router } from "express";
import {  saveUser,updateUser,findSingleUser,findAllUser,deleteUser,blockedUser,unBlockedUser,follower,unfollow,getFollowersDetails,findFollowing,showBlockedUser,searchUser,comparePassword,savePost,unSavePost,feedPage} from "../controller/userdataController";
import { checkParam, checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('password'),
    saveUser

);
router.put("/",
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateUser
);
router.get("/",
    basicAuthUser,
    checkQuery('_id'),
    findSingleUser
);

router.get("/findAll",
    basicAuthUser,
    findAllUser)

router.delete("/",
    basicAuthUser,
    checkQuery('_id'),
    deleteUser
);

router.put("/blockUser",
    basicAuthUser,
    checkRequestBodyParams('_id'),
    blockedUser
);

router.put("/unblockUser",
    basicAuthUser,
    checkRequestBodyParams("_id"),
    unBlockedUser
);

router.put("/follow",
    basicAuthUser,
    checkRequestBodyParams('_id'),
    follower
);

router.put("/unfollow",
    basicAuthUser,
    checkRequestBodyParams('_id'),
    unfollow
);


 
router.get("/following",
    basicAuthUser,
    checkQuery('_id'),
    findFollowing
);

router.get("/getfollow",
basicAuthUser,
checkQuery('_id'),
getFollowersDetails
);

router.get("/getAllBlock",
    basicAuthUser,
    checkQuery("_id"),
    showBlockedUser
);

router.get("/search",
    basicAuthUser,
    checkQuery('userName'),
    searchUser
);

router.get("/compare",
    basicAuthUser,
    checkRequestBodyParams("_id"),
    checkRequestBodyParams("password"),
    comparePassword
);

router.get("/savePost",
    basicAuthUser,
    checkQuery("_id"),
    checkParam("postId"),
    savePost
);

router.get("/unSavePost",
    basicAuthUser,
    checkQuery("_id"),
    checkParam("postId"),
    unSavePost
);
router.get("/feedPage",
    basicAuthUser,
    checkQuery("_id"),
    feedPage
);
export default router;