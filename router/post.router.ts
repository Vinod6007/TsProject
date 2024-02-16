import { Router } from "express";
import {
  createPost,
  reportPost,
  showAllPost,
  getSinglePost,
  deletePost,
  showAllReportPost,
  CreateComment,
  showComments,
  deleteComment,
  likeCount,
  unLike,
  trendingUrl,
  getTotalLikeCount,
  getLastFivePost,
  trendingPost,
} from "../controller/post.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
const router: Router = Router();

router.post(
  "/createpost",
  basicAuthUser,
  checkRequestBodyParams("userId"),
  createPost
);
router.put("/",
basicAuthUser, 
checkRequestBodyParams("_id"), reportPost);
router.get("/",
basicAuthUser,
showAllPost);

router.get("/singlePost", 
basicAuthUser, 
checkQuery("_id"), 
getSinglePost);

router.delete("/deletePost", 
basicAuthUser, checkQuery("_id"), 
deletePost);

router.get("/showAllReportPost", 
basicAuthUser, 
showAllReportPost);

router.put(
  "/createComment",
  basicAuthUser,
  checkRequestBodyParams("userid"),
  checkRequestBodyParams("postid"),
  CreateComment
);

router.get("/showComments", 
basicAuthUser, 
checkQuery("_id"), 
showComments);

router.delete(
  "/deleteComment",
  basicAuthUser,
  checkRequestBodyParams("_id"),
  deleteComment
);

router.put(
  "/likeCount",
  basicAuthUser,
  checkRequestBodyParams("_id"),
  likeCount
);

router.put("/unlike", 
basicAuthUser, 
checkRequestBodyParams("_id"), 
unLike);

router.get("/trendingUrl",
 basicAuthUser, 
 trendingUrl);

router.get("/getAllLikeCount", 
basicAuthUser, 
getTotalLikeCount);

router.get("/getLastFivePost", 
basicAuthUser, 
getLastFivePost);

router.get("/trendingPost", 
basicAuthUser, 
trendingPost);
export default router;
