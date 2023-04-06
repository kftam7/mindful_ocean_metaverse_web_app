import React, { useEffect, useState } from "react";
import { Form, Input, Modal, notification } from 'antd';
import './index.css';

import { addArtwork, editArtwork } from "../../services/artwork";

const { TextArea } = Input;

const ModalAdd = (props) => { 
    const {language, visible, modalType, modalData, handleOk, handleCancel} = props;
    const [form] = Form.useForm();
    // Modal ok 按钮 loading
    const [isModalLoading, setIsModalLoading] = useState(false);

    useEffect(() => {
        if(modalType === 'add') return;

        form.setFieldsValue({
            name: modalData.name,
            userId: modalData.userId,
            appleId: modalData.appleId,
            URL: modalData.URL,
            description: modalData.description
        });
            
    },[modalType, modalData])

    // 自定义规则：检查输入字符是否超过最大长度 500
    const validateInputLength1 = (rule, value, callback) => {
        if (value && value.length > 500) {
            callback('alphanumeric max 500 characters');
        } else {
            callback();
        }
    };

    // http:// 或者 https://
    const validateUrl = (rule, value, callback) => {
        if (!/^https?:\/\//i.test(value)) {
            callback('The URL must start with http:// or https://');
        } else if (!/(^(http|https):\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(value)) {
            callback('Please enter a valid URL!');
        } else {
            callback();
        }
    };
    
    // 定义验证规则
    const formItemRules = {
        name: [{ required: true, message: 'Please input name!' }],
        userId: [{ required: true, message: 'Please input userId!' }],
        appleId: [{ required: true, message: 'Please input appleId!' }],
        URL: [
            { required: true, message: 'Please input URL!' },
            { validator: validateUrl }
        ],
        description: [
            { required: true, message: 'Please input description!' },
            { validator: validateInputLength1 }
        ]
    };

    // 表单通过校验事件
    const onFinish = () => {
        form.validateFields().then((values) => {
            setIsModalLoading(true);
            if(modalType === 'add'){
                const params = [{
                    name: values.name,
                    userId: values.userId,
                    // appleId: values.appleId,
                    URL: values.URL,
                    description: values.description
                }];
                addArtwork(params)
                .then(response => response.json())
                .then(response => {
                    if(response.artworkId){
                        setIsModalLoading(false);
                        handleOk(); // 将表单的值传递给父组件
                        form.resetFields(); // 重置表单
                        notification["success"]({
                            message: 'Records added susccessfully'
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
            }else{
                const params = {
                    name: values.name,
                    userId: values.userId,
                    // appleId: values.appleId,
                    URL: values.URL,
                    description: values.description
                };
                editArtwork(modalData.artworkId, params)
                .then(response => response.json())
                .then(response => {
                    if(response.message === 'Record updated successfully'){
                        setIsModalLoading(false);
                        handleOk(); // 将表单的值传递给父组件
                        form.resetFields(); // 重置表单
                        notification["success"]({
                            message: response.message
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
            }
        });
    };

    const onCancel = () => {
        handleCancel();
        form.resetFields(); // 重置表单
    };

    return (
        <Modal
            title={modalType === "add" ? 'Add Artwork' : 'Edit Artwork'}
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
                    label='name'
                    name="name"
                    rules={formItemRules.name}
                >
                    <Input
                        placeholder='name'
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    label='userId'
                    name="userId"
                    rules={formItemRules.userId}
                >
                    <Input
                        placeholder='userId'
                        allowClear
                    />
                </Form.Item>
                {modalType === "edit" ?
                    <Form.Item
                        label='appleId'
                        name="appleId"
                        rules={formItemRules.appleId}
                    >
                        <Input
                            placeholder='appleId'
                            allowClear
                            disabled
                        />
                    </Form.Item>
                    : ''
                }
                <Form.Item
                    label='URL'
                    name="URL"
                    rules={formItemRules.URL}
                >
                    <Input
                        placeholder='URL'
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    label='description'
                    name="description"
                    rules={formItemRules.description}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder='description'
                    />
                </Form.Item>
            </Form>
        </Modal>
  );
}

export default ModalAdd;