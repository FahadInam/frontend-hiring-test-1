import React, { useEffect, useState } from "react";
import { Button, Modal, Typography, Input, Space, Form } from "antd";

const { Text, Link } = Typography;
const { TextArea } = Input;

const AddNoteModal = ({
  isModalVisible,
  callData,
  handleCancel,
  handleSave,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleSave(callData?.id, values.note);
  };

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
    }
  }, [isModalVisible, form]);

  return (
    <Modal
      title={
        <div style={{ textAlign: "left" }}>
          <Typography.Title level={4} style={{ marginBottom: "5px" }}>
            Add Notes
          </Typography.Title>
          <div
            style={{
              color: "#564df8",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Call ID: <Text style={{ color: "#564df8" }}>{callData?.id}</Text>
          </div>
          <div
            style={{
              borderBottom: "1px solid #d9d9d9",
              marginBottom: "20px",
            }}
          />
        </div>
      }
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="save"
          type="primary"
          form="addNoteForm"
          htmlType="submit"
          block
        >
          Save
        </Button>,
      ]}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div className="modal-row">
          <Text className="modal-data">Call Type:</Text>
          <Link className="text-capitalize">{callData?.callType}</Link>
        </div>

        <div className="modal-row">
          <Text className="modal-data">Duration:</Text>
          <Text>{callData?.durationInMinutes}</Text>
        </div>

        <div className="modal-row">
          <Text className="modal-data">From:</Text>
          <Text>{callData?.from}</Text>
        </div>

        <div className="modal-row">
          <Text className="modal-data">To:</Text>
          <Text>{callData?.to}</Text>
        </div>

        <div className="modal-row">
          <Text className="modal-data">Via:</Text>
          <Text>{callData?.via}</Text>
        </div>

        <Form form={form} id="addNoteForm" onFinish={onFinish}>
          <Form.Item
            name="note"
            rules={[
              {
                required: true,
                message: "Please enter a note",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Add Notes" />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};

export default AddNoteModal;
