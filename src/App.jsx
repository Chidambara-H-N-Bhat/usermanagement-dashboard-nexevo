import React, { useState, useEffect } from "react";
import UsersTable from "./components/UsersTable";
import NewUserModal from "./components/NewUserModal";
import ViewUser from "./components/view";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const handleUserSaved = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setModalVisible(false);
  };

  // View user
  const handleViewUser = (user) => {
    setViewUser(user);
  };

  const handleCancelView = () => {
    setViewUser(null);
  };

  // Save edited user
  const handleSaveUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setViewUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!viewUser ? (
        <>
          <UsersTable
            users={users}
            onAddUser={() => setModalVisible(true)}
            onViewUser={handleViewUser}
          />

          {modalVisible && (
            <NewUserModal
              visible={modalVisible}
              setVisible={setModalVisible}
              onUserSaved={handleUserSaved}
            />
          )}
        </>
      ) : (
        <ViewUser
          user={viewUser}
          onCancel={handleCancelView}
          onSave={handleSaveUser}
          onAddUser={() => setModalVisible(true)}
        />
      )}
    </div>
  );
};

export default App;


