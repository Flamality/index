import {
  Client,
  Users,
  Account,
  Databases,
  TablesDB,
  Presences,
  Functions,
} from 'node-appwrite';

export const client = new Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT as string)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID as string);
// Appwrite Functions
export const users = new Users(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export const presences = new Presences(client);
export const functions = new Functions(client);

export const execute = async (func: string, path: string, arg: any) => {
  try {
    const res = await functions.createExecution({
      functionId: func,
      body: JSON.stringify(arg),
      async: false,
      xpath: path,
    });
    const body = JSON.parse(res.responseBody);
    return body;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: error.message,
      functionId: func,
      xpath: path,
      body: JSON.stringify(arg),
    };
  }
};
