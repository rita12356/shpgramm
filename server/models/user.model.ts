import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  
  
  name: String,
  username: String
   
}, { 
  timestamps: true 
});
  
export const User = model("User", UserSchema);