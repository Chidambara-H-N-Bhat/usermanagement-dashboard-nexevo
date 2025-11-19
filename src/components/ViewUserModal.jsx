import React, { useState, useEffect } from "react";
import { Modal, Input, Tag, Button, Select, message } from "antd";
import axios from "axios";

const Option = Select.Option;

const countriesList = [
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
];

const ViewUserModal = function(props) {
  const visible = props.visible;
  const setVisible = props.setVisible;
  const user = props.user;
  const onUserUpdated = props.onUserUpdated;
  const onAddUser = props.onAddUser;

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    setCode: "",
    countries: [],
  });

  useEffect(function() {
    if (user) {
      setFormData({
        username: user.username,
        setCode: user.setCode,
        countries: user.countries || [],
      });
    }
    setEditable(false);
  }, [user]);

  function handleChange(field, value) {
    var newData = {...formData};
    newData[field] = value;
    setFormData(newData);
  }

  async function handleSave() {
    try {
      await axios.put("http://localhost:5000/users/" + user.id, formData);
      message.success("User updated successfully!");
      if (onUserUpdated) {
        onUserUpdated();
      }
      setEditable(false);
      setVisible(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Failed to update user.");
    }
  }

  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={function() { setVisible(false); }}
      footer={[
        <div key="footer" className="w-full flex justify-between items-center">
          <Button
            key="addNew"
            type="primary"
            className="!bg-black !border-black !text-white hover:!bg-gray-900"
            onClick={onAddUser}
          >
            + Add New User
          </Button>
          <div>
            <Button key="cancel" onClick={function() { setVisible(false); }}>Cancel</Button>
            {editable ? (
              <Button key="save" type="primary" onClick={handleSave}>Save</Button>
            ) : (
              <Button key="edit" type="primary" onClick={function() { setEditable(true); }}>Edit</Button>
            )}
          </div>
        </div>
      ]}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="font-semibold mr-2">Username:</label>
          {editable ? (
            <Input value={formData.username} onChange={function(e) { handleChange("username", e.target.value); }} />
          ) : (
            <span>{formData.username}</span>
          )}
        </div>

        <div>
          <label className="font-semibold mr-2">Set Code:</label>
          {editable ? (
            <Input value={formData.setCode} onChange={function(e) { handleChange("setCode", e.target.value); }} />
          ) : (
            <span>{formData.setCode || "-"}</span>
          )}
        </div>

        <div>
          <label className="font-semibold mr-2">Countries:</label>
          {editable ? (
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              value={formData.countries}
              placeholder="Select countries"
              onChange={function(values) { handleChange("countries", values); }}
            >
              {countriesList.map(function(c) {
                return <Option key={c.code} value={c.name}>{c.flag} {c.name}</Option>;
              })}
            </Select>
          ) : (
            formData.countries.map(function(c) {
              return <Tag key={c} color="blue">{c}</Tag>;
            })
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserModal;

