import test from "ava";
import Chance from "chance";

import { createResult, createResultFromError } from "./result.js";
import { createResponseErr } from "./errors.js";

const chance = new Chance();

test("createResult", (t) => {
  const url = chance.url();
  const status = 200;
  const response = new Response({ status });
  const decoded = chance.string();

  const result = createResult(url, response, decoded);

  t.assert(result.url === url);
  t.assert(result.httpStatus === status);
  t.assert(result.response === response);
  t.assert(result.decoded === decoded);
});

test("createResultFromError", (t) => {
  const url = chance.url();
  const status = 200;
  const response = new Response({ status });
  const err = createResponseErr();

  const result = createResultFromError(url, err, response);

  t.assert(result.url === url);
  t.assert(result.httpStatus === status);
  t.assert(result.response === response);
  t.assert(result.error === err);
});

test("createResultFromError without response", (t) => {
  const url = chance.url();
  const err = createResponseErr();

  const result = createResultFromError(url, err);

  t.assert(result.url === url);
  t.assert(result.error === err);
});
