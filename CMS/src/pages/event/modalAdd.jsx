import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, DatePicker, notification } from 'antd';
import moment from "moment";
import dayjs from 'dayjs';
import './index.css';

import { addEvent, editEvent } from "../../services/event";

const { Option } = Select;
const { TextArea } = Input;

const ModalAdd = (props) => { 
    const {language, visible, modalType, modalData, handleOk, handleCancel} = props;
    const [form] = Form.useForm();
    // Modal ok 按钮 loading
    const [isModalLoading, setIsModalLoading] = useState(false);
    // startTime
    const [startTime, setStartTime] = useState('');
    // startTime
    const [endTime, setEndTime] = useState('');
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';

    useEffect(() => {
        form.setFieldsValue({
            startTime: '',
            endTime: '',
            isActive: '1'
        });
        if(modalType === 'add') return;

        form.setFieldsValue({
            title: modalData.title,
            paragraphText: modalData.paragraphText,
            image: modalData.image,
            hyperlink: modalData.hyperlink,
            timerDescription: modalData.timerDescription,
            startTime: moment(modalData.startTime),
            endTime: moment(modalData.endTime),
            isActive: modalData.isActive
        });
        setStartTime(modalData.startTime);
        setEndTime(modalData.endTime);
            
    },[modalType, modalData])

    // 自定义规则：检查输入字符是否超过最大长度 200
    const validateInputLength1 = (rule, value, callback) => {
        if (value && value.length > 200) {
            callback('alphanumeric max 200 characters');
        } else {
            callback();
        }
    };

    // 自定义规则：检查输入字符是否超过最大长度 500
    const validateInputLength2 = (rule, value, callback) => {
        if (value && value.length > 500) {
            callback('alphanumeric max 500 characters');
        } else {
            callback();
        }
    };

    // 自定义规则：检查输入字符是否超过最大长度 2000
    const validateInputLength3 = (rule, value, callback) => {
        if (value && value.length > 2000) {
            callback('alphanumeric max 2000 characters');
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
        title: [
            { required: true, message: 'Please input title!' },
            { validator: validateInputLength2 }
        ],
        paragraphText: [
            { required: true, message: 'Please input paragraphText!' },
            { validator: validateInputLength3 }
        ],
        image: [
            { required: true, message: 'Please input image!' },
            { validator: validateInputLength1 },
            { validator: validateUrl }
        ],
        hyperlink: [
            { required: true, message: 'Please input hyperlink!' },
            { validator: validateInputLength1 },
            { validator: validateUrl }
        ],
        timerDescription: [
            { required: true, message: 'Please input timerDescription!' },
            { validator: validateInputLength3 }
        ],
        startTime: [{ required: true, message: 'Please select startTime!' }],
        endTime: [{ required: true, message: 'Please select endTime!' }],
        isActive: [{ required: true, message: 'Please select isActive!' }],
    };

    // 选中日期后触发 startTime
    const handleDateChangeStartTime = (date, dateString) => {
        const formattedDate = moment(dateString).format(dateFormat);
        setStartTime(formattedDate)
    };

    // 选中日期后触发 startTime
    const handleDateChangeEndTime = (date, dateString) => {
        const formattedDate = moment(dateString).format(dateFormat);
        setEndTime(formattedDate)
    };

    // 表单通过校验事件
    const onFinish = () => {
        form.validateFields().then((values) => {
            setIsModalLoading(true);
            if(modalType === 'add'){
                const params = [{
                    title: values.title,
                    paragraphText: values.paragraphText,
                    image: values.image,
                    hyperlink: values.hyperlink,
                    timerDescription: values.timerDescription,
                    startTime: startTime,
                    endTime: endTime,
                    isActive: String(values.isActive),
                }];
                addEvent(params)
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
                    title: values.title,
                    paragraphText: values.paragraphText,
                    image: values.image,
                    hyperlink: values.hyperlink,
                    timerDescription: values.timerDescription,
                    startTime: startTime,
                    endTime: endTime,
                    isActive: String(values.isActive),
                };
                editEvent(modalData.eventId, params)
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
            title={modalType === "add" ? 'Add Event' : 'Edit Event'}
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
                    label='title'
                    name="title"
                    rules={formItemRules.title}
                >
                    <Input
                        placeholder='title'
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    label='paragraphText'
                    name="paragraphText"
                    rules={formItemRules.paragraphText}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder='paragraphText'
                    />
                </Form.Item>
                <Form.Item
                    label='image'
                    name="image"
                    rules={formItemRules.image}
                >
                    <Input
                        placeholder='image'
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    label='hyperlink'
                    name="hyperlink"
                    rules={formItemRules.hyperlink}
                >
                    <Input
                        placeholder='hyperlink'
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    label='timerDescription'
                    name="timerDescription"
                    rules={formItemRules.timerDescription}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder='timerDescription'
                    />
                </Form.Item>
                <Form.Item
                    label='startTime'
                    name="startTime"
                    rules={formItemRules.startTime}
                >
                    <DatePicker
                        placeholder='startTime'
                        style={{ width: '100%' }}
                        allowClear
                        showTime
                        format={dateFormat}
                        onChange={handleDateChangeStartTime}
                    />
                </Form.Item>
                <Form.Item
                    label='endTime'
                    name="endTime"
                    format="YYYY-MM-DD HH:mm:ss"
                    rules={formItemRules.endTime}
                >
                    <DatePicker
                        placeholder='endTime'
                        style={{ width: '100%' }}
                        allowClear
                        showTime
                        format={dateFormat}
                        onChange={handleDateChangeEndTime}
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

export default ModalAdd;