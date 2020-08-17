const express = require("express");
const router = express.Router();
//! Controller
const profilesController = require("../controllers/profiles");

/**
 * @swagger
 * /profiles:
 *   post:
 *     tags:
 *       - Profiles
 *     name: Create Profile
 *     summary: Adds a new profile to the phonebook
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       '201':
 *         description: created a new profile successfully
 *       '409':
 *         description: Profile not created. Profile with provided email or mobile number already exists.
 */
router.post("/profiles", profilesController.createProfile);

/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - Profiles
 *     name: Get profile list
 *     summary: Get a list of phonebook profiles
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: No profiles available
 */
router.get("/profiles", profilesController.readProfileList);

/**
 * @swagger
 * /profiles/email:
 *   post:
 *     tags:
 *       - Profiles
 *     name: Read Profile
 *     summary: Read profile by email
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *              required:
 *                  - email
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Profile not found.
 */
router.post("/profiles/email", profilesController.readProfile);

/**
 * @swagger
 * /profiles/{profileId}:
 *   put:
 *     tags:
 *       - Profiles
 *     name: Update Profile
 *     summary: Update a Profile by ID
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *            type: string
 *         required: true
 *         description: Object ID of the profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '409':
 *         description: Profile not updated. Profile with provided email or mobile number already exists.
 */
router.put("/profiles/:profileId", profilesController.updateProfile);

/**
 * @swagger
 * /profiles/delete/{profileId}:
 *   post:
 *     tags:
 *       - Profiles
 *     name: Delete Profile
 *     summary: Delete a Profile by ID
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *            type: string
 *         required: true
 *         description: Object ID of the profile to delete
 *     responses:
 *       '200':
 *         description: Profile deleted successfully
 *       '400':
 *         description: Profile not deleted.
 */
router.post("/profiles/delete/:profileId", profilesController.deleteProfile);

module.exports = router;
