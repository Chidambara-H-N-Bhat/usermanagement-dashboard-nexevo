
import React from "react";
import { Table, Tag, Button } from "antd";

const UsersTable = (props) => {
  const users = props.users;
  const onAddUser = props.onAddUser;
  const onViewUser = props.onViewUser;

  const columns = [
    {
      
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      
      title: "Set Code",
      dataIndex: "setCode",
      key: "setCode",
      render: function(text) {
        if (!text) return "-";
        return text;
      },
      sorter: (a, b) => {
        const aVal = a.setCode || "";
        const bVal = b.setCode || "";
        return aVal.localeCompare(bVal);
      },
    },
    {
      
      title: "Countries",
      dataIndex: "countries",
      key: "countries",
      render: function(countries) {
        return countries.map(function(c) {
          return <Tag color="blue" key={c}>{c}</Tag>;
        });
      },
      sorter: (a, b) => {
        const aStr = a.countries.join(", ");
        const bStr = b.countries.join(", ");
        return aStr.localeCompare(bStr);
      },
    },
    {
      title: "Action",
      key: "action",
      render: function(text, record) {
        return <Button onClick={() => onViewUser(record)}>View</Button>;
      },
    },
  ];

  return (
    <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg mt-8 mx-auto">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold">Users & Partners</h2>
        <Button
          onClick={onAddUser}
          type="primary"
          className="!bg-black !border-black !text-white hover:!bg-gray-900"
        >
          + Add New User
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 15 }}
      />
    </div>
  );
};

export default UsersTable;

