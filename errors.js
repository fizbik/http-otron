export const NETWORK_ERR = "network";
export const TIMEOUT_ERR = "timeout";
export const CORS_ERR = "cors";
export const REQUEST_ERR = "request";
export const RESPONSE_ERR = "response";

export const createNetworkErr = (message) => ({ type: NETWORK_ERR, message });
export const createTimeoutErr = (message) => ({ type: TIMEOUT_ERR, message });
export const createCorsErr = (message) => ({ type: CORS_ERR, message });
export const createRequestErr = (message) => ({ type: REQUEST_ERR, message });
export const createResponseErr = (message) => ({ type: RESPONSE_ERR, message });
