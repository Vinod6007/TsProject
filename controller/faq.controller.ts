import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { faq,faqDocuments } from "../model/faq.model";

var activity ="FAQ"

/**
 * @author Vinodhagan P
 * @date 09-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @description This function used to faq create
 */
export let createFaq = async(req,res,next)=>{
            try{
                const faqDetails : faqDocuments=req.body;
                const create = new faq(faqDetails)
                const insertData =await  create.save()
                response(req,res,activity,'level-2','faq-create',true,200,insertData,clientError.success.registerSuccessfully)
            }
            catch(err){
                response(req,res,activity,'Level-3', 'helpUs-create', false, 500, {}, errorMessage.internalServer, err.message)
            }

}