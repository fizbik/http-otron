import test from "ava";
import Chance from "chance";

import { createHttpClient } from "./client.js";
import { CORS_ERR, NETWORK_ERR, REQUEST_ERR, RESPONSE_ERR } from "./errors.js";

const chance = new Chance();

test("constructor", (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();

  t.assert(request.client === client);
  t.deepEqual(request.init, client.init);
});

test("withStubResult", (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const stub = {};

  const returned = request.withStubResult(stub);
  const result = request.send();

  t.assert(returned === request);
  t.assert(result === stub);
});

test("withFetchFn from client", async (t) => {
  const client = createHttpClient();
  const fn = () => {
    t.pass();
    return new Response(null, { status: 200 });
  };
  client.withFetchFn(fn);

  const request = client.createHttpRequest();
  const result = await request.send("https://github.com");
});

test("withFetchFn from request", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const fn = () => {
    t.pass();
    return new Response(null, { status: 200 });
  };
  request.withFetchFn(fn);

  const result = await request.send("https://github.com");
});

test("bad URL", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();

  const result = await request.send("bad");

  t.assert(result.error.type === REQUEST_ERR);
  t.assert(result.error.message);
});

test("clean response", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const fn = () => {
    return new Response(null, { status: 200 });
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.httpStatus === 200);
  t.assert(result.error === undefined);
  t.assert(result.decoded === undefined);
});

test("no network", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const message = "Fetch failed";
  const fn = () => {
    throw new TypeError(message);
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.httpStatus === undefined);
  t.deepEqual(result.error, { type: NETWORK_ERR, message });
  t.assert(result.decoded === undefined);
});

test("request error", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const message = chance.sentence();
  const fn = () => {
    throw new TypeError(message);
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.httpStatus === undefined);
  t.deepEqual(result.error, { type: REQUEST_ERR, message });
  t.assert(result.decoded === undefined);
});

test("CORS error", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const fn = () => {
    return { ok: false, type: "opaque" };
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.httpStatus === undefined);
  t.assert(result.error.type === CORS_ERR);
  t.assert(result.decoded === undefined);
});

test("text response", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const text = chance.sentence();
  const fn = () => {
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": text.length,
      },
    });
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.error === undefined);
  t.assert(result.decoded === text);
});

test("json response", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const obj = { a: 1, b: { c: 2 } };
  const objJson = JSON.stringify(obj);
  const fn = () => {
    return new Response(objJson, {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": objJson.length,
      },
    });
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.error === undefined);
  t.deepEqual(result.decoded, obj);
});

test("blob response", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const text = chance.sentence();
  const textBin = new TextEncoder().encode(text);
  const ct = "application/octet-stream";
  const fn = () => {
    return new Response(textBin, {
      headers: {
        "Content-Type": ct,
        "Content-Length": textBin.length,
      },
    });
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.error === undefined);
  t.assert(result.decoded.size === textBin.length);
  t.assert(result.decoded.type === ct);
});

test("response error", async (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();
  const url = chance.url();
  const json = "{bad}}";
  const ct = "application/json";
  const fn = () => {
    return new Response(json, {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": json.length,
      },
    });
  };
  request.withFetchFn(fn);

  const result = await request.send(url);

  t.assert(result.url === url);
  t.assert(result.error.type === RESPONSE_ERR);
  t.assert(result.response);
});
