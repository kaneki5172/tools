const defaultConfig: any = {};

export const fetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const req = new Request(input, Object.assign(defaultConfig, init));
  return self.fetch(req);
};
