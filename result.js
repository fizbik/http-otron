export function createResult(url, resp, decoded) {
  return {
    url,
    response: resp,
    httpStatus: resp.status,
    decoded: decoded,
  };
}

export function createResultFromError(url, err, resp) {
  return {
    url,
    error: err,
    response: resp,
    httpStatus: resp ? resp.status : undefined,
  };
}
