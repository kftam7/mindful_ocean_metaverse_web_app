import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, DatePicker, notification } from 'antd';
import moment from "moment";
import dayjs from 'dayjs';
import './index.css';

import { addAppversion, editAppversion } from "../../services/appversion";

const { Option } = Select;
const { TextArea } = Input;

const Appversion = (props) => {
    const {language, visible, modalType, modalData, handleOk, handleCancel} = props;
    const [form] = Form.useForm();
    // Modal ok 按钮 loading
    const [isModalLoading, setIsModalLoading] = useState(false);
    // releaseDate
    const [releaseDate, setReleaseDate] = useState('');
    // releaseDate
    const [expireDate, setExpireDate] = useState('');
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';

    useEffect(() => {
        form.setFieldsValue({
            releaseDate: '',
            expireDate: '',
            isActive: '1'
        });
        if(modalType === 'add') return;

        form.setFieldsValue({
            versionNo: modalData.versionNo,
            versionName: modalData.versionName,
            releaseDate: moment(modalData.releaseDate),
            expireDate: moment(modalData.expireDate),
            description: modalData.description,
            isActive: modalData.isActive
        });
        setReleaseDate(modalData.releaseDate);
        setExpireDate(modalData.expireDate);
            
    },[modalType, modalData])

    // 自定义规则：检查输入字符是否超过最大长度45
    const validateInputLength = (rule, value, callback) => {
        if (value && value.length > 45) {
            callback('alphanumeric max 45 characters');
        } else {
            callback();
        }
    };

    // 自定义规则：检查输入字符是否超过最大长度500
    const validateInputLengthDescription = (rule, value, callback) => {
        if (value && value.length > 500) {
            callback('alphanumeric max 500 characters');
        } else {
            callback();
        }
    };
    
    // 定义验证规则
    const formItemRules = {
        versionNo: [
            { required: true, message: 'Please input versionNo!' },
            { validator: validateInputLength }
        ],
        versionName: [
            { required: true, message: 'Please input versionName!' },
            { validator: validateInputLength }
        ],
        releaseDate: [{ required: true, message: 'Please select releaseDate!' }],
        expireDate: [{ required: true, message: 'Please select expireDate!' }],
        description: [
            { required: true, message: 'Please input description!' },
            { validator: validateInputLengthDescription }
        ],
        isActive: [{ required: true, message: 'Please select isActive!' }],
    };

    // 选中日期后触发 releaseDate
    const handleDateChangeRelease = (date, dateString) => {
        const formattedDate = moment(dateString).format(dateFormat);
        setReleaseDate(formattedDate)
    };

    // 选中日期后触发 releaseDate
    const handleDateChangeExpire = (date, dateString) => {
        const formattedDate = moment(dateString).format(dateFormat);
        setExpireDate(formattedDate)
    };

    // 表单通过校验事件
    const onFinish = () => {
        form.validateFields().then((values) => {
            setIsModalLoading(true);
            if(modalType === 'add'){
                const params = [{
                    versionNo: values.versionNo,
                    versionName: values.versionName,
                    releaseDate: releaseDate,
                    expireDate: expireDate,
                    description: values.description,
                    isActive: String(values.isActive),
                }];
                addAppversion(params)
                .then(response => response.json())
                .then(response => {
                    if(response.message === 'Records added susccessfully'){
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
            }else{
                const params = {
                    versionName: values.versionName,
                    releaseDate: releaseDate,
                    expireDate: expireDate,
                    description: values.description,
                    isActive: String(values.isActive),
                };
                editAppversion(modalData.versionNo, params)
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
            title={modalType === "add" ? 'Add Version' : 'Edit Version'}
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
                    label='versionNo'
                    name="versionNo"
                    rules={formItemRules.versionNo}
                >
                    <Input
                        placeholder='versionNo'
                        allowClear
                        disabled={modalType === "add" ? false : true}
                    />
                </Form.Item>
                <Form.Item
                    label='versionName'
                    name="versionName"
                    rules={formItemRules.versionName}
                >
                    <Input
                        allowClear
                        placeholder='versionName'
                    />
                </Form.Item>
                <Form.Item
                    label='releaseDate'
                    name="releaseDate"
                    rules={formItemRules.releaseDate}
                >
                    <DatePicker
                        placeholder='releaseDate'
                        style={{ width: '100%' }}
                        allowClear
                        showTime
                        format={dateFormat}
                        onChange={handleDateChangeRelease}
                    />
                </Form.Item>
                <Form.Item
                    label='expireDate'
                    name="expireDate"
                    format="YYYY-MM-DD HH:mm:ss"
                    rules={formItemRules.expireDate}
                >
                    <DatePicker
                        placeholder='expireDate'
                        style={{ width: '100%' }}
                        allowClear
                        showTime
                        format={dateFormat}
                        onChange={handleDateChangeExpire}
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
                <Form.Item
                    label='isActive'
                    name="isActive"
                    rules={formItemRules.isActive}
                >
                    <Select
                        allowClear
                        placeholder='isActive'
                    >
                        <Option value="0" key="0">0</Option>
                        <Option value="1" key="1">1</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
  );
}

export default Appversion;