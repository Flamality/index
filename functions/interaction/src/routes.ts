import me from './paths/me.js';
import userGet from './paths/user/get.js';
import friendGet from './paths/friend/get.js';
import connectionAdd from './paths/connection/add.js';

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

export const routes: Routes = {
  '/me': me,

  '/user/get': userGet,

  '/friend/get': friendGet,

  '/connection/add': connectionAdd,
};
