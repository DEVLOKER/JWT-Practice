type ResponseStatus = "success" | "error";
export type APISuccessResponse<T> = {
    status: "success";
    message: string;
    data: T;
};
export type APIErrorResponse = {
    status: "error";
    code: number;
    message: string;
    time?: object;
    stack?: string | undefined;
};
export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;

export enum HttpStatusCode {
    // #################################
    // 1xx: informational responses
    // #################################

    // #################################
    // 2xx: successful responses
    // #################################
    OK = 200,
    CREATED_SUCCESS = 201, // data created successfully!
    NO_CONTENT = 204, // success operation without content (logout)
    // #################################
    // 3xx: redirection messages
    // #################################
    REDIRECT = 301, // redirect
    // #################################
    // 4xx: client error responses
    // #################################
    BAD_REQUEST = 400, // form not valid
    UNAUTHORIZED = 401, // access token
    FORBIDDEN = 403, // admin privileges
    NOT_FOUND = 404, // page not found
    NOT_ACCEPTABLE = 406, // not acceptable data
    CONFLICT = 409, // exist data already
    // #################################
    // 5xx: server error responses
    // #################################
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

/*

  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,

  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,

  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,

  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,

*/
