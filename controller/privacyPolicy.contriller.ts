import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { privacy,privacyDocument } from "../model/privacyPolicy.model";
import { json } from "body-parser";

var activity ="privacyPolicy"

/**
 * @author Vinodhagan P
 * @date 12-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to create privacyPolicy 
 */
export let savePrivacyPolicy = async(req,res,next)=>{
        try{
            const policyDetails : privacyDocument=req.body;
            const createPolicy = new privacy(policyDetails)
            const insertData = await createPolicy.save()
            response(req,res,activity,'level','save-policy',true,200,insertData,clientError.success.registerSuccessfully)
        }
        catch(err)
            {
                response(req,res,activity,'Level-3', 'save-policy', false, 500, {}, errorMessage.internalServer, err.message)

             }
}
/**
 * @author Vinodhagan P
 * @date 12-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @description This function used to update privacy Policy
 */
export let updatePrivacyPolicy = async (req,res,next)=>{
    let errors= validationResult(req)
    if(errors.isEmpty){
        try{
            const policyDetails:privacyDocument=req.body;
            const updateData =await privacy.findByIdAndUpdate({_id:req.body._id},{$set:{phoneNumber:policyDetails.phoneNumber,location:policyDetails.location}},{new:true})
            response(req,res,activity,'level-2','update-policy',true,200,updateData,clientError.success.updateSuccess)
        }
        catch(err)
            {
                response(req,res,activity,'Level-3', 'update-policy', false, 500, {}, errorMessage.internalServer, err.message)
            }
    }
    else{
        response(req,res,activity,'level-3','update-policy',false,422,{},errorMessage.fieldValidation,JSON.stringify(errors.mapped()))
    }

             
}
/**
 * @author Vinodhagan P
 * @date 12-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to getPrivacyPolicy
 */
export let getPrivacyPolicy = async(req,res,next)=>{
        try{
            const fetchpolicy = await privacy.find({isDeleted:false})
            response(req,res,activity,'level-2','fetch-policy',true,200,fetchpolicy,clientError.success.fetchedSuccessfully)
        }
        catch(err)
            {
                response(req,res,activity,'Level-3', 'update-policy', false, 500, {}, errorMessage.internalServer, err.message)
            }
}