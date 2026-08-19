import {
  Client,
  Users,
  Account,
  Databases,
  TablesDB,
  Presences,
  Functions,
} from 'node-appwrite';

export const aclient = new Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT as string)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID as string);
// Appwrite Functions
export const users = new Users(aclient);
export const account = new Account(aclient);
export const databases = new Databases(aclient);
export const tablesDB = new TablesDB(aclient);
export const presences = new Presences(aclient);
export const functions = new Functions(aclient);
