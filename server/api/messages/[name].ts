import { Message } from "~/server/models/message.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  let message = Message.find({receiver: name}).exec();
  return message;

  
});