interface RouteHandler {
  (
    user: any,
    context: { req: any; res: any; log: any },
    body: any
  ): Promise<any>;
}

interface Routes {
  [key: string]: RouteHandler;
}

export const routes: Routes = {};
