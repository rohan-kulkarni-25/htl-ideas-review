import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const talkSchema = new Schema(
  {
    talkTitle: {
      type: String,
      required: true,
    },
    talkSummary: {
      type: String,
    },
    talkDescription: {
      type: String,
    },
    hackathons:{
      type:String,
    },
    votes: [
      {
        voterUsername: {
          type: String,
        },
        voteBy: {
          type: Schema.ObjectId,
          ref: "User",
        },
        vote:{
          type:Number
        }
      },
    ],
    avgVotes: {
      type: Number,
      default:0
    },
    status:{
      type:String,
      default:"pending"
    }
  },
  {
    timestamps: true,
  }
);


export const Talk = mongoose.model("Talk", talkSchema);
