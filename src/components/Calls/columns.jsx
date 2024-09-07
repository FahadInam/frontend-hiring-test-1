import React from "react";
import { Button, Tag, Space } from "antd";
import { CALL_STATUSES } from "../../constants/constants";
import { getCallTypeColor } from "./actions";

export const getCallColumns = (handleAddNote, handleStatusClick) => [
  {
    title: "Call Type",
    dataIndex: "callType",
    key: "callType",
    render: (text) => (
      <span
        style={{ color: getCallTypeColor(text), textTransform: "capitalize" }}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Direction",
    dataIndex: "direction",
    key: "direction",
    render: (text) => (
      <span style={{ textTransform: "capitalize", color: "#335be7" }}>
        {text}
      </span>
    ),
  },
  {
    title: "Duration",
    key: "duration",
    render: (text, record) => (
      <Space direction="vertical">
        <span>{record.durationInMinutes}</span>
        <span style={{ color: "blue" }}>{record.durationInSeconds}</span>
      </Space>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Via",
    dataIndex: "via",
    key: "via",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, record) => (
      <Tag
        className={
          status === CALL_STATUSES.ARCHIVED ? "archived-tag" : "default-tag"
        }
        onClick={() => handleStatusClick(record)}
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => (
      <Button
        type="primary"
        className="call-button"
        onClick={() => handleAddNote(record)}
      >
        Add Note
      </Button>
    ),
  },
];
