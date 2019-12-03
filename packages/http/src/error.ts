export class HttpFetchError extends Error {
  response: Response;

  constructor(message: string) {
    super(message);

    this.name = "HttpFetchError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpFetchError);
    }
  }
}

export class HttpResponseError extends Error {
  response: Response;
  responseJson: any;

  constructor(response: Response, responseJson?: any) {
    super(response.statusText);

    this.name = "HttpResponseError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpResponseError);
    }

    this.response = response;
    this.responseJson = responseJson;
  }
}

export class HttpParseError extends Error {
  response: Response;

  constructor(response: Response) {
    super(response.statusText);

    this.name = "HttpParseError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpParseError);
    }

    this.response = response;
  }
}
