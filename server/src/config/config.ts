const config = {
    RESOURCE_PORT: Number(process.env.PORT) || 8080,
    AUTH_PORT: Number(process.env.AUTH_PORT) || 8800,
    TOKEN_KEY: process.env.TOKEN_KEY ?? "",
    SALT_WORK_FACTOR: Number(process.env.SALT_WORK_FACTOR) || 10,
    JWT_ACCESS_TOKEN_SECRET:
        process.env.JWT_ACCESS_TOKEN_SECRET ?? "JWT_ACCESS_TOKEN_SECRET",
    JWT_REFRESH_TOKEN_SECRET:
        process.env.JWT_REFRESH_TOKEN_SECRET ?? "JWT_REFRESH_TOKEN_SECRET",
};

export default config;
