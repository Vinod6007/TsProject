import mongoose, { Mongoose } from "mongoose";
import { Interface } from "readline";
export interface contactUsDocument extends mongoose.Document{
    name?:string;
    mobile?:String;
    email?:string;
    address?:string;
} 

const contactUsShema = new mongoose.Schema({
    ContactUs:[{
    name:{type:String},
    mobile:{type:String},
    email:{type:String},
    address:{type:String}
}]})

export const Contact = mongoose.model('Contact',contactUsShema)