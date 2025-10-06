import { Client, Users, Account } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  const account = new Account(client);

  const user = await account.get();

  if (req.path === "/ping") {
    return res.text("Pong");
  }

  switch(req.path){
    case("/me"):
      return res.json(user)
    case(""):
      return res.text("NO")
  }
};
