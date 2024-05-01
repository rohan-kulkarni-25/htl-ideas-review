import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminCheck = asyncHandler(async (req, res, next) => {
  if (req.user.userType == "admin") {
    next();
  } else {
    throw new APIError(401, "Unauthorized Access.");
  }
});
