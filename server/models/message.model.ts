import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  
  sender: String,
  text: String,
  receiver: String
   
}, { 
  timestamps: true 
});
  
export const Message = model("Message", MessageSchema);