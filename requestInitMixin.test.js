import test from "ava";
import Chance from "chance";

import { defaultRequestInit, RequestInitMixin } from "./requestInitMixin.js";

const chance = new Chance();

test("withMethod", (t) => {
  const method = chance.pickone(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"]);
  const subj = createTestSubject();

  const returned = subj.withMethod(method);

  t.assert(returned === subj);
  t.assert(subj.init.method === method);
});

test("withHeaders", (t) => {
  const headers = { foo: "bar" };
  const subj = createTestSubject();

  const returned = subj.withHeaders(headers);

  t.assert(returned === subj);
  t.assert("foo" in subj.init.headers);
  t.assert(subj.init.headers.foo === headers.foo);
});

test("withBasicAuth", (t) => {
  const user = "user";
  const pass = "pass";
  const encoded = btoa(`${user}:${pass}`);
  const header = { Authorization: "Basic " + encoded };
  const subj = createTestSubject();

  const returned = subj.withBasicAuth(user, pass);

  t.assert(returned === subj);
  t.assert("Authorization" in subj.init.headers);
  t.assert(subj.init.headers.Authorization === header.Authorization);
});

test("withBearerAuth", (t) => {
  const token = "token";
  const header = { Authorization: "Bearer token" };
  const subj = createTestSubject();

  const returned = subj.withBearerAuth(token);

  t.assert(returned === subj);
  t.assert("Authorization" in subj.init.headers);
  t.assert(subj.init.headers.Authorization === header.Authorization);
});

test("withBody", (t) => {
  const body = chance.guid();
  const subj = createTestSubject();

  const returned = subj.withBody(body);

  t.assert(returned === subj);
  t.assert(subj.init.body === body);
});

test("withJsonBody", (t) => {
  const obj = { a: 1, b: 2 };
  const subj = createTestSubject();

  const returned = subj.withJsonBody(obj);

  t.assert(returned === subj);
  t.assert(subj.init.body === JSON.stringify(obj));
});

test("withTextDecoding", (t) => {
  const type = /^foo\/bar/;
  const subj = createTestSubject();

  const returned = subj.withTextDecoding(type);

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.textTypes.has(type));
});

test("withoutTextDecoding", (t) => {
  const subj = createTestSubject();

  const returned = subj.withoutTextDecoding();

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.textTypes.size === 0);
});

test("withJsonDecoding", (t) => {
  const type = /^foo\/bar/;
  const subj = createTestSubject();

  const returned = subj.withJsonDecoding(type);

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.jsonTypes.has(type));
});

test("withoutJsonDecoding", (t) => {
  const subj = createTestSubject();

  const returned = subj.withoutJsonDecoding();

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.jsonTypes.size === 0);
});

test("withBlobDecoding", (t) => {
  const type = /^foo\/bar/;
  const subj = createTestSubject();

  const returned = subj.withBlobDecoding(type);

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.blobTypes.has(type));
});

test("withoutBlobDecoding", (t) => {
  const subj = createTestSubject();

  const returned = subj.withoutBlobDecoding();

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.blobTypes.size === 0);
});

test("withoutDecoding", (t) => {
  const subj = createTestSubject();

  const returned = subj.withoutDecoding();

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.decoding.textTypes.size === 0);
  t.assert(subj.init.httpotron.decoding.jsonTypes.size === 0);
  t.assert(subj.init.httpotron.decoding.blobTypes.size === 0);
});

test("withCaching", (t) => {
  const setting = chance.pickone([
    "default",
    "force-cache",
    "no-cache",
    "no-store",
    "only-if-cached",
    "reload",
  ]);
  const subj = createTestSubject();

  const returned = subj.withCaching(setting);

  t.assert(returned === subj);
  t.assert(subj.init.cache === setting);
});

test("withCredentials", (t) => {
  const setting = chance.pickone(["include", "omit", "same-origin"]);
  const subj = createTestSubject();

  const returned = subj.withCredentials(setting);

  t.assert(returned === subj);
  t.assert(subj.init.credentials === setting);
});

test("withIntegrity", (t) => {
  const hash = chance.hash();
  const subj = createTestSubject();

  const returned = subj.withIntegrity(hash);

  t.assert(returned === subj);
  t.assert(subj.init.integrity === hash);
});

test("withKeepAlive", (t) => {
  const setting = true;
  const subj = createTestSubject();

  const returned = subj.withKeepAlive(setting);

  t.assert(returned === subj);
  t.assert(subj.init.keepalive === setting);
});

test("withMode", (t) => {
  const mode = chance.pickone(["cors", "navigate", "no-cors", "same-origin"]);
  const subj = createTestSubject();

  const returned = subj.withMode(mode);

  t.assert(returned === subj);
  t.assert(subj.init.mode === mode);
});

test("withRedirect", (t) => {
  const setting = chance.pickone(["error", "follow", "manual"]);
  const subj = createTestSubject();

  const returned = subj.withRedirect(setting);

  t.assert(returned === subj);
  t.assert(subj.init.redirect === setting);
});

test("withReferrer", (t) => {
  const url = chance.url();
  const subj = createTestSubject();

  const returned = subj.withReferrer(url);

  t.assert(returned === subj);
  t.assert(subj.init.referrer === url);
});

test("withReferrerPolicy", (t) => {
  const setting = chance.pickone([
    "",
    "no-referrer",
    "no-referrer-when-downgrade",
    "origin",
    "origin-when-cross-origin",
    "same-origin",
    "strict-origin",
    "strict-origin-when-cross-origin",
    "unsafe-url",
  ]);
  const subj = createTestSubject();

  const returned = subj.withReferrerPolicy(setting);

  t.assert(returned === subj);
  t.assert(subj.init.referrerPolicy === setting);
});

test("withAbortSignal", (t) => {
  const controller = new AbortController();
  const subj = createTestSubject();

  const returned = subj.withAbortSignal(controller.signal);

  t.assert(returned === subj);
  t.assert(subj.init.signal === controller.signal);
});

test("withoutWindow", (t) => {
  const subj = createTestSubject();

  const returned = subj.withoutWindow();

  t.assert(returned === subj);
  t.assert(subj.init.window === null);
});

test("withFetchFn", (t) => {
  const subj = createTestSubject();
  const fn = () => {};

  const returned = subj.withFetchFn(fn);

  t.assert(returned === subj);
  t.assert(subj.init.httpotron.fetch === fn);
});

function createTestSubject() {
  return new TestSubject();
}

class TestSubject {
  constructor() {
    this.init = { ...defaultRequestInit };
  }
}

Object.assign(TestSubject.prototype, RequestInitMixin);
