import { RequestInitMixin, defaultRequestInit } from "./requestInitMixin.js";

export class HttpClient {
  constructor() {
    this.init = { ...defaultRequestInit };
    this.baseUrl = "";
  }

  createRequest() {
    return new Request(this);
  }

  withBaseUrl(url) {
    this.baseUrl = url;
  }
}

Object.assign(Client.prototype, RequestInitMixin);
