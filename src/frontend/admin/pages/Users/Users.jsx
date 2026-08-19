import React, { useEffect, useState } from "react";
import { databases } from "../../../services/appwrite";
import Button from "../../../components/core/elements/inputs/buttons/Button/Button";
import ManageUser from "./ManageUser/ManageUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [manageUser, setManageUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      databases
        .listDocuments({
          databaseId: "main",
          collectionId: "users",
        })
        .then((response) => {
          setUsers(response.documents);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
    fetchUsers();
  }, []);
  const closeManageUser = () => {
    setManageUser(null);
  };
  return (
    <div>
      {manageUser && <ManageUser close={closeManageUser} user={manageUser} />}
      <h1>Users</h1>
      <table>
        <tr>
          <th>Username</th>
          <th>Display Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        {users.map((user) => (
          <tr key={user.$id}>
            <td>{user?.username}</td>
            <td>{user?.display}</td>
            <td>{user?.email}</td>
            <td>
              <Button onClick={() => setManageUser(user)}>Manage</Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
