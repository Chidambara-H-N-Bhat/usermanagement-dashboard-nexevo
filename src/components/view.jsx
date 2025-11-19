import React, { useState, useEffect } from "react";
import { Button, Tag, Input } from "antd";

const ViewUser = ({ user, onCancel, onSave, onAddUser }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    setCode: user.setCode,
    countries: user.countries,
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      setCode: user.setCode,
      countries: user.countries,
    });
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8 flex flex-col justify-between">
      {/* User details */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>

        <div className="space-y-4">
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
              <Input
                value={formData.countries.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "countries",
                    e.target.value.split(",").map((c) => c.trim())
                  )
                }
              />
            ) : (
              formData.countries.map((c) => (
                <Tag key={c} color="blue">
                  {c}
                </Tag>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-between mt-8 max-w-3xl mx-auto">
        {/* Add New User button on bottom-left */}
        <Button
          type="primary"
          className="!bg-black !border-black !text-white hover:!bg-gray-900"
          onClick={onAddUser}
        >
          + Add New User
        </Button>

        {/* Edit / Save and Cancel buttons on bottom-right */}
        <div className="flex gap-4">
          <Button onClick={onCancel}>Cancel</Button>
          {editable ? (
            <Button
              type="primary"
              className="!bg-black !border-black !text-white hover:!bg-gray-900"
              onClick={() => {
                onSave(formData);
                setEditable(false);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              type="primary"
              className="!bg-black !border-black !text-white hover:!bg-gray-900"
              onClick={() => setEditable(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;




