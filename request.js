import { matchesContentType } from "./decoding.js";
import { createCorsErr, createNetworkErr, createRequestErr, createResponseErr } from "./errors.js";
import { RequestInitMixin } from "./requestInitMixin.js";
import { createResult, createResultFromError } from "./result.js";

export class HttpRequest {
  constructor(client) {
    this.client = client;
    this.init = { ...client.init };
  }

  async send(url) {
    let fullUrl, resp, err, ct, decoded, result;

    try {
      fullUrl = `${this.client.baseUrl}${url}`;
      fullUrl = new URL(fullUrl).toString();
    } catch (ex) {
      err = createRequestErr(ex.message);
      result = createResultFromError(fullUrl, err);
      return result;
    }

    try {
      resp = await this.init.httpotron.fetch(fullUrl, this.init);
    } catch (ex) {
      if (isNetworkError(ex)) {
        err = createNetworkErr(ex.message);
        result = createResultFromError(fullUrl, err);
      } else {
        err = createRequestErr(ex.message);
        result = createResultFromError(fullUrl, err);
      }
      return result;
    }

    if (isCorsError(resp)) {
      err = createCorsErr("See browser console for more information");
      result = createResultFromError(fullUrl, err);
      return result;
    }

    if (getContentLength(resp) > 0) {
      try {
        ct = getContentType(resp);
        if (matchesContentType(ct, this.init.httpotron.decoding.textTypes)) {
          decoded = await resp.text();
        } else if (matchesContentType(ct, this.init.httpotron.decoding.jsonTypes)) {
          decoded = await resp.json();
        } else if (matchesContentType(ct, this.init.httpotron.decoding.blobTypes)) {
          decoded = await resp.blob();
        }
      } catch (ex) {
        err = createResponseErr(ex.message);
        result = createResultFromError(fullUrl, err, resp);
        return result;
      }
    }

    result = createResult(fullUrl, resp, decoded);
    return result;
  }

  withStubResult(result) {
    this.send = function () {
      return result;
    };
    return this;
  }
}

Object.assign(HttpRequest.prototype, RequestInitMixin);

function isNetworkError(err) {
  return err.constructor === TypeError && err.message.toLowerCase().includes("failed");
}

function isCorsError(resp) {
  return !resp.ok && resp.type === "opaque";
}

function getContentLength(resp) {
  const header = resp.headers.get("content-length") || "0";
  return parseInt(header, 10);
}

function getContentType(resp) {
  return resp.headers.get("content-type");
}
