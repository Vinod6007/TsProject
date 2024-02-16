import { validationResult }from "express-validator";
import { response} from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { contactUsDocument,Contact } from "../model/contactUsModel";

var activity = "contactUs"

/**
 * @author Vinodhagan P
 * @date 09-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @description This function used to  create contactUs 
 */
export let contactForm = async(req,res,next)=>{
    try{
     const   contactDetails : contactUsDocument=req.body
      const createContact = new Contact(contactDetails)
      const insertData =await createContact.save()
      response(req,res,activity,'level-2','contact-create',true,200,insertData,clientError.success.registerSuccessfully)
       
    }
    catch(err){
        response(req,res,activity,'Level-3', 'contact-create', false, 500, {}, errorMessage.internalServer, err.message)
    }
}
