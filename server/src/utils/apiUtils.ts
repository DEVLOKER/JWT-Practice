import { APISuccessResponse, APIErrorResponse } from "#types/api.js";

export const prepareErrorResponse = ({
    code,
    message,
    error,
}: {
    code: number;
    message: string;
    error: Error;
}) => {
    const successResponse: APIErrorResponse = {
        status: "error",
        code,
        message,
        time: new Date(), //.toISOString().replace("T", " ").substring(0, 19),
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
    return successResponse;
};

export const prepareSuccessResponse = <T>({
    message,
    data,
}: {
    message: string;
    data: any;
}): APISuccessResponse<T> => {
    const successResponse: APISuccessResponse<T> = {
        status: "success",
        message,
        data,
    };
    return successResponse;
};
