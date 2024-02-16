import { validationResult } from "express-validator";
import {clientError,errorMessage  } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { UserData,userDataDocument } from "../model/userdataModel";
import { hashPassword,decryptText} from "../helper/Encryption";
import { Post } from "../model/post.model";

var activity = "userData"

/**
 * @author Vinodhagan P
 * @date 31-01-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next 
 * @description This Function is used to create userData.
 */
export let saveUser = async(req,res,next)=>{
    let errors = validationResult(req)
    if(errors.isEmpty()){
        try{
             const userData = await UserData.findOne({$and:[{isDeleted:false},{email:req.body.email}]})
             if(!userData){
                             req.body.password = await hashPassword(req.body.password)
                             const userDetails : userDataDocument = req.body
                             let otp = Math.floor(1000 + Math.random()*9000);
                             userDetails.otp = otp
                             const createData = new UserData(userDetails)
                             const insertData = await createData.save()
                             response(req, res, activity, 'Level-2', 'Save-userData', true, 200,insertData,clientError.success.savedSuccessfully);
            
                            }
                else{
                         response(req, res, activity, 'Level-3', 'Save-userData', true, 422, {}, 'Email already registered');

                     }
            }
        catch (err) {
                     response(req, res, activity, 'Level-3', 'Save-userData', false, 500, {}, errorMessage.internalServer, err.message);
                }
    }       
    else{
             response(req, res, activity, 'Level-3', 'Save-userData', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
        }
};
/**
 * @author Vinodhagan P
 * @date 31-01-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next 
 * @description This Function is used to  update User.
 */
export let updateUser =async(req,res,next)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            try{
                                    const userData = await UserData.findOne({$and:[{isDeleted:false},{_id:req.body._id}]})
                        if(userData){
                                     const userDetails : userDataDocument = req.body
                                     const userdata =await UserData.findByIdAndUpdate({_id:userData._id},{
                                        $set:{userName:userDetails.userName,
                                            dob:userDetails.dob,
                                            age:userDetails.age}})
                                     const update = await UserData.findOne({_id:userdata._id})
                                     response(req,res,activity,'level-2','update-user',true,200,update,clientError.success.updateSuccess)
                                 }
                            else{
                                     response(req,res,activity,'level-3','update-user',false,422,{},clientError.user.UserNotFound)
                                }
                }
                
            catch(err){
                        response(req,res,activity,'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
                        }  
        }  
        else{
                response(req,res,activity,'level-3','update-user',false,422,{},errorMessage.fieldValidation,JSON.stringify(errors.mapped))
            }
};
/**
 * @author Vinodhagan P
 * @date 01-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to findSingleUser
 */
export let findSingleUser = async(req,res,next)=>{
    try{
                const getUser =await UserData.findOne({$and:[{isDeleted:false},{_id:req.query._id}]})
            if(getUser){
                         response(req,res,activity,'level-2','fetch-user',true,200,getUser,clientError.success.fetchedSuccessfully)
                }
                else{
                    response(req,res,activity,'level-3','fetch-user',false,422,{},clientError.user.UserNotFound)
                }
        }
        catch(err){
                    response(req,res,activity,'Level-3', 'fetch-user', false, 500, {}, errorMessage.internalServer, err.message)
        }
    
};
/**
 * @author Vinodhagan P
 * @date 01-02-2024
 * @param {Object}req 
 * @param {Object}res 
 * @param {Function}next 
 * @description This function used to find ALL user
 *  */
export let findAllUser = async(req,res,next)=>{
    try{
            const getAll = await UserData.find({isDeleted:false})   
                    response(req,res,activity,'level-2','fetch-all',true,200,getAll,clientError.success.fetchedSuccessfully)
        }
        catch(err){
                     response(req,res,activity,'Level-3', 'fetch-user', false, 500, {}, errorMessage.internalServer, err.message)

                }
            
            
    
};
/**
 * @author Vinodhagan P
 * @date 01-02-2024 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @description This function used to delete User 
 */
