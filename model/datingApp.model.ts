import mongoose, { Mongoose } from "mongoose";
export interface datingDocuments extends mongoose.Document{
    name?:string,
    age?:Number,
    gender?:string,
    country?:string,
    state?:string,
    district?:string,
}
const datingSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    gender:{type:String},
    country:{type:String},
    state:{type:String},
    district:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }

})
export const dating = mongoose.model("datingApp",datingSchema)