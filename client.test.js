import test from "ava";
import Chance from "chance";

import { createHttpClient } from "./client.js";
import { defaultRequestInit } from "./requestInitMixin.js";

const chance = new Chance();

test("constructor", (t) => {
  const client = createHttpClient();

  t.deepEqual(client.init, defaultRequestInit);
  t.assert(client.baseUrl === "");
});

test("createRequest", (t) => {
  const client = createHttpClient();
  const request = client.createHttpRequest();

  t.deepEqual(client.init, request.init);
});

test("withBaseUrl", (t) => {
  const url = chance.url();
  const client = createHttpClient();
  client.withBaseUrl(url);

  t.assert(client.baseUrl === url);
});
