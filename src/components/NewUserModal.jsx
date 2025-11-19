import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, message } from "antd";
import axios from "axios";

const { Option } = Select;

const countries = [
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
];

const NewUserModal = (props) => {
  const [username, setUsername] = useState("");
  const [setCode, setSetCode] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    if (!props.visible) {
      setUsername("");
      setSetCode("");
      setSelectedCountries([]);
    }
  }, [props.visible]);

  const handleSave = () => {
    if (!username || selectedCountries.length === 0) {
      message.error("Please enter username and select countries!");
      return;
    }

    const data = {
      username,
      setCode,
      countries: selectedCountries,
    };

    axios
      .post("http://localhost:5000/users", data)
      .then((res) => {
        message.success("User added!");
        props.onUserSaved(res.data);
      })
      .catch((err) => {
        console.log("Error saving user", err);
        message.error("Failed to save user");
      });
  };

  return (
    <Modal
      title="Add New User"
      open={props.visible}
      onCancel={() => props.setVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => props.setVisible(false)}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <div className="flex flex-col">
        {/* Username field */}
        <div className="mb-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Set Code field */}
        <div className="mb-4">
          <Input
            placeholder="Set Code (optional)"
            value={setCode}
            onChange={(e) => setSetCode(e.target.value)}
          />
        </div>

        {/* Countries field */}
        <div className="mb-4">
          <Select
            mode="multiple"
            placeholder="Select countries"
            value={selectedCountries}
            onChange={(values) => setSelectedCountries(values)}
            className="w-full"
          >
            {countries.map((c) => (
              <Option key={c.code} value={c.name}>
                {c.flag} {c.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default NewUserModal;