export let deleteUser = async(req,res,next)=>{
    try{
        const delUser = await UserData.findByIdAndUpdate({_id:req.query._id},{$set:{isDeleted:true}})
        const dele = await UserData.findOne({_id:req.query._id})
        response(req,res,activity,'level-2','delete-user',true,200,dele,clientError.success.deleteSuccess)
    }
    catch(err){
        response(req,res,activity,'Level-3', 'fetch-user', false, 500, {}, errorMessage.internalServer, err.message)
    }
};
/**
 * @author Vinodhagan P
 * @date 01-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to block user
 */
export let blockedUser = async(req,res,next)=>{
    try{
        const user =await UserData.findByIdAndUpdate({_id:req.body._id},{$push:{blocked:req.body.blocked},$inc:{blockedCounts:1}})
        const getBlocked = await UserData.findOne({_id:req.body.id})
        response(req,res,activity,'level-2','block-user',true,200,getBlocked,clientError.success.updateSuccess)
    }
    catch(err)
            {
                response(req,res,activity,'Level-3', 'block-user', false, 500, {}, errorMessage.internalServer, err.message)

             }
};
/**
 * @author Vinodhagan P 
 * @date 01-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to unblock user
 */
export let unBlockedUser = async(req,res,next)=>{
    try{
        const user = await UserData.findByIdAndUpdate({_id:req.body._id},{$pull:{blocked:req.body.blocked},$inc:{blockedCounts:-1}})
        const getUnBlock = await UserData.findOne({_id:req.body._id})
        response(req,res,activity,'level-2','unBlock-user',true,200,getUnBlock,clientError.success.updateSuccess)
    }
    catch(err)
    {
        response(req,res,activity,'Level-3', 'unBlock-user', false, 500, {}, errorMessage.internalServer, err.message)
    }
};
/**
 * @author Vinodhagan p 
 * @date 01-02-2024
 * @param {Object} req  
 * @param {Object} res 
 * @param {Function} next
 * @description This function used to user follower 
 */
export let follower = async(req,res,next)=>{
    try{
        const user = await UserData.findByIdAndUpdate({_id:req.body._id},{$push:{followers:req.body.follow},$inc:{followercounts:1}})
        const userFollower = await UserData.findOne({_id:req.body._id})
        response(req,res,activity,'level-2','follow-user',true,200,userFollower,clientError.success.updateSuccess)
    }
    catch(err){
        response(req,res,activity,'Level-3', 'follow-user', false, 500, {}, errorMessage.internalServer, err.message)     
    }
};
/**
 *@author Vinodhagan P 
 * @date 01-02-2024  
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to user unfollow
 */
export let unfollow = async(req,res,next)=>{
    try{
        const user = await UserData.findByIdAndUpdate({_id:req.body._id},{$pull:{followers:req.body.follow},$inc:{followercounts:-1}})
        const userUnfollow = await UserData.findOne({_id:req.body._id})
        response(req,res,activity,'level-2','unfollow-user',true,200,userUnfollow,clientError.success.updateSuccess)
    }
    catch(err){
        response(req,res,activity,'Level-3', 'unfollow-user', false, 500, {}, errorMessage.internalServer, err.message) 
    }
};
/**
 * @author Vinodhagan P
 * @date 01-02-2024
 * @param {object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to get followersDetails
 */
export let getFollowersDetails = async(req,res,next)=>{
    try{
        const findFollower = await UserData.findOne({_id:req.query._id },{followers:1}).populate("followers",{email:1})

            response(req,res,activity,'level-2','getAll-followers',true,200,findFollower,clientError.success.fetchedSuccessfully)
            
        }
    
    catch(err){
                 response(req,res,activity,'Level-3', 'getALL-followers', false, 500, {}, errorMessage.internalServer, err.message)

            }
}
/**
 * @author Vinodhagan P
 * @date 01-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to find Following
 */
