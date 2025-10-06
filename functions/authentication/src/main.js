import { Client, Users } from 'node-appwrite';
import { randomID } from '../../../src/services/appwrite';
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  if (req.path === "/create-account") {
    const { email, password, name } = req.body
    const id = randomID();
    const user = await users.create(id, email, null, password, name)
  }
  if (req.path === "/check-username") {

  }
};
