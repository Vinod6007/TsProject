import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Post, postDocument } from "../model/post.model";
import { UserData, userDataDocument } from "../model/userdataModel";

var activity = "post";
/***
 * @author Vinodhagan p
 * @date 06-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to create post
 */
export let createPost = async (req, res, next) => {
  let errors = validationResult(req);
  if (errors.isEmpty) {
    try {
      const postDetails: postDocument = req.body;
      const createPost = new Post(postDetails);
      const insertData = await createPost.save();
      if (insertData) {
        const data = await UserData.findByIdAndUpdate(
          { _id: req.body.userId },
          { $inc: { postCount: 1 } }
        );
            response(req,res,activity,"level-2","create-post",true,200,data,clientError.success.registerSuccessfully);
      } else {
            response(req,res,activity,"level-3","create-post",false,422,{},clientError.user.UserNotFound);
      }
    } catch (err) {
            response(req,res,activity,"Level-3","Save-Company",false,500,{},errorMessage.internalServer,err.message);
            }
  } else {
    response(req,res,activity,"level-3",
      "create-post",
      false,
      422,
      {},
      errorMessage.fieldValidation
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 06-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This is function used to report post
 */
export let reportPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty) {
    try {
      const user = await Post.findByIdAndUpdate(
        { _id: req.body._id },
        { $inc: { report: 1 } },
        { new: true }
      );
      const postDetails: postDocument = req.body;
      if (user.report >= 15) {
        const report = await Post.findOneAndUpdate(
          { _id: postDetails._id },
          { $set: { isDeleted: true } },
          { new: true }
        );
        response(
          req,
          res,
          activity,
          "level-2",
          "report-post",
          true,
          200,
          report,
          clientError.success.updateSuccess
        );
      } else {
        response(
          req,
          res,
          activity,
          "level-2",
          "report-post",
          true,
          200,
          user,
          clientError.success.updateSuccess
        );
      }
    } catch (err) {
      response(
        req,
        res,
        activity,
        "Level-3",
        "report-post",
        false,
        500,
        {},
        errorMessage.internalServer,
        err.message
      );
    }
  } else {
    response(
      req,
      res,
      activity,
      "level-3",
      "report-post",
      false,
      422,
      {},
      errorMessage.fieldValidation,
      JSON.stringify(errors.mapped())
    );
  }
};

/**
 * @author Vinodhagan p
 * @date 06-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @description This function is used to Show all post
 */
export let showAllPost = async (req, res, next) => {
  try {
    const allPost = await Post.find({ isDeleted: false });
    response(
      req,
      res,
      activity,
      "level-2",
      "show-post",
      true,
      200,
      allPost,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "show-post",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function}
 * @description This function used to get single post
 */
export let getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(
      { _id: req.query._id },
      { isDeleted: false }
    );
    response(
      req,
      res,
      activity,
      "level-2",
      "single-post",
      true,
      200,
      post,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "show-post",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author VinodhaganP
 * @date 02-07-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description  This function used to delete post
 */
export let deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: req.query._id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    response(
      req,
      res,
      activity,
      "level-2",
      "delete-post",
      true,
      200,
      post,
      clientError.success.updateSuccess
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "delete-post",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 06-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to ShowAllReportedPost
 */
export let showAllReportPost = async (req, res, next) => {
  try {
    const allReportPost = await Post.find({ report: { $gte: 15 } });
    response(
      req,
      res,
      activity,
      "level-2",
      "show-Allreport",
      true,
      200,
      allReportPost,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "show-post",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan P
 * @date 06-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This fuction used to create comments
 */
export let CreateComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty) {
    try {
      const data = await UserData.findOne(
        { _id: req.body.userid },
        { userName: 1 }
      );
      console.log(data);
      const usercomment = await Post.findByIdAndUpdate(
        { _id: req.body.postid },
        {
          $push: {
            comments: { comment: req.body.comment, name: data.userName },
          },
        },
        { new: true }
      );
      response(
        req,
        res,
        activity,
        "level-2",
        "create-comment",
        true,
        200,
        usercomment,
        clientError.success.updateSuccess
      );
    } catch (err) {
      response(
        req,
        res,
        activity,
        "Level-3",
        "create-comment",
        false,
        500,
        {},
        errorMessage.internalServer,
        err.message
      );
    }
  } else {
    response(
      req,
      res,
      activity,
      "level-3",
      "create-comment",
      false,
      422,
      {},
      errorMessage.fieldValidation,
      JSON.stringify(errors.mapped())
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to show comments
 */
export let showComments = async (req, res, next) => {
  try {
    const comments = await Post.findById(
      { _id: req.query._id },
      { comments: 1 }
    );
    response(
      req,
      res,
      activity,
      "level-2",
      "show-comments",
      true,
      200,
      comments,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "show-comments",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to deleteParticularComment
 */
export let deleteComment = async (req, res, next) => {
  try {
    const comment = await Post.findByIdAndUpdate(
      { _id: req.body._id },
      { comments: { $pull: { _id: req.body.commentId } } },
      { new: true }
    );
    //const user = await Post.findOneAndUpdate({"comments.comment":{$regex:regex,$options:"i"}},{$pull:{"comments.comment":1}})
    response(
      req,
      res,
      activity,
      "level-2",
      "delete-comments",
      true,
      200,
      comment,
      clientError.success.updateSuccess
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "delete-comments",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan P
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to like count
 */
export let likeCount = async (req, res, next) => {
  try {
    const user = await Post.findByIdAndUpdate(
      { _id: req.body._id },
      { $push: { like: req.body.userId }, $inc: { likeCount: 1 } },
      { new: true }
    );
    response(
      req,
      res,
      activity,
      "level-2",
      "like-count",
      true,
      200,
      user,
      clientError.success.updateSuccess
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "like-count",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to unlike count
 */
export let unLike = async (req, res, next) => {
  try {
    const user = await Post.findByIdAndUpdate(
      { _id: req.body._id },
      { $pull: { like: req.body.userId }, $inc: { likeCount: -1 } },
      { new: true }
    );
    response(
      req,
      res,
      activity,
      "level-2",
      "un-like",
      true,
      200,
      user,
      clientError.success.updateSuccess
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "unLike",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to trendingUrl
 */
export let trendingUrl = async (req, res, next) => {
  try {
    const trending = await Post.aggregate([
      { $group: { _id: "$url", count: { $sum: 1 } } },
    ]).sort({ count: -1 });
    response(
      req,
      res,
      activity,
      "level-2",
      "trending-Url",
      true,
      200,
      trending,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "trending-Url",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 *@author Vinodhagan p
 @date 07-02-2024 
 @param {Object} req
 @param {Object} res
 @param {Function} next 
 @description This function used to getAllLikeCount
 */
export let getTotalLikeCount = async (req, res, next) => {
  try {
    const likecounts = await Post.aggregate([
      {
        $group: {
          _id: null,
          TotalLikeCount: { $sum: "$likeCount" },
        },
      },
    ]);
    response(
      req,
      res,
      activity,
      "level-2",
      "fetch-AllLikeCounts",
      true,
      200,
      likecounts,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "fetch- AllLikeCounts",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to get Last Five Post
 */
export let getLastFivePost = async (req, res, next) => {
  try {
    const lastFivePost = await Post.find({ isDeleted: false })
      .sort({ _id: -1 })
      .limit(5);
    response(
      req,
      res,
      activity,
      "level-2",
      "fetch-lastFivePost",
      true,
      200,
      lastFivePost,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "fetch-lastFivePost ",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
/**
 * @author Vinodhagan P
 * @date 08-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to trending Post
 */
export let trendingPost = async (req, res, next) => {
  try {
    // const likecounts = await Post.find({isDeleted:false},{title:1,likeCount:1}).sort({likeCount:-1})
    const likecounts = await Post.aggregate([
      {
        $project: { title: 1, media: 1, url: 1, description: 1, likeCount: 1 },
      },
    ]).sort({ likeCount: -1 });

    response(
      req,
      res,
      activity,
      "level-2",
      "fetch-AllLikeCounts",
      true,
      200,
      likecounts,
      clientError.success.fetchedSuccessfully
    );
  } catch (err) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "fetch- AllLikeCounts",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