export let findFollowing = async(req,res)=>{
    try{
        const user = await UserData.find({followers:req.query._id},{userName:1,email:1})
        response(req,res,activity,'level-2','fetch-follower',true,200,user,clientError.success.fetchedSuccessfully)
    }
    catch(err){
                response(req,res,activity,'Level-3', 'fetch-follower', false, 500, {}, errorMessage.internalServer, err.message)

    }
}
/**
 * @author Vinodhagan P
 * @date 01-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to show blockedUser
 */

export let showBlockedUser =async(req,res,next)=>{
    try{
        const AllblockUser =await UserData.findOne({_id:req.query._id},{blocked:1})
        response(req,res,activity,'level-2','felch-blockedUser',true,200,AllblockUser,clientError.success.fetchedSuccessfully)
    }
    catch(err){
        response(req,res,activity,'Level-3', 'fetch-blockedUser', false, 500, {}, errorMessage.internalServer, err.message)
    }
}
/**
 * 
 * @author Vinodhagan P 
 * @date 02-02-2024
 * @param {Object} req
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to search name
 */
export let searchUser =async(req,res,next)=>{
    try{
        const searchName =await UserData.find({userName:{$regex:req.query.userName,$options:"i"}})
        response(req,res,activity,'level-2','fetch-name',true,200,searchName,clientError.success.fetchedSuccessfully)
    }
    catch(err){
                 response(req,res,activity,'Level-3', 'fetch-blockedUser', false, 500, {}, errorMessage.internalServer, err.message)
    }
}
/**
 * @author Vinodhagan P
 * @date 02-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to comparePassword
 */

export let comparePassword =async(req,res,next)=>{
    try{
        const user = await UserData.findOne({_id:req.body._id})
        
         const userPassword = await hashPassword(req.body.password)
         console.log(userPassword)

        if(userPassword == user){
                const correctUser = await UserData.findOne({_id:req.body._id})

                response(req,res,activity,'level-2','compare-password',true,200,correctUser,clientError.success.registerSuccessfully)
        }
        else{
                response(req,res,activity,'Level-3', 'compare-password', false, 401, {},clientError.password.invalidPassword)
        }
    }
    catch(err){
                 response(req,res,activity,'Level-3', 'compare-password', false, 500, {}, errorMessage.internalServer, err.message)
    }
}
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to save Post
 */
export let savePost =async(req,res,next)=>{
        try{
            const user = await UserData.findByIdAndUpdate({_id:req.query._id},{$push:{savePost:req.query.postId}},{new:true})
            response(req,res,activity,'level-2','save-post',true,200,user,clientError.success.updateSuccess)
        }
        catch(err){
                     response(req,res,activity,'Level-3', 'save-post', false, 500, {}, errorMessage.internalServer, err.message)
}
}
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to unSave Post
 */
export let unSavePost =async(req,res,next)=>{
    try{
        const user = await UserData.findByIdAndUpdate({_id:req.query._id},{$pull:{savePost:req.query.postId}},{new:true})
        response(req,res,activity,'level-2','unsave-post',true,200,user,clientError.success.updateSuccess)
    }
    catch(err){
                 response(req,res,activity,'Level-3', 'unsave-post', false, 500, {}, errorMessage.internalServer, err.message)
}
}
/**
 * @author Vinodhagan p
 * @date 07-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to feed Page
 */
export let feedPage =async(req,res,next)=>{
        try{
            const userPage=await UserData.findOne({_id:req.query._id},{blocked:1,_id:0})
            const postuser= await Post.find({$and:[{_id:{$nin:userPage.blocked}},{isDeleted:false}]})
            response(req,res,activity,'level-2','feed-page',true,200,postuser,clientError.success.fetchedSuccessfully)
        }
        catch(err){
            response(req,res,activity,'Level-3', 'feed-page', false, 500, {}, errorMessage.internalServer, err.message)
        }
}