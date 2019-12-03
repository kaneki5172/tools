import { interceptors, NextInterceptor } from "./interceptorManager";
const { request } = interceptors;

const defaultConfig: any = {};

export const fetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const req = new Request(input, Object.assign(defaultConfig, init));
  let last = (req: Request): Promise<Response> => self.fetch(req);
  for (const inter of request.interceptors.slice().reverse()) {
    const next: NextInterceptor = last;
    last = req => inter(req, next);
  }
  return last(req);
};
