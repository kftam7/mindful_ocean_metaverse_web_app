import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, DatePicker, notification } from 'antd';
import moment from "moment";
import './index.css';

import { addArtwork, editArtwork } from "../../services/artwork";

const { TextArea } = Input;

const ModalAdd = (props) => { 
    const {language, visible, modalType, modalData, handleOk, handleCancel} = props;
    const [form] = Form.useForm();
    // Modal ok 按钮 loading
    const [isModalLoading, setIsModalLoading] = useState(false);
    // createTime
    const [createTime, setCreateTime] = useState('');
    // setUpdateTime
    const [updateTime, setUpdateTime] = useState('');
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';

    useEffect(() => {
        if(modalType === 'add') return;

        form.setFieldsValue({
            artworkId: modalData.artworkId,
            userId: modalData.userId,
            appleId: modalData.appleId,
            eventId: modalData.eventId,
            URL: modalData.URL,
            type: modalData.type,
            artistMessage: modalData.artistMessage,
            extraInfo: modalData.extraInfo,
            mintpassStorage: modalData.mintpassStorage,
            mindfultokenStorage: modalData.mindfultokenStorage,
            ifHomepage: modalData.ifHomepage,
            ifMinted: modalData.ifMinted,
            ifRedeemed: modalData.ifRedeemed,
            authenticScarcity: modalData.authenticScarcity,
            scarcityRank: modalData.scarcityRank,
            clusterId: modalData.clusterId,
            clusterSize: modalData.clusterSize,
            superClusterId: modalData.superClusterId,
            superClusterSize: modalData.superClusterSize,
            isActive: modalData.isActive,
            createTime: moment(modalData.createTime),
            updateTime: moment(modalData.updateTime),
        });
        setCreateTime(modalData.createTime);
        setUpdateTime(modalData.updateTime);
            
    },[modalType, modalData])

    // 自定义规则：检查输入字符是否超过最大长度 5000
    const validateInputLength1 = (rule, value, callback) => {
        if (value && value.length > 5000) {
            callback('alphanumeric max 5000 characters');
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
        }else if (value && value.length > 500) {
            callback('alphanumeric max 500 characters');
        } else {
            callback();
        }
    };
    
    // 定义验证规则
    const formItemRules = {
        artworkId: [{ required: true, message: 'Please input artworkId!' }],
        userId: [{ required: true, message: 'Please input userId!' }],
        appleId: [{ required: true, message: 'Please input appleId!' }],
        eventId: [{ required: true, message: 'Please input eventId!' }],
    };

    // 选中日期后触发 createTime
    const handleDateChangeStartTime = (date, dateString) => {
        const formattedDate = moment(dateString).format(dateFormat);
        setCreateTime(formattedDate)
    };

    // 选中日期后触发 setUpdateTime
    const handleDateChangeEndTime = (date, dateString) => {
        const formattedDate = moment(dateString).format(dateFormat);
        setUpdateTime(formattedDate)
    };

    // 表单通过校验事件
    const onFinish = () => {
        form.validateFields().then((values) => {
            setIsModalLoading(true);
            if(modalType === 'add'){
                const params = [{
                    artworkId: values.artworkId,
                    userId: values.userId,
                    appleId: values.appleId,
                    eventId: values.eventId,
                    URL: values.URL,
                    type: values.type,
                    artistMessage: values.artistMessage,
                    extraInfo: values.extraInfo,
                    mintpassStorage: values.mintpassStorage,
                    mindfultokenStorage: values.mindfultokenStorage,
                    ifHomepage: values.ifHomepage,
                    ifMinted: values.ifMinted,
                    ifRedeemed: values.ifRedeemed,
                    authenticScarcity: values.authenticScarcity,
                    scarcityRank: values.scarcityRank,
                    clusterId: values.clusterId,
                    clusterSize: values.clusterSize,
                    superClusterId: values.superClusterId,
                    superClusterSize: values.superClusterSize,
                    isActive: values.isActive,
                    createTime: createTime,
                    updateTime: updateTime,
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
                    artworkId: values.artworkId,
                    userId: values.userId,
                    appleId: values.appleId,
                    eventId: values.eventId,
                    URL: values.URL,
                    type: values.type,
                    artistMessage: values.artistMessage,
                    extraInfo: values.extraInfo,
                    mintpassStorage: values.mintpassStorage,
                    mindfultokenStorage: values.mindfultokenStorage,
                    ifHomepage: values.ifHomepage,
                    ifMinted: values.ifMinted,
                    ifRedeemed: values.ifRedeemed,
                    authenticScarcity: values.authenticScarcity,
                    scarcityRank: values.scarcityRank,
                    clusterId: values.clusterId,
                    clusterSize: values.clusterSize,
                    superClusterId: values.superClusterId,
                    superClusterSize: values.superClusterSize,
                    isActive: values.isActive,
                    createTime: createTime,
                    updateTime: updateTime,
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
                    label='artworkId'
                    name="artworkId"
                    rules={formItemRules.artworkId}
                >
                    <Input
                        placeholder='artworkId'
                        allowClear
                        disabled={modalType === "edit" ? true : false}
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
                        disabled={modalType === "edit" ? true : false}
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
                    label='eventId'
                    name="eventId"
                    rules={formItemRules.eventId}
                >
                    <Input
                        placeholder='eventId'
                        allowClear
                        disabled
                    />
                </Form.Item>
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
                    label='type'
                    name="type"
                    rules={formItemRules.type}
                >
                <Input
                    placeholder='type'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='artistMessage'
                    name="artistMessage"
                    rules={formItemRules.type}
                >
                <Input
                    placeholder='artistMessage'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='extraInfo'
                    name="extraInfo"
                    rules={formItemRules.extraInfo}
                >
                <Input
                    placeholder='extraInfo'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='mintpassStorage'
                    name="mintpassStorage"
                    rules={formItemRules.mintpassStorage}
                >
                <Input
                    placeholder='mintpassStorage'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='mindfultokenStorage'
                    name="mindfultokenStorage"
                    rules={formItemRules.mindfultokenStorage}
                >
                <Input
                    placeholder='mindfultokenStorage'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='ifHomepage'
                    name="ifHomepage"
                    rules={formItemRules.ifHomepage}
                >
                <Input
                    placeholder='ifHomepage'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='ifMinted'
                    name="ifMinted"
                    rules={formItemRules.ifMinted}
                >
                <Input
                    placeholder='ifMinted'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='ifRedeemed'
                    name="ifRedeemed"
                    rules={formItemRules.ifRedeemed}
                >
                <Input
                    placeholder='ifRedeemed'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='authenticScarcity'
                    name="authenticScarcity"
                    rules={formItemRules.authenticScarcity}
                >
                <Input
                    placeholder='authenticScarcity'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='scarcityRank'
                    name="scarcityRank"
                    rules={formItemRules.scarcityRank}
                >
                <Input
                    placeholder='scarcityRank'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='clusterId'
                    name="clusterId"
                    rules={formItemRules.clusterId}
                >
                <Input
                    placeholder='clusterId'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='clusterSize'
                    name="clusterSize"
                    rules={formItemRules.clusterSize}
                >
                <Input
                    placeholder='clusterSize'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='superClusterId'
                    name="superClusterId"
                    rules={formItemRules.superClusterId}
                >
                <Input
                    placeholder='superClusterId'
                    allowClear
                />
                </Form.Item>
                <Form.Item
                    label='superClusterSize'
                    name="superClusterSize"
                    rules={formItemRules.superClusterSize}
                >
                <Input
                    placeholder='superClusterSize'
                    allowClear
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
                <Form.Item
                    label='createTime'
                    name="createTime"
                    rules={formItemRules.createTime}
                >
                    <DatePicker
                        placeholder='createTime'
                        style={{ width: '100%' }}
                        allowClear
                        showTime
                        format={dateFormat}
                        onChange={handleDateChangeStartTime}
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    label='updateTime'
                    name="updateTime"
                    format="YYYY-MM-DD HH:mm:ss"
                    rules={formItemRules.updateTime}
                >
                    <DatePicker
                        placeholder='updateTime'
                        style={{ width: '100%' }}
                        allowClear
                        showTime
                        format={dateFormat}
                        onChange={handleDateChangeEndTime}
                        disabled
                    />
                </Form.Item>
            </Form>
        </Modal>
  );
}

export default ModalAdd;