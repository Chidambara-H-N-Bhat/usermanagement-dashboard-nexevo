import React, { useState, useEffect } from "react";
import { Modal, Input, Tag, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const countriesList = [
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
];

const ViewUserModal = ({ visible, setVisible, user, onUserUpdated, onAddUser }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    setCode: "",
    countries: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        setCode: user.setCode,
        countries: user.countries || [],
      });
    }
    setEditable(false);
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, formData);
      message.success("User updated successfully!");
      onUserUpdated?.(); // refresh parent table
      setEditable(false);
      setVisible(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Failed to update user.");
    }
  };

  return (
    <Modal
      title="User Details"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <div className="w-full flex justify-between items-center">
          {/* Add New User button */}
          <Button
            key="addNew"
            type="primary"
            className="!bg-black !border-black !text-white hover:!bg-gray-900"
            onClick={onAddUser} // call parent handler
          >
            + Add New User
          </Button>

          <div>
            <Button key="cancel" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            {editable ? (
              <Button key="save" type="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button key="edit" type="primary" onClick={() => setEditable(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>,
      ]}
    >
      <div className="flex flex-col gap-4">
        {/* Username */}
        <div>
          <label className="font-semibold mr-2">Username:</label>
          {editable ? (
            <Input
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          ) : (
            <span>{formData.username}</span>
          )}
        </div>

        {/* Set Code */}
        <div>
          <label className="font-semibold mr-2">Set Code:</label>
          {editable ? (
            <Input
              value={formData.setCode}
              onChange={(e) => handleChange("setCode", e.target.value)}
            />
          ) : (
            <span>{formData.setCode || "-"}</span>
          )}
        </div>

        {/* Countries */}
        <div>
          <label className="font-semibold mr-2">Countries:</label>
          {editable ? (
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select countries"
              value={formData.countries}
              onChange={(values) => handleChange("countries", values)}
            >
              {countriesList.map((c) => (
                <Option key={c.code} value={c.name}>
                  {c.flag} {c.name}
                </Option>
              ))}
            </Select>
          ) : (
            formData.countries.map((c) => (
              <Tag key={c} color="blue">
                {c}
              </Tag>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserModal;
