import test from "ava";
import {
  defaultBlobPatterns,
  defaultJsonPatterns,
  defaultTextPatterns,
  matchesContentType,
} from "./decoding.js";

test("matchesContentType for text", (t) => {
  const cts = ["text/html", "text/xml", "text/svg+xml"];
  for (let ct of cts) {
    t.assert(matchesContentType(ct, defaultTextPatterns), `'${ct}'`);
  }
});

test("matchesContentType for json", (t) => {
  const cts = ["application/json", "application/json; charset=utf-8"];
  for (let ct of cts) {
    t.assert(matchesContentType(ct, defaultJsonPatterns), `'${ct}'`);
  }
});

test("matchesContentType for blob", (t) => {
  const cts = ["application/octet-stream", "image/jpg", "image/gif", "application/pdf"];
  for (let ct of cts) {
    t.assert(matchesContentType(ct, defaultBlobPatterns), `'${ct}'`);
  }
});
