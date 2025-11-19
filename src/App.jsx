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

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSaved = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setNewUserModalVisible(false);
  };

  // Triggered from ViewUserModal to open NewUserModal
  const handleOpenNewUser = () => {
    setViewUser(null); // close view modal
    setNewUserModalVisible(true); // open new user modal
  };

  return (
    <div>
      {users.length > 0 ? (
        <UsersTable
          users={users}
          onAddUser={() => setNewUserModalVisible(true)}
          onViewUser={(user) => setViewUser(user)}
        />
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-3xl font-bold mb-3">Create a new user</h1>
          <h4 className="text-center mb-6">
            Add user details, set permissions, and assign roles to manage access within your system.
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

      {/* New User Modal */}
      {newUserModalVisible && (
        <NewUserModal
          visible={newUserModalVisible}
          setVisible={setNewUserModalVisible}
          onUserSaved={handleUserSaved}
        />
      )}

      {/* View User Modal */}
      {viewUser && (
        <ViewUserModal
          visible={!!viewUser}
          setVisible={() => setViewUser(null)}
          user={viewUser}
          onAddUser={handleOpenNewUser} // open new user modal from view modal
        />
      )}
    </div>
  );
};

export default App;
