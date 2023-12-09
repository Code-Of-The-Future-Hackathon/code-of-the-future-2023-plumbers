require("dotenv").config();

const { onRequest } = require("firebase-functions/v2/https");

const { logger } = require("firebase-functions");

const { getDb } = require("./utils/dbUtils.js");

const program = require("./program.js");

const db = getDb();

exports.getCommunityGreenSpaces = onRequest(
  { region: process.env.DEPLOYMENT_ZONE, cors: true },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
    } else if (req.method === "GET") {
      try {
        const greenSpaceId = req.query.id.replaceAll('"', "");
        const greenSpaceType = req.query.type.replaceAll('"', "");

        const response = await program.getGreenSpaceDetailsAsync(
          db,
          greenSpaceId,
          greenSpaceType
        );

        res.send(response);
      } catch (e) {
        logger.error(e);
        res.send(e);
      }
    }
  }
);
