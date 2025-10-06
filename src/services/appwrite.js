import { Client, Account, Databases, Storage, Functions } from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_API_URL)
  .setProject(import.meta.env.VITE_APPWRITE_ID)
  .setDevKey(import.meta.env.VITE_DEV_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const randomID = () => {
  var random = Math.floor(1e9 + Math.random() * 9e9);
  return random.toString();
};

export const registerUser = async (email, password, username) => {
  try {
    const user = await account.create(randomID(), email, password, username);
    await account.createEmailPasswordSession(email, password);
    await account.createVerification(
      "https://flamality.com/account/verify-email"
    );
    await databases.createDocument("main", "users", user.$id, {
      username: username,
      email: email,
      UID: user.$id,
    });
    window.location.reload();
  } catch (error) {
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

export const execute = async (func, path, ...arg) => {
  try {
    const res = await functions.createExecution(func, arg, true, arg);
    return res;
  } catch (error) {
    
  }
}


export const addFriend = async (user) => {
  
}