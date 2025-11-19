import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import UsersTable from "./components/UsersTable";
import NewUserModal from "./components/NewUserModal";

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users"); // make sure the port matches backend
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // When a new user is saved
  const handleUserSaved = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setModalVisible(false);
  };

  // Landing screen JSX
  const landingScreen = (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-3">Create a new user</h1>
      <h4 className="text-center mb-6">
        Add user details, set permissions, and assign roles to manage access within your system.
      </h4>
      <Button
        type="primary"
        size="large"
        className="!bg-black !border-black !text-white hover:!bg-gray-900"
        onClick={() => setModalVisible(true)}
      >
        + Add New User
      </Button>
    </div>
  );

  return (
    <div>
      {users.length > 0 ? (
        <UsersTable
          users={users}
          onAddUser={() => setModalVisible(true)}
          onViewUser={(user) => console.log("View user:", user)}
        />
      ) : (
        landingScreen
      )}

      {modalVisible && (
        <NewUserModal
          visible={modalVisible}
          setVisible={setModalVisible}
          onUserSaved={handleUserSaved}
        />
      )}
    </div>
  );
};

export default App;
