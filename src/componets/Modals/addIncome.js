import React from "react";
import { Button , Modal, Form, Input, DatePicker, Select } from "antd";
function AddExpenseModal({
    isIncomeModalVisible,
    handleIncomeCancel,
    onFinish
}) {
    const [form] = Form.useForm();
    return (
        <Modal
            style={{ fontWeight: 600 }}
            title="Add Income"
            visible={isIncomeModalVisible}
            onCancel={handleIncomeCancel}
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
                            message: "please input the Incomee amount!"
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
                            message: "please select the Income date!"
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
                        <Select.Option value="salary1">Salary1</Select.Option>
                        <Select.Option value="freelance1">Freelance1</Select.Option>
                        <Select.Option value="investment1">Investment1</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className="btn btn-blue" type="primary" htmlType="submit" >Add Income</Button>
                 </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal;