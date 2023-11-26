import { defaultBlobPatterns, defaultJsonPatterns, defaultTextPatterns } from "./decoding.js";

export const defaultRequestInit = {
  method: "GET",
  headers: {},
  httpotron: {
    decoding: {
      textTypes: new Set(defaultTextPatterns),
      jsonTypes: new Set(defaultJsonPatterns),
      blobTypes: new Set(defaultBlobPatterns),
    },
  },
};

export const RequestInitMixin = {
  withMethod(method) {
    this.init.method = method;
    return this;
  },

  withHeaders(headers) {
    this.init.headers = { ...this.init.headers, ...headers };
    return this;
  },

  withBasicAuth(user, pass) {
    const encoded = btoa(`${user}:${pass}`);
    const header = { Authorization: `Basic ${encoded}` };
    this.init.headers = { ...this.init.headers, ...header };
    return this;
  },

  withBearerAuth(token) {
    const header = { Authorization: `Bearer ${token}` };
    this.init.headers = { ...this.init.headers, ...header };
    return this;
  },

  withBody(body, contentType) {
    this.init.body = body;
    this.withHeaders({ "Content-Type": contentType });
    return this;
  },

  withJsonBody(body) {
    this.init.body = JSON.stringify(body);
    return this;
  },

  withCaching(setting) {
    this.init.cache = setting;
    return this;
  },

  withCredentials(setting) {
    this.init.credentials = setting;
    return this;
  },

  withIntegrity(hash) {
    this.init.integrity = hash;
    return this;
  },

  withKeepAlive(setting) {
    this.init.keepalive = setting;
    return this;
  },

  withMode(mode) {
    this.init.mode = mode;
    return this;
  },

  withRedirect(setting) {
    this.init.redirect = setting;
    return this;
  },

  withReferrer(url) {
    this.init.referrer = url;
    return this;
  },

  withReferrerPolicy(setting) {
    this.init.referrerPolicy = setting;
    return this;
  },

  withAbortSignal(signal) {
    this.init.signal = signal;
    return this;
  },

  withoutWindow() {
    this.init.window = null;
    return this;
  },

  withTextDecoding(...contentTypePatterns) {
    for (const p of contentTypePatterns) {
      this.init.httpotron.decoding.textTypes.add(p);
    }
    return this;
  },

  withoutTextDecoding() {
    this.init.httpotron.decoding.textTypes = new Set();
    return this;
  },

  withJsonDecoding(...contentTypePatterns) {
    for (const p of contentTypePatterns) {
      this.init.httpotron.decoding.jsonTypes.add(p);
    }
    return this;
  },

  withoutJsonDecoding() {
    this.init.httpotron.decoding.jsonTypes = new Set();
    return this;
  },

  withBlobDecoding(...contentTypePatterns) {
    for (const p of contentTypePatterns) {
      this.init.httpotron.decoding.blobTypes.add(p);
    }
    return this;
  },

  withoutBlobDecoding() {
    this.init.httpotron.decoding.blobTypes = new Set();
    return this;
  },

  withoutDecoding() {
    this.init.httpotron.decoding.textTypes = new Set();
    this.init.httpotron.decoding.jsonTypes = new Set();
    this.init.httpotron.decoding.blobTypes = new Set();
    return this;
  },
};
