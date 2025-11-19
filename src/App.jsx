import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import UsersTable from "./components/UsersTable";
import NewUserModal from "./components/NewUserModal";
import ViewUserModal from "./components/ViewUserModal";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUserModalVisible, setNewUserModalVisible] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  
  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error fetching users", err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSaved = (newUser) => {
    
    fetchUsers();
    setNewUserModalVisible(false);
  };

  const handleOpenNewUser = () => {
    setViewUser(null); 
    setNewUserModalVisible(true); 
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setViewUser(null);
  };

  return (
    <div>
      {users.length > 0 ? (
        <div>
          <UsersTable
            users={users}
            onAddUser={() => setNewUserModalVisible(true)}
            onViewUser={(user) => setViewUser(user)}
          />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-3xl font-bold mb-3">Create a new user</h1>
          <h4 className="text-center mb-6">
            Add user details, set permissions, and assign roles.
          </h4>
          <Button
            type="primary"
            size="large"
            className="!bg-black !border-black !text-white hover:!bg-gray-900"
            onClick={() => setNewUserModalVisible(true)}
          >
            + Add New User
          </Button>
        </div>
      )}

      {newUserModalVisible ? (
        <NewUserModal
          visible={newUserModalVisible}
          setVisible={setNewUserModalVisible}
          onUserSaved={handleUserSaved}
        />
      ) : null}

      {viewUser ? (
        <ViewUserModal
          visible={true}
          setVisible={() => setViewUser(null)}
          user={viewUser}
          onAddUser={handleOpenNewUser}
          onUserUpdated={handleUserUpdated}
        />
      ) : null}
    </div>
  );
};

export default App;
