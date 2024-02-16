import mongoose, { Mongoose } from "mongoose";

export interface helpUsDocument extends mongoose.Document{
    question?:String;
    answer?:String;

}

const helpUsSchema = new mongoose.Schema({

    question:{type:String},
    answer:{type:String}

})
export const help =mongoose.model("helpUs",helpUsSchema)