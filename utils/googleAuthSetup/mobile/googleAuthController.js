import { OAuth2Client } from "google-auth-library";
import ApiResponse from "../../ApiResponse.js";
import User from "../../../models/user.model.js";
import CreatorModel from "../../../models/creator.model.js";
import { generateTokens as generateCreatorTokens } from "../../../controllers/creator.controller.js";
import { generateTokens } from "../../../controllers/user.controller.js";

const client = new OAuth2Client();
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};
export const googleAuthMobile = async (req, res) => {
  try {
    const { idToken, userType } = req.body;

    if (!idToken || !userType) {
      return res.status(400).json({
        success: false,
        message: "idToken and userType are required",
      });
    }
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [
        process.env.GOOGLE_SIGNIN_WEB_CLIENT_ID,
        process.env.GOOGLE_SIGNIN_ANDROID_CLIENT_ID,
        process.env.GOOGLE_SIGNIN_IOS_CLIENT_ID,
      ],
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const fullName = payload.name;

    let user;
    if (userType === "creator") {
      user = await CreatorModel.findOne({ email });
      if (!user) {
        user = await CreatorModel.create({
          email,
          fullName,
          authProvider: "google",
          userAgreement: true,
          phoneNumber: "1234567890",
          dateOfBirth: "01/01/2000",
        });
      }
    } else {
      user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          fullName,
          authProvider: "google",
          userAgreement: true,
          phoneNumber: "1234567890",
          dateOfBirth: "01/01/2000",
        });
      }
    }

    const { accessToken: appAccessToken } =
      userType === "creator"
        ? await generateCreatorTokens(user._id)
        : await generateTokens(user._id);

    res
      .status(200)
      .cookie("accessToken", appAccessToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            user,
            accessToken: appAccessToken,
          },
          "Authentication successful with Google"
        )
      );
  } catch (error) {
    console.error("Error in googleAuthMobile:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
