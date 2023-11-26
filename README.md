## HTTP-otron

HTTP-otron significantly enhances the usability and robustness of the Fetch API, both in the browser and in Node.js.

Create a client with defaults:

```javascript
import { createHttpClient } from "@fizbik/http-otron";

const client = createHttpClient()
    .withBaseUrl("https://api.somewhere.com")
    .withBearerAuth("TOKEN")
    .withHeaders({ "X-Custom-Header": "VALUE" });
```

Use the client to create and send requests:

```javascript
const result = await client
    .createHttpRequest()
    .withMethod("POST")
    .withJsonBody({ name: "Micah", number: 11 })
    .send(); // will never throw an exception

if (result.error) {
    switch (result.error.type) {
        case NETWORK_ERR:
        // the app is offline
        case CORS_ERR:
        // the browser blocked the request
        case REQUEST_ERR:
        // the request was malformed, see result.error.message
        case RESPONSE_ERR:
        // the response body was malformed, see result.error.message
    }
}

console.log(result.httpStatus); // 200, 400, 502, etc.
console.log(result.decoded); // automatically decoded response body (text, json, or blob)
console.log(result.response); // the complete Fetch API Response object
```

## Features

:heavy_check_mark: Expressive, developer-friendly API that aligns with the Fetch API's `RequestInit` type  
:heavy_check_mark: Sane defaults: automatic text, JSON, and blob response decoding  
:heavy_check_mark: Robust error handling for problems with the network, CORS, request format, and response format  
:heavy_check_mark: No exceptions thrown, everything returned in a `Result` object  
:heavy_check_mark: No assumptions made about whether an HTTP status is an error or not [TBD article]().  
:heavy_check_mark: Zero dependencies  
:heavy_check_mark: 100% unit test coverage

## Install

Requires the Fetch API or a polyfill.

```shell
$ npm install @fizbig/http-tron
```

Or the equivalent commands for `pnpm` or `yarn`.

## Usage
