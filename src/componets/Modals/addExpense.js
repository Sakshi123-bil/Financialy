import React from "react";
import { Button , Modal, Form, Input, DatePicker, Select } from "antd";
function AddExpenseModal({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish
}) {
    const [form] = Form.useForm();
    return (
        <Modal
            style={{ fontWeight: 600 }}
            title="Add Income"
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, "income");
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "please input the name of the transaction!"
                        }
                    ]}
                >
                    <Input type="text" className="custom-input"></Input>
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "please input the income amount!"
                        }
                    ]}
                >
                    <Input type="number" className="custom-input"></Input>
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "please select the income date!"
                        }
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" className="custom-input"></DatePicker>
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                            required: true,
                            message: "please select a Tag!"
                        }
                    ]}
                >
                    <Select className="select-input-2">
                        <Select.Option values="salary">Salary</Select.Option>
                        <Select.Option values="freelance">Freelance</Select.Option>
                        <Select.Option values="investment">Investment</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className="btn btn-blue" type="primary" htmlType="submit">Add Expense</Button>
                 </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal;