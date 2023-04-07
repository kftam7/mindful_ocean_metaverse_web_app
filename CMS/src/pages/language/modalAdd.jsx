import React, { useEffect, useState } from "react";
import { Form, Input, Modal, notification } from 'antd';
import './index.css';

import { arrayToJson, hasDuplicateVariable } from "../../utils/utils";

import { editlanguage } from "../../services/language";

const ModalAdd = (props) => { 
    const {language, visible, modalType, modalAllData, modalData, languageTab, handleOk, handleCancel} = props;
    const [form] = Form.useForm();
    // Modal ok 按钮 loading
    const [isModalLoading, setIsModalLoading] = useState(false);

    useEffect(() => {
        if(modalType === 'add') return;

        form.setFieldsValue({
            variable: modalData.variable,
            content: modalData.content
        });
            
    },[modalType, modalData]);
    
    // 定义验证规则
    const formItemRules = {
        variable: [{ required: true, message: 'Please input variable!' }],
        content: [{ required: true, message: 'Please input content!' }]
    };

    // 表单通过校验事件
    const onFinish = () => {
        form.validateFields().then((values) => {
            setIsModalLoading(true);
            let arr = [];
            if(modalType === 'add'){
                const isHas = hasDuplicateVariable(values.variable, modalAllData);
                if(isHas){
                    setIsModalLoading(false);
                    return notification["error"]({
                        message: 'Variable duplicate'
                    });
                }
                arr = [...[values], ...modalAllData]
            }else{
                // 替换数组中对应的content
                const replaceVariableContent = (variable, content, arr) => {
                    for (let i = 0; i < arr.length; i++) {
                    const obj = arr[i];
                    if (obj.variable === variable) {
                        obj.content = content;
                    }
                    }
                    return arr;
                }
                arr = replaceVariableContent(values.variable, values.content, modalAllData)
            }
            const params = arrayToJson(arr);
            editlanguage(languageTab, params)
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    setIsModalLoading(false);
                    handleOk(); // 将表单的值传递给父组件
                    form.resetFields(); // 重置表单
                    notification["success"]({
                        message: 'Record updated successfully'
                    });
                }else{
                    setIsModalLoading(false);
                    notification["error"]({
                        message: response.message
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
        });
    };

    const onCancel = () => {
        handleCancel();
        form.resetFields(); // 重置表单
    };

    return (
        <Modal
            title={modalType === "add" ? 'Add Variable' : 'Edit Variable'}
            visible={visible}
            cancelText={language["button.cancel"]}
            okText={language["button.ok"]}
            onOk={onFinish}
            onCancel={onCancel}
            okButtonProps={{
                loading: isModalLoading,
            }}
            forceRender={true}
            destroyOnClose={false}
            getContainer={false}
        >
            <Form
                form={form}
                className="login-ant-form"
                name="basic"
                layout="vertical"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    isActive: '1'
                }}
            >
                <Form.Item
                    label='variable'
                    name="variable"
                    rules={formItemRules.variable}
                >
                    <Input
                        placeholder='variable'
                        allowClear
                        disabled={modalType === "edit" ? true : false}
                    />
                </Form.Item>
                <Form.Item
                    label='content'
                    name="content"
                    rules={formItemRules.content}
                >
                    <Input
                        placeholder='content'
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
  );
}

export default ModalAdd;