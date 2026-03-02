import { Client, Users, Account, Databases, TablesDB } from 'node-appwrite';
import { routes } from './routes.js';
const client = new Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT as string)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID as string);
// Appwrite Functions
export const users = new Users(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export default async (context: any) => {
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
  const body = context.req.body ? JSON.parse(context.req.body) : {};
  if (!handler) return context.res.text('Invalid path.', 400);
  const res = await handler(user, context, body);
  if (res) return res;
  else return context.res.text('Completed with no return.', 200);
};
