import { account, client } from './appwrite/client.js';
import { aclient } from './appwrite/server.js';
import { routes } from './services/generated-routes.js';
import { createNotification } from './services/notification.js';

export default async (context: any) => {
  aclient.setKey(context.req.headers['x-appwrite-key'] as string);
  // Get User
  if (context.req.headers['x-appwrite-user-jwt']) {
    client.setJWT(context.req.headers['x-appwrite-user-jwt']);
  }
  context.log(context.req);
  try {
    context.log(JSON.stringify(context.req));
  } catch (error) {}
  let user = null;
  try {
    user = await account.get();
  } catch (err) {
    user = null;
  }

  if (context.req.path === '/ping') {
    return context.res.text('Pong');
  }
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
  const r = routes as Routes;
  const handler = r[context.req.path] as any;
  if (!handler) return context.res.text('Invalid path.', 400);
  const body = context.req.body ? JSON.parse(context.req.body) : {};
  const res = await handler(user, context, body);
  if (res) return res;
  else return context.res.text('Completed with no return.', 200);
};
