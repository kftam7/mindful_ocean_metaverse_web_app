import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, Checkbox, Space, notification, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { InfoCircleOutlined } from '@ant-design/icons';
import { md5 } from "../../../utils/utils";
import './index.css';
import { getEmailtemplate, getUserDetail, editEmailtemplatelookup, addCredential, editCredential } from "../../../services/users";
import { Link } from "react-router-dom"

const { Option } = Select;

const AddModal = (props) => {
    const {language, isModalVisible, userId, userItem, addModalOk, addModalClose} = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [optionsEr, setOptionsEr] = useState([]);
    const [oldPw, setOldPw] = useState('');

    const regUserID = /^(?=.*[a-z])[a-z0-9]{5,20}$/;
    const regPassWord = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    useEffect(() => {
        getEmailtemplate()
        .then(response => response.json())
        .then(response => {
            const data = response.data.map(item => {
                return{
                    value: item.emailTemplateID,
                    label: item.name,
                    email: item.email,
                    subjectBSC: item.subjectBSC,
                    contentBSC: item.contentBSC,
                    subjectPolygon: item.subjectPolygon,
                    contentPolygon: item.contentPolygon,
                }
            });
            setOptionsEr(data);
        })
        .catch(err => {
            console.log(err);
        });

        if(!userId) return;
        // console.log(userItem)
        const emailTemplates = userItem.emailTemplates ? (userItem.emailTemplates.split(',')).map(item => Number(item)) : [];
        form.setFieldsValue({
            userID: userItem.name,
            administrator: userItem.isAdmin,
            active: userItem.isActive,
            emailTemplates
        });

        getUserDetail(userItem.name)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            // form.setFieldsValue({
            //     password: response.credential
            // })
            setOldPw(response.credential);
        })
        .catch(err => {
            console.log(err);
        });
    },[userId]);

    const onChangeAdministrator = (value) => {
        form.setFieldsValue({administrator: value});
    };

    const onChangeActive = (value) => {
        form.setFieldsValue({active: value});
    };

    const editEmailTemplate = (type, userId, emailTemplate) => {
        editEmailtemplatelookup(userId, emailTemplate)
        .then(response => response.json())
        .then(response => {
            // console.log("response", response);
            if (response.message === 'emailTemplateLookup updated successfully') {
                if(type === 'add'){
                    notification["success"]({
                        message: '',
                        description: '创建成功'
                    });
                }
                if(type === 'edit'){
                    notification["success"]({
                        message: '',
                        description: '编辑成功'
                    });
                }
                addModalOk();
                form.resetFields();
            } else {
                notification["warning"]({
                    message: '',
                    description: response.message
                });
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const validatorUserID = async (rule, value, callback) => {
        if (!regUserID.test(value)) {
            return Promise.reject(new Error(`Please enter the correct user ID`));
        }
        return Promise.resolve();
    };

    const validatorPassWord = async (rule, value, callback) => {
        if(!value){
            return Promise.resolve();
        }
        if (!regPassWord.test(value)) {
            return Promise.reject(new Error(`Please enter the correct password`));
        }
        return Promise.resolve();
    };

    const validatorPassWordRep = async (rule, value, callback) => {
        const pw = form.getFieldValue('password');
        if(!value){
            return Promise.resolve();
        }
        if (pw !== value) {
            return Promise.reject(new Error(`The confirmation password is inconsistent`));
        }
        return Promise.resolve();
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        setLoading(true);
        const emailTemplate = values.emailTemplates.map(item => {
            return {
                emailTemplateID: item
            }
        });
        
        let params = {
            name: values.userID,
            // credential: md5(values.password),
            isAdmin: values.administrator,
            isActive:  values.active,
        }
        if (!userId) {
            params.credential = md5(values.password);
            addCredential(params)
            .then(response => response.json())
            .then(response => {
                // console.log("response", response);
                if (response.createdID) {
                    editEmailTemplate('add', response.createdID, emailTemplate);
                } else {
                    notification["warning"]({
                        message: '',
                        description: response.message
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            params.credential = !values.password ? oldPw : md5(values.password);
            editCredential(userId, params)
            .then(response => response.json())
            .then(response => {
                // console.log("response", response);
                if (response.message === 'Credential updated successfully') {
                    editEmailTemplate('edit', userId, emailTemplate);
                } else {
                    notification["warning"]({
                        message: '',
                        description: response.message
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
    };

    const handleCancel = () => {
        addModalClose();
        form.resetFields();
    };

    return (
        <Modal
            title={!userId ? language["users.modal.title.add"] : language["users.modal.title.edit"]}
            visible={isModalVisible}
            cancelText={language["button.cancel"]}
            okText={language["button.ok"]}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
                // disabled: isSubmit,
                loading: loading,
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
            >
                <Form.Item
                    label='User ID'
                    name="userID"
                    rules={[
                        { required: true },
                        {
                          validator: validatorUserID
                        }
                    ]}
                    tooltip={{
                        title: (
                            <span>
                                cannot be all numeric<br/>
                                cannot have special characters<br/>
                                Minimum length of 5 characters<br/>
                                Maximum length of 20 characters<br/>
                                Can be all alphabetic<br/>
                                Can be alphanumeric
                            </span>
                        ),
                        icon: <InfoCircleOutlined />
                    }}
                >
                    <Input placeholder='User ID' disabled={userId ? true : false} />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name="password"
                    rules={!userId ? [
                        { required: true },
                        {
                            validator: validatorPassWord
                        }
                    ] : [
                        {
                            validator: validatorPassWord
                        }
                    ]}
                    tooltip={{
                        title: (
                            <span>
                                Minimum eight characters<br/>
                                At least one uppercase letter<br/>
                                At least one lowercase letter<br/>
                                At least one number
                            </span>
                        ),
                        icon: <InfoCircleOutlined />
                    }}
                >
                    <Input.Password placeholder={!userId ? 'Password' : '********'} />
                </Form.Item>
                {!userId ?
                    <Form.Item
                        label='Retype Password'
                        name="passwordRep"
                        rules={[
                            { required: true },
                            // {
                            //     validator: validatorPassWord
                            // },
                            {
                                validator: validatorPassWordRep
                            },
                        ]}
                    >
                        <Input.Password placeholder='Retype Password' />
                    </Form.Item>
                 : ''}
                <Form.Item
                    label='Administrator'
                    name="administrator"
                    rules={[
                        { required: true },
                    ]}
                >
                    <Select
                        placeholder='Administrator'
                        onChange={onChangeAdministrator}
                    >
                        <Option value="0" key="0">0</Option>
                        <Option value="1" key="1">1</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Active'
                    name="active"
                    rules={[
                        { required: true },
                    ]}
                >
                    <Select
                        placeholder='Active'
                        onChange={onChangeActive}
                    >
                        <Option value="0" key="0">0</Option>
                        <Option value="1" key="1">1</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Email Templates'
                    name="emailTemplates"
                >
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Scrollbars
                            style={{
                                height: '100px'
                            }}
                        >
                        <Space direction="vertical">
                            {optionsEr.map((item, key) => {
                                const tips = (
                                    <span>
                                        email: {item.email}<br/>
                                        subjectBSC: {item.subjectBSC}<br/>
                                        contentBSC: {item.contentBSC}<br/>
                                        subjectPolygon: {item.subjectPolygon}<br/>
                                        contentPolygon: {item.contentPolygon}
                                    </span>
                                )
                                return <div className='checkboxGroup'>
                                    <Checkbox 
                                        key={key}
                                        value={item.value}
                                    >
                                        {/* <Tooltip
                                            placement="top"
                                            title={tips}
                                        >
                                            {item.label}
                                        </Tooltip> */}
                                    </Checkbox>
                                    <span className='checkboxLink'><Link to={'/users/contentDetail/'+item.value} target='_blank'>{item.label}</Link></span>
                                </div>
                            })}
                        </Space>
                    </Scrollbars>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </Modal>
  );
}

export default AddModal;