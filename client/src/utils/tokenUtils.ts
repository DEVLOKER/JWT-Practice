import { jwtDecode } from "jwt-decode";
import { AUTH_KEY } from "../constants/storageConstants";
import moment from "moment";
import { TUser } from "@/types/user";

export const parseJwt = (token: string) => {
    try {
        const decodedJwt = jwtDecode(token);
        if (!decodedJwt.exp) throw new Error("Invalid JWT token");

        const expirationDate = new Date(decodedJwt.exp * 1000);
        const remainingTime = expirationDate.getTime() - Date.now();
        const timeAgo =
            remainingTime > 0 ? moment(expirationDate).fromNow(true) : "Never";
        const isExpired = remainingTime < 0;
        const formattedExpirationDate = moment(expirationDate).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
        );

        return {
            ...decodedJwt,
            remainingTime: remainingTime > 0 ? remainingTime : null,
            timeAgo,
            isExpired,
            expirationDate: formattedExpirationDate,
        };
    } catch (error) {
        return {
            timeAgo: "Never",
            isExpired: null,
            expirationDate: "",
        };
    }
};

export const saveAuthToStorage = (data: object, key: string = AUTH_KEY) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

export const updateAuthInStorage = (auth: TUser, key: string = AUTH_KEY) => {
    window.localStorage.setItem(key, JSON.stringify(auth));
};

export const readAuthFromStorage = (key: string = AUTH_KEY) => {
    try {
        const data = JSON.parse(window.localStorage.getItem(key) ?? "");
        if (!data) throw new Error("Invalid stored data!");
        return data;
    } catch (error) {
        return null;
    }
};

export const removeAuthFromStorage = (key: string = AUTH_KEY) => {
    window.localStorage.removeItem(key);
};
