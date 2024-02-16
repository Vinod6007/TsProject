import mongoose from "mongoose"

export interface postDocument extends mongoose.Document{
    _id?:any;
    userId?:any;
    title?:string;
    media?:string;
    description?:string;
    like?:any;
    likeCount?:Number;
    comments?: any;
    isDeleted?:boolean;
    report?:Number
}
const postSchema= new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,required: true, auto: true },
    userId:{type:mongoose.Types.ObjectId,ref:'userdata'},
    title:{type:String},
    media:{type:String},
    description:{type:String},
    url:{type:String},
    like:[{type:mongoose.Types.ObjectId,ref:"userdata"}],
    likeCount:{type:Number},
    comments:[{
        name:{type:String},
        comment:{type:String}
    }],

  isDeleted:{type:Boolean,
            default:false},

    report:{type:Number},


})
export const Post= mongoose.model("postdetail",postSchema);