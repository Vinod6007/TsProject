import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import {clientError,errorMessage  } from "../helper/ErrorMessage";
import { help,helpUsDocument } from "../model/helpUs.model";

var activity = "helpUs"

/**
 * @author Vinodhagan P
 * @date 09-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to create helpUs
 */
export let helpUs = async(req,res,next)=>{
        try{
            const helpUsDetails: helpUsDocument= req.body
            const createHelpUs = new help(helpUsDetails)
            const insertData =await createHelpUs.save()
            response(req,res,activity,'level-2','helpUs-create',true,200,insertData,clientError.success.registerSuccessfully)
        }
        catch(err){
            response(req,res,activity,'Level-3', 'helpUs-create', false, 500, {}, errorMessage.internalServer, err.message)
        }
}