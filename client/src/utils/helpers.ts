import { v4 as uuidv4 } from "uuid";

export const randomKey = () => {
    return uuidv4();
};

export const wait = (duration: number = 2000) =>
    new Promise((resolve) => setTimeout(resolve, duration));
