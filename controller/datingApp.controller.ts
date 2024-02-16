import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { dating,datingDocuments } from "../model/datingApp.model";

var activity = "datingApp"

/**
 * @author Vinodhagan P
 * @date 12-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to create clientsDetails
 */
export let saveClientDetails =async(req,res,next)=>{
        try{
            const datingDetails: datingDocuments=req.body;
            const createdata = new dating(datingDetails)
            const inserData = await createdata.save()
            response(req,res,activity,'level-2','create-details',true,200,inserData,clientError.success.registerSuccessfully)
        }
        catch(err){
            response(req,res,activity,'Level-3', 'craete-details', false, 500, {}, errorMessage.internalServer, err.message);
            }  
}
/**
 * @author Vinodhagan P
 * @date 12-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to update clientDetails
 */
export let updateClients = async(req,res,next)=>{
    let errors= validationResult(req)
    if(errors.isEmpty){
        try{
            const datingDetails:datingDocuments=req.body;
            const updateDetails = await dating.findByIdAndUpdate({_id:req.body._id},{$set:{age:datingDetails.age,district:datingDetails.district}},{new:true})
            response(req,res,activity,"level-2","update-client",true,200,updateDetails,clientError.success.updateSuccess)
        }
        catch(err){
            response(req,res,activity,'Level-3', 'update-client', false, 500, {}, errorMessage.internalServer, err.message);
            } 

    }
    else{
            response(req,res,"level-3","update-client",false,422,{},errorMessage.fieldValidation,JSON.stringify(errors.mapped()))
    }
}
/**
 * @author Vinodhagan P
 * @date 12-02-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to filter client details 
 */
export let filterClientdetails = async(req,res,next)=>{
        try{ 
            const datingDetails:datingDocuments=req.body;
            var findQuary;
            var andList : any=[];
            var limit= req.body.limit ? req.body.limit:0;
            var skip= req.body.skip ? req.body.skip:0;
            andList.push({isDeleted:false})
            andList.push({status:1})
            if(datingDetails.name){
                andList.push({name:datingDetails.name})
            }
            if(datingDetails.age){
                andList.push({age:datingDetails.age})
            }
            if(datingDetails.gender){
                andList.push({gender:datingDetails.gender})
            }
            if(datingDetails.country){
                andList.push({country:datingDetails.country})
            }
            if(datingDetails.state){
                andList.push({state:datingDetails.state})
            }
            if(datingDetails.district){
                andList.push({district:datingDetails.district})
            }
findQuary = (andList.length>0)?{$and:andList}:{}
const clientList= await dating.find(findQuary).sort({createdOn:-1}).limit(limit).skip(skip)
const clientCount= await dating.find(findQuary).countDocuments()
response(req,res,activity,'level-2',"fetch-client",true,200,{clientList,clientCount},clientError.success.fetchedSuccessfully)
        }
        catch(err){
                response(req,res,activity,'Level-3', 'fetch-client', false, 500, {}, errorMessage.internalServer, err.message);
                } 
}


export let filterclient = async (req, res, next) => {
    try {
        const datingDetails: datingDocuments = req.body;
        const conditions = Object.entries(datingDetails).reduce((acc, [key, value]) => {
            if (value) {
                acc.push({ [key]: value });
            }
            return acc;
        }, []);

        const findQuery = conditions.length > 0 ? { $and: conditions } : {};
        const limit = req.body.limit ? req.body.limit : 0;
        const skip = req.body.skip ? req.body.skip : 0;

        const clientList = await dating.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(skip);
        const clientCount = await dating.find(findQuery).countDocuments();

        response(req, res, activity, 'level-2', "fetch-client", true, 200, { clientList, clientCount }, clientError.success.fetchedSuccessfully);
    } catch (err) {
        response(req, res, activity, 'Level-3', 'fetch-client', false, 500, {}, errorMessage.internalServer, err.message);
    }
}
/**
 * @author Vinodhagan P
 * @date 13-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description This function used to filterdDetails with using reduce function in for-in loop
 */
export let filterdetails = async (req, res, next) => {
    try {
        const datingDetails: datingDocuments = req.body;
        const conditions = [];
        conditions.push({isDeleted:false})
        conditions.push({status:1})
        for (let key in datingDetails) {
            if (datingDetails[key]) {
                conditions.push({ [key]: datingDetails[key] });
            }
        }
        const findQuery = conditions.length > 0 ? { $and: conditions } : {};
        const limit = req.body.limit || 0;
        const skip = req.body.skip || 0;

        const clientList = await dating.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(skip);
        const clientCount = await dating.find(findQuery).countDocuments();

        response(req, res, activity, 'level-2', "fetch-client", true, 200, { clientList, clientCount }, clientError.success.fetchedSuccessfully);
    } catch (err) {
        response(req, res, activity, 'Level-3', 'fetch-client', false, 500, {}, errorMessage.internalServer, err.message);
    }
}




