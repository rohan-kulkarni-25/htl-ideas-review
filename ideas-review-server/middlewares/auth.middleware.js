import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import axios from "axios";

export const authCheck = asyncHandler(async (req, res, next) => {
  try {
    console.log("TRYING TO LOGIN");
    let token =
      req.cookies?.accessToken || req.body.accessToken
    let { clientCode } = req.body;
    console.log(token);
    if (!token && !clientCode) {
      throw new APIError(401, "Unauthorized request token and client code both not received");
    }

    if (token?.length > 0) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new APIError(401, "Invalid Access Token");
      }
      req.user = user;
    }
    if (clientCode) {
      const tokenUrl = "https://github.com/login/oauth/access_token";
      const params = {
        client_id: process.env.NODE_ENV == "dev" ? process.env.dev_clientId : process.env.clientId,
        client_secret: process.env.NODE_ENV == "dev" ? process.env.dev_clientSecret : process.env.clientSecret,
        code: clientCode,
      };


      let response = await axios({
        method: "post",
        url: tokenUrl,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          ...params,
        },
      });


      const accessToken = response.data.access_token;
      let userResponse = await axios({
        method: "get",
        url:"https://api.github.com/user",
        headers: {
          Authorization: `token ${accessToken}`,
          "User-Agent": "cfp-review",
        },
      });

      if (userResponse.status == 200) {
        const { login } = userResponse.data;
        let user = await User.find({ username: login });
        if (user?.length > 0) {
          // USER FOUND
          req.user = user[0];
        } else {
          throw new APIError(401, "UNAUTHORIZED USER");
          // SAVE USERDATA IN LOGS
        }
      } else {
        throw new APIError(404, "TRY AGAIN");
      }
    }

    next();
  } catch (error) {
    throw new APIError(
      401,
      error?.message || "Invalid access token or clientCode"
    );
  }
});
