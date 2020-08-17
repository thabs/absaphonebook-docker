const HttpStatus = require("http-status-codes");
const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");
//! Services
const logger = require("../services/logger");
const { clearHash } = require("../services/cache");

module.exports.createProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNum } = req.body;

    const profile = await Profile.create({
      firstName,
      lastName,
      email,
      mobileNum,
    });

    //! Clear cache for use list
    clearHash("profiles");
    return res.status(HttpStatus.CREATED).send(profile);
  } catch (err) {
    res
      .status(HttpStatus.CONFLICT)
      .send({
        error: {
          message:
            "The profile with provided email or mobile number already exists.",
        },
      });
    logger.error(err.message);
  }
};

module.exports.readProfileList = async (req, res) => {
  try {
    const profiles = await Profile.find().cache({ key: "profiles" });
    return res.send(profiles);
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: { message: "Bad request" } });
    logger.error(err.message);
  }
};

module.exports.readProfile = async (req, res) => {
  try {
    const { email } = req.body;
    logger.info(JSON.stringify(req.body));

    //! Lets Exclude Default System Administrator User
    const profile = await Profile.findOne({ email })
      .lean()
      .cache({ searchKey: email });

    if (!profile) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: {
          message: "Profile not found",
        },
      });
    }

    return res.send(profile);
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: { message: "Bad request" } });
    logger.error(err.message);
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNum } = req.body;
    const { profileId } = req.params;

    const profile = await Profile.findByIdAndUpdate(
      profileId,
      {
        firstName,
        lastName,
        email,
        mobileNum,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).lean();

    //! Clear the user cache details
    const key = `profiles:${profileId}`;
    clearHash(key);
    clearHash("profiles");
    return res.send(profile);
  } catch (err) {
    res
      .status(HttpStatus.CONFLICT)
      .send({
        error: {
          message:
            "The profile with provided email or mobile number already exists.",
        },
      });
    logger.error(err.message);
  }
};

module.exports.deleteProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await Profile.findByIdAndRemove(profileId);
    //! Clear the user cache details
    const key = `profiles:${profileId}`;
    clearHash(key);
    clearHash("profiles");
    return res.send(profile);
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: { message: "Bad request" } });
    logger.error(err.message);
  }
};
