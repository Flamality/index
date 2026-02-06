import { Client, Users, Account, Databases, TablesDB } from 'node-appwrite';
import { routes } from './routes.js';
const client = new Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID);
// Appwrite Functions
export const users = new Users(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export default async (context) => {
  // Get User

  if (context.req.headers['x-appwrite-user-jwt']) {
    client.setJWT(context.req.headers['x-appwrite-user-jwt']);
  }
  context.log(context.req);
  let user = null;
  try {
    user = await account.get();
  } catch (err) {
    user = null;
  }
  context.log(user);
  if (user) {
    tablesDB.updateRow({
      databaseId: 'main',
      tableId: 'users',
      rowId: user.$id,
      data: {
        last_update: new Date().toISOString(),
        online: true,
      },
    });
  }

  if (context.req.path === '/ping') {
    return context.res.text('Pong');
  }

  const handler = routes[context.req.path];
  if (!handler) return context.res.text('Invalid path.', 400);
  const res = await handler(user, context);
  if (res) return res;
  else return context.res.text('Completed with no return.', 200);
  // OLD
  switch (req.path) {
    case '/user/get':
      if (!context.req.query.id) return res.text('No ID provided');
      let userData2 = await databases.getDocument(
        'main',
        'users',
        context.req.query.id
      );
      if (user) {
        try {
          const relForUserData2 = await databases.getDocument(
            'main',
            'users',
            user.$id + context.req.query.id
          );
          userData2 = { ...userData2, ...{ relation: relForUserData2?.type } };
        } catch (error) {
          userData2 = { ...userData2, relation: 0 };
        }
      }
      return context.res.json(userData2);
    case '/me/friends':
      return context.res.text('Bob');
    case '/friend/add':
      return context.res.text('Dont feel like accepting that');
    case '/friend/remove':
      return context.res.text('Bob');
    default:
      return context.res.text('No path given :(');
  }
};
