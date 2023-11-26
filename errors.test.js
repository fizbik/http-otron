import test from "ava";
import Chance from "chance";

import {
  createNetworkErr,
  createTimeoutErr,
  createCorsErr,
  createRequestErr,
  createResponseErr,
  NETWORK_ERR,
  TIMEOUT_ERR,
  CORS_ERR,
  REQUEST_ERR,
  RESPONSE_ERR,
} from "./errors.js";

const chance = new Chance();

test("createNetworkErr", (t) => {
  const message = chance.sentence();

  const err = createNetworkErr(message);

  t.assert(err.type === NETWORK_ERR);
  t.assert(err.message === message);
});

test("createTimeoutErr", (t) => {
  const message = chance.sentence();

  const err = createTimeoutErr(message);

  t.assert(err.type === TIMEOUT_ERR);
  t.assert(err.message === message);
});

test("createCorsErr", (t) => {
  const message = chance.sentence();

  const err = createCorsErr(message);

  t.assert(err.type === CORS_ERR);
  t.assert(err.message === message);
});

test("createRequestErr", (t) => {
  const message = chance.sentence();

  const err = createRequestErr(message);

  t.assert(err.type === REQUEST_ERR);
  t.assert(err.message === message);
});

test("createResponseErr", (t) => {
  const message = chance.sentence();

  const err = createResponseErr(message);

  t.assert(err.type === RESPONSE_ERR);
  t.assert(err.message === message);
});
