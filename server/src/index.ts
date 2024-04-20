// #################################################################
// configure .env
// #################################################################
import dotenv from "dotenv";
dotenv.config();

// #################################################################
// main program
// #################################################################
import config from "#config/config.js";
import ResourceServer from "#services/resourceServer.js";
import AuthServer from "#services/authServer.js";

const authServer = new AuthServer(config.AUTH_PORT, "Authentication Server");
authServer.start();

const resourceServer = new ResourceServer(
    config.RESOURCE_PORT,
    "Resource Server"
);
resourceServer.start();
