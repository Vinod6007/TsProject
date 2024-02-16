import mongoose, { Mongoose } from "mongoose";
export interface privacyDocument extends mongoose.Document{
    generatePrivacyPolicy?:string;
    enterYourAppName?:string;
    entityType?:string;
    enterThecountry?:string;
    enterTheState?:string;
    enterEmail?:string;
    phoneNumber?:string;
    location?:string;
    isDeleted?:boolean
}
const privacySchema =new mongoose.Schema({
    generatePrivacyPolicy:{type:String},
    enterYourAppName:{type:String},
    entityType:{type:String},
    enterTheCountry:{type:String},
    enterTheState:{type:String},
    enterEmail:{type:String},
    phoneNumber:{type:String},
    location:{type:String},
    isDeleted:{type:Boolean,default:false}
    
})
export const privacy =mongoose.model("privacyPolicy",privacySchema)