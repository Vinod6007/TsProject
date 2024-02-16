import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Company, CompanyDocument } from "../model/company.model";
import * as TokenManager from "../utils/tokenManager";
import { hashPassword } from "../helper/Encryption";

var activity = "Company"

/**
 * @author Ponjothi S
 * @date 07-09-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Company.
 **/
export let saveCompany = async (req,
    res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const companyData = await Company.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!companyData) {
                req.body.password = await hashPassword(req.body.password)
                const companyDetails: CompanyDocument = req.body; // mapping
                const createData = new Company(companyDetails);
                let insertData = await createData.save();

                const token = await TokenManager.CreateJWTToken({
                    companyId: insertData["_id"],
                    companyName: insertData["name"],
                });
                const result = {}
                result['_id'] = insertData._id
                result['companyName'] = insertData.name;
                let finalResult = {};
                finalResult["loginType"] = 'company';
                finalResult["companyDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-Company', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-Company', true, 422, {}, 'Email already registered');
            }

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}
export let updateUser =async(req,res,next)=>{
    let errors = validationResult(req)
    if(errors.isEmpty()){
        try{
                                const userData = await Company.findOne({$and:[{isDeleted:false},{_id:req.body._id}]})
                    if(userData){
                                 const userDetails : CompanyDocument = req.body
                                 const userdata =await Company.findByIdAndUpdate({_id:userDetails._id},{$set:{name:req.body.userName,mobile:req.body.mobile}},{new:true})
                                 //const update = await Company.findOne({_id:userDetails._id})
                                 response(req,res,activity,'level-2','update-user',true,200,userdata,clientError.success.updateSuccess)
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

export let findO = async (req, res, next) => {
        try {
            const companyDetails: CompanyDocument = req.body; // mapping

            const data = await Company.findOne({ _id: companyDetails._id }, {});

            response(req, res, activity, 'Level-2', 'Update-Password', true, 200, clientError.success.updateSuccess,data)
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Password', true, 500, {}, errorMessage.internalServer, err.message)
        }
    } 

