import mongoose, { Mongoose } from "mongoose";

export interface faqDocuments extends mongoose.Document{
    question?:string;
    answer?:string;
}

const faqSchema = new mongoose.Schema({
    
        question:{type:String},
        answer:{type:String}

})

export const faq = mongoose.model ("faq",faqSchema)