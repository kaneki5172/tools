import { fetch } from "./fetch";
import { HttpFetchError, HttpResponseError, HttpParseError } from "./error";

export interface HttpParams {
  [key: string]: any;
}
export interface RequestCustomOptions {
  responseType?: "json" | "blob" | "arrayBuffer" | "text";
}

export type HttpOptions = HttpParams & RequestCustomOptions & RequestInit;

const base = document.querySelector("base");
const fullBaseHref = base ? base.href : location.origin + "/";

const request = async <T = any>(url: string, init?: RequestInit, options: RequestCustomOptions = {}): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(url, init);
  } catch (e) {
    throw new HttpFetchError(e.toString());
  }

  if (!response.ok) {
    let responseJson;
    try {
      responseJson = await response.json();
    } catch (e) {
      // Do nothing.
    }
    throw new HttpResponseError(response, responseJson);
  }

  let { responseType } = options;
  if (!responseType) {
    // Defaults to `json`
    responseType = "json";
  }
  let result: T;
  try {
    result = await response[responseType]();
  } catch (e) {
    throw new HttpParseError(response);
  }
  return result;
};

const getUrlWithParams = (url: string, params?: HttpParams): string => {
  if (params) {
    const parsedUrl = new URL(url, fullBaseHref);
    for (const [key, value] of Object.entries(params)) {
      parsedUrl.searchParams.set(key, value);
    }
    const { href } = parsedUrl;
    if (href.startsWith(fullBaseHref)) {
      return href.substr(fullBaseHref.length);
    }
    return href;
  }
  return url;
};

const getRequestBoty = (data: any, headers: HeadersInit): { body?: BodyInit; headers?: HeadersInit } => {
  if (data !== undefined) {
    const parsedHeaders = new Headers(headers);
    let body = data;
    if (typeof data === "string") {
      parsedHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    } else if (data instanceof FormData) {
      // Do nothing
    } else {
      parsedHeaders.set("Content-Type", "application/json");
      body = JSON.stringify(data);
    }
    return {
      body,
      headers: parsedHeaders
    };
  }
  return {};
};

const simpleRequest = <T = any>(method: string, url: string, options: HttpOptions = {}): Promise<T> => {
  const { params, responseType, ...requestInit } = options;
  return request<T>(
    getUrlWithParams(url, params),
    {
      method,
      ...requestInit
    },
    {
      responseType
    }
  );
};

const requestWithBody = <T = any>(method: string, url: string, data?: any, options: HttpOptions = {}): Promise<T> => {
  const { params, responseType, headers, ...requestInit } = options;
  return request<T>(
    getUrlWithParams(url, params),
    {
      method,
      ...requestInit,
      ...getRequestBoty(data, headers)
    },
    {
      responseType
    }
  );
};

const get = <T = any>(url: string, options?: HttpOptions): Promise<T> => simpleRequest<T>("GET", url, options);

const httpDelete = <T = any>(url: string, options?: HttpOptions): Promise<T> =>
  simpleRequest<T>("DELETE", url, options);

const post = <T = any>(url: string, data: any, options?: HttpOptions): Promise<T> =>
  requestWithBody("POST", url, data, options);

const put = <T = any>(url: string, data: any, options?: HttpOptions): Promise<T> =>
  requestWithBody("PUT", url, data, options);

export const http = {
  get,
  delete: httpDelete,
  post,
  put
};
