import { Client, Users, Account, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
    // Appwrite Functions
  const users = new Users(client);
  const account = new Account(client);
  const databases = new Databases(client);
    // Get User
    let user = null;
    try {
      user = await account.get();
    } catch (err) {
      try {
        user = await users.get(req.variables.APPWRITE_FUNCTION_USER_ID)
      } catch (error) {
        
      }
    }

  if (req.path === "/ping") {
    return res.text("Pong");
  }

  switch(req.path){
    case("/me"):
      if (!user) return res.text("No user logged in");
      const userData = await databases.getDocument("main", "users", user.$id);
      const fullData = {...user, ...userData};
      return res.json(fullData || null);
    case("/user/get"):
      if (!req.query.id) return res.text("No ID provided");
      let userData2 = await databases.getDocument("main","users", req.query.id);
      if (user) {
        try {
          const relForUserData2 = await databases.getDocument("main", "users", user.$id + req.query.id)
          userData2 = {...userData2, ...{relation: relForUserData2?.type}}
        } catch (error) {
          userData2 = {...userData2, relation: 0}
        }
      }
      return res.json(userData2);
    case("/me/friends"):
      return res.text("Bob")
    case("/friend/add"):
      return res.text("Dont feel like accepting that")
    case("/friend/remove"):
      return res.text("Bob")
    default:
      return res.text("No path given :(");
  }
};
