import { HttpRequest } from "./request.js";
import { RequestInitMixin, defaultRequestInit } from "./requestInitMixin.js";

export function createHttpClient() {
  return new HttpClient();
}

export class HttpClient {
  constructor() {
    this.init = { ...defaultRequestInit };
    this.baseUrl = "";
  }

  createHttpRequest() {
    return new HttpRequest(this);
  }

  withBaseUrl(url) {
    this.baseUrl = url;
  }
}

Object.assign(HttpClient.prototype, RequestInitMixin);
