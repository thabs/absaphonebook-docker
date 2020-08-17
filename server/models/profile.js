const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *  schemas:
 *   Profile:
 *     type: object
 *     required: true
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       mobileNum:
 *         type: string
 */
const profileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, lowercase: true, unique: true, required: true },
  mobileNum: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

mongoose.model("Profile", profileSchema);
