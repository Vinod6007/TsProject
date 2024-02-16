import mongoose from "mongoose";
export interface userDataDocument extends mongoose.Document {
_id?:String;
 userName?:String;
 email?:String;
 password?:String; 
 otp?:Number;  
 dob?:String;
 age?:Number;
 blocked?:any;
 isDeleted?:Boolean;
 status?:Number;
 modifiedOn?:Date;
 modifiedBy?:String;
 createdOn?:Date;
 createdBy?:String;
 blockedCounts?:Number;
 followers?:any;
 followercounts?:Number;
 postCount?:Number;
 savePost?:any;
 
}



const userDataSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,required: true, auto: true },
    userName:{type:String},
    email:{type:String},
    password:{type:String},
    otp: { type: Number },
    dob:{type:String},
    age:{type:Number},
    blocked:[{type:mongoose.Types.ObjectId,ref:"userData"}],
    blockedCounts:{type:Number},
    followers:[{type:mongoose.Types.ObjectId,ref:"userData"}],
    followercounts:{type:Number},
    postCount:{type:Number},
    savePost:[{type:mongoose.Types.ObjectId,ref:"postdetail"}],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }

})

export const UserData= mongoose.model("userData",userDataSchema)
