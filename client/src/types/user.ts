export type TUser = {
    id: string;
    username: string;
    password: string;
    accessToken: string;
    refreshToken: string;
};

export type TCredentials = Pick<TUser, "username" | "password">;
