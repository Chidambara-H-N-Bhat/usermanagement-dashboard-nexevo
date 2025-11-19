import React from "react";
import { Table, Tag, Button } from "antd";

const UsersTable = ({ users, onAddUser, onViewUser }) => {
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Set Code", dataIndex: "setCode", key: "setCode", render: (text) => text || "-" },
    {
      title: "Countries",
      dataIndex: "countries",
      key: "countries",
      render: (countries) =>
        countries.map((c) => (
          <Tag color="blue" key={c}>{c}</Tag>
        )),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="default" onClick={() => onViewUser(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Users List</h2>
        
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UsersTable;





