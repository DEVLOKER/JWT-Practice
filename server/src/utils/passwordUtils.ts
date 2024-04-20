import bcrypt from "bcrypt";
import crypto from "crypto";
import config from "#config/config.js";

// #################################################################
//  password utils
// #################################################################

export const hash = (input: string, algorithm = "md5") =>
    crypto.createHash(algorithm).update(input).digest("hex");

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(config.SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const comparePassword = async (
    candidatePassword: string,
    password: string
) => {
    const isMatch = await bcrypt.compare(candidatePassword, password);
    return isMatch;
};
