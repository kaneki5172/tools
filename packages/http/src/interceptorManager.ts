export type NextInterceptor = (req: Request) => Promise<Response>;

type Interceptor = (req: Request, next: NextInterceptor, extra?: any) => Promise<Response>;

type RemoveInterceptor = () => void;

class InterceptorManager {
  interceptors: Interceptor[];

  constructor() {
    this.interceptors = [];
  }

  use(interceptor: Interceptor): RemoveInterceptor {
    this.interceptors.push(interceptor);
    return () => {
      if (this.interceptors.includes(interceptor)) {
        this.interceptors.splice(this.interceptors.indexOf(interceptor), 1);
      }
    };
  }
}

const request = new InterceptorManager();

export const interceptors = {
  request
};
