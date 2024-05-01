import { ObjectId } from "mongodb";
import { Talk } from "../models/talk.model.js";
import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    throw new APIError(
      500,
      "Something went wrong while generating  access token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { accessToken } = await generateAccessToken(req.user._id.toString());
  const options = {
    maxAge: 900000 * 60, // Expires after 15 hours
    httpOnly: false, // Cookie accessible only by the server
    secure: true, // Cookie sent over HTTPS only
    sameSite: 'none' // Cross-site requests allowed

  };

  return res
    .status(200)
    .cookie("accessToken", accessToken,options)
    .json(
      new APIResponse(
        200,
        {
          accessToken,
          user: req.user,
        },
        "User logged In Successfully"
      )
    );
});

const addUser = asyncHandler(async (req, res) => {
  let { username, userType } = req.body;

  if (!username && !userType) {
    throw new APIError(400, "Username and UserType required !!");
  }

  let user = await User.create({
    username,
    userType,
  });

  return res.status(201).json(new APIResponse(201, { user }, "User Added !"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  let users = await User.find();
  return res.status(200).json(new APIResponse(200, { users }, "All Users"));
});

const deleteUser = asyncHandler(async (req, res) => {
  let { userId } = req.body;
  await User.deleteOne({ _id: userId });
  return res.status(201).json(new APIResponse(201, {}, "User Deleted !!"));
});

const addTalks = asyncHandler(async (req, res) => {
  let { talks } = req.body;
  console.log(talks);
  if (talks?.length == 0) {
    throw new APIError(404, "Talks Not Found !!");
  }

  await Promise.all(
    talks.map(async (talk) => {
      let newTalk = {
        talkTitle: talk.talkTitle,
        talkSummary: talk.talkSummary,
        talkDescription: talk.talkDescription,
        hackathons:talk.hackathons,
        votes: [],
        status: "pending",
      };
      let talkNew = await Talk.create({ ...newTalk });
      if (!talkNew) {
        throw new APIError(400, "Something went wrong while adding Talks !");
      }
    })
  );
  return res.status(201).json(new APIResponse(201, {}, "Talks Added"));
});

const getAllTalks = asyncHandler(async (req, res) => {
  let talks = await Talk.find();
  if (!talks) {
    throw new APIError(404, "Talks Not Found");
  }
  return res.status(200).json(new APIResponse(200, { talks }, "All Talks"));
});

const deleteTalk = asyncHandler(async (req, res) => {
  let { talkId } = req.body;
  await Talk.deleteOne({ _id: talkId });
  return res.status(201).json(new APIResponse(201, {}, "Talk Deleted !!"));
});

const updateTalkStatus = asyncHandler(async (req, res) => {
  let { talkId, status } = req.body;
  if (!talkId && !status) {
    throw new APIError(404, "Talk Not Found");
  }
  let talk = await Talk.findById(talkId);
  talk.status = status;
  await talk.save();
  return res.status(201).json(new APIResponse(201, {}, "Talk Status Updated"));
});

const getTalks = asyncHandler(async (req, res) => {
  let talks = await Talk.find().select("-status -avgVotes");
  if (!talks) {
    throw new APIError(404, "Talks Not Found");
  }
  let userTalks = [];
  talks.forEach((talk) => {
    let updateTalk = { ...talk._doc };
    let voteGiven = talk.votes.find(
      (vote) => vote.voterUsername == req.user.username
    );
    if (voteGiven) {
      updateTalk.userVotes = voteGiven.vote;
    } else {
      updateTalk.userVotes = 0;
    }
    updateTalk.votes = null;
    if (updateTalk.userVotes > 0) {
      updateTalk.status = "reviewed";
    } else {
      updateTalk.status = "pending";
    }
    userTalks.push(updateTalk);
  });
  console.log(userTalks);
  return res
    .status(200)
    .json(new APIResponse(200, { talks: userTalks }, "All Talks"));
});

const addVote = asyncHandler(async (req, res) => {
  let { vote, talkId } = req.body;

  if (!vote && !talkId) {
    throw new APIError(404, "TalkId and Vote Needed.");
  }

  let talk = await Talk.findById(talkId);
  if (!talk) {
    throw new APIError(404, "Talk Not Found !");
  }
  
  let index = talk.votes.findIndex((vote) => vote.voterUsername == req.user.username)

  if (index >= 0) {

    talk.votes[index].vote = vote
    await talk.save()
  }else{
    talk.votes.push({
        voterUsername:req.user.username,
        voteBy: req.user._id,
        vote
    })
    await talk.save()
  }
  return res.status(201).json(new APIResponse(201,{},"Vote Updated"))
});

export {
  loginUser,
  addUser,
  getAllUsers,
  deleteUser,
  addTalks,
  getAllTalks,
  deleteTalk,
  updateTalkStatus,
  getTalks,
  addVote,
};
