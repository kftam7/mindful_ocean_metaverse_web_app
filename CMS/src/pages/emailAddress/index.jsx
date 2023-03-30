import React, { useEffect, useState, } from "react";
import { Form, Input, Table, Select, Row, Col, Button, notification, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

import { emailAddress, emailAddressUpdate, emailAddressAdd } from "../../services/emailAddress";

const EmailAddresspage = (props) => {

    const language = props.language;

    const [form] = Form.useForm();
    // Table  data
    const [dataSource, setDataSource] = useState([]);
    // Email Address ID
    const [addressID, setAddressID] = useState(0);
    // Modal 显隐
    const [modalType, setModalType] = useState("add");
    // Modal 显隐
    const [isModalVisible, setIsModalVisible] = useState(false);
    // isSubmit Form 校验通过 可以提交
    const [isSubmit, setIsSubmit] = useState(true);
    // Modal ok 按钮 loading
    const [isModalLoading, setIsModalLoading] = useState(false);
    // table loading
    const [isTableLoading, setIsTableLoading] = useState(false);
    // Form 校验 结果
    const [checkResult, setCheckResult] = useState({});
     // table pagination current
     const [current, setCurrent] = useState(1);
     // table pagination pageSize
     const [pageSize, setPageSize] = useState(5);
     // table pagination total
     const [total, setTotal] = useState(0);
     // table 排序
     const [sortedInfo, setSortedInfo] = useState({});

    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regClient = /^[a-zA-Z0-9-_=.\/]{1,100}$/;
    const regURI = /^https:\/\/[a-zA-Z0-9-_=.\/]{1,100}$/;

    const columns = [
        {
            title: 'No',
            dataIndex: 'addressID',
            key: 'addressID',
            width: 50,
            sorter: (a, b) => a.addressID - b.addressID,
            sortOrder: sortedInfo.columnKey === 'addressID' ? sortedInfo.order : null,
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            sorter: (a, b) => a['email'].localeCompare(b['email']),
            sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
        },
        {
            title: 'clientID',
            dataIndex: 'clientID',
            key: 'clientID',
            width: 150,
            sorter: (a, b) => a['clientID'].localeCompare(b['clientID']),
            sortOrder: sortedInfo.columnKey === 'clientID' ? sortedInfo.order : null,
        },
        {
            title: 'clientSecret',
            dataIndex: 'clientSecret',
            key: 'clientSecret',
            width: 150,
            sorter: (a, b) => a['clientSecret'].localeCompare(b['clientSecret']),
            sortOrder: sortedInfo.columnKey === 'clientSecret' ? sortedInfo.order : null,
        },
        {
            title: 'redirectURI',
            dataIndex: 'redirectURI',
            key: 'redirectURI',
            width: 150,
            sorter: (a, b) => a['redirectURI'].localeCompare(b['redirectURI']),
            sortOrder: sortedInfo.columnKey === 'redirectURI' ? sortedInfo.order : null,
        },
        {
            title: 'refreshToken',
            dataIndex: 'refreshToken',
            key: 'refreshToken',
            width: 150,
            sorter: (a, b) => a['refreshToken'].localeCompare(b['refreshToken']),
            sortOrder: sortedInfo.columnKey === 'refreshToken' ? sortedInfo.order : null,
        },
        {
            title: 'isActive',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 100,
            sorter: (a, b) => a.isActive - b.isActive,
            sortOrder: sortedInfo.columnKey === 'isActive' ? sortedInfo.order : null,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space>
                <Button
                    icon={<EditOutlined />}
                    type="text"
                    style={{backgroundColor: '#14C1EB', color: '#FFFFFF'}}
                    onClick={() => {handleAction('edit', record)}}
                >
                    Edit
                </Button>
                {/* <Button
                    icon={<DeleteOutlined />}
                    type="danger"
                    onClick={() => {handleAction('delete', record)}}
                >
                    Delete
                </Button> */}
              </Space>
            ),
            width: 80,
          },
    ];

    // Table Action 
    const handleAction = (type, item) => {
        console.log(type);
        console.log(item);
        if (type === 'edit') {
            setModalType("edit");
            setIsModalVisible(true);
            setAddressID(item.addressID);
            setIsSubmit(false);
            setCheckResult({
                clientID: true,
                clientSecret: true,
                email: true,
                isActive: true,
                redirectURI: true,
                refreshToken: true
            });
           
            form.setFieldsValue({
                email: item.email ? item.email : '',
                clientID: item.clientID ? item.clientID : '',
                clientSecret: item.clientSecret ? item.clientSecret : '',
                redirectURI: item.redirectURI ? item.redirectURI : '',
                refreshToken: item.refreshToken ? item.refreshToken : '',
                isActive: item.isActive == 0 || item.isActive == 1 ? item.isActive : ''
            });
        }
    };

    useEffect(() => {
        getEmailAddress();
    }, []);

    // 获取 EmailAddress Table 数据
    const getEmailAddress = () => {
        setIsTableLoading(true);
        emailAddress()
        .then(response => response.json())
        .then(response => {
            setDataSource(response.data);
            setTotal(response.data.length);
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: language["emailAddress.emailAddress[GET].api.error"],
                description: err.toString()
            });
        })
        setIsTableLoading(false);
    };

    // 修改 EmailAddress
    const editEmailAddress = () => {
        setIsModalLoading(true);
        emailAddressUpdate(addressID, form.getFieldsValue())
        .then(response => response.json())
        .then(response => {
            console.log("response", response);
            if (response.message === "emailAddress updated successfully") {
                handleCancel();
                getEmailAddress();
            } else {
                notification["warning"]({
                    message: "",
                    description: response.message
                });
            }
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: language["emailAddress.emailAddressUpdate[GET].api.error"],
                description: err.toString()
            });
        })
        setIsModalLoading(false);
    };

    // 新增 EmailAddress
    const addEmailAddress = () => {
        emailAddressAdd(form.getFieldsValue())
        .then(response => response.json())
        .then(response => {
            console.log("response", response);
            if (response.message === "Records added susccessfully") {
                handleCancel();
                getEmailAddress();
            } else {
                notification["warning"]({
                    message: "",
                    description: response.message
                });
            }
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: language["emailAddress.emailAddressAdd[GET].api.error"],
                description: err.toString()
            });
        })
    };

    const handleAdd = () => {
        setModalType("add");
        form.setFieldsValue({
            isActive: 1
        });
        setCheckResult({...checkResult, "isActive": true});
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log("handleOk");
        if (modalType === 'edit') {
            editEmailAddress();
        }
        if (modalType === 'add') {
            addEmailAddress();
        }
    };

    const handleCancel = () => {
        console.log("handleCancel");
        setIsModalVisible(false);
        setIsSubmit(true);
        setCheckResult({});
        setIsModalLoading(false);
        form.setFieldsValue({
            email: '',
            clientID: '',
            clientSecret: '',
            redirectURI: '',
            refreshToken: '',
            isActive: ''
        });
    };

    // 表单未通过校验事件
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 表单通过校验事件
    const onFinish = (values) => {
        console.log("values", values);
    };

    const handleCheckEmail = async (rule, value, callback) => {
        if (regEmail.test(value)) {
            setCheckResult({...checkResult, "email": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "email": false});
        return Promise.reject(new Error(`${language["emailAddress.form.email.fail"]}`));
    };

    const handleCheckClientID = async (rule, value, callback) => {
        if (regClient.test(value)) {
            setCheckResult({...checkResult, "clientID": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "clientID": false});
        return Promise.reject(new Error(`${language["emailAddress.form.clientID.fail"]}`));
    };

    const handleCheckClientSecret = async (rule, value, callback) => {
        if (regClient.test(value)) {
            setCheckResult({...checkResult, "clientSecret": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "clientSecret": false});
        return Promise.reject(new Error(`${language["emailAddress.form.clientSecret.fail"]}`));
    };
    
    const handleCheckRedirectURI = async (rule, value, callback) => {
        if (regURI.test(value)) {
            setCheckResult({...checkResult, "redirectURI": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "redirectURI": false});
        return Promise.reject(new Error(`${language["emailAddress.form.redirectURI.fail"]}`));
    };
    
    const handleCheckRefreshToken = async (rule, value, callback) => {
        if (regClient.test(value)) {
            setCheckResult({...checkResult, "refreshToken": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "refreshToken": false});
        return Promise.reject(new Error(`${language["emailAddress.form.refreshToken.fail"]}`));
    };
    
    const handleIsActiveChange = () => {
        setCheckResult({...checkResult, "isActive": true});
    };

    useEffect(() => {
        if (Object.keys(checkResult).length === 6) {
            if (Object.values(checkResult).findIndex(item => item === false) === -1) {
                // 全都是 true
                setIsSubmit(false);
            } else {
                setIsSubmit(true);
            }
        } else {
            setIsSubmit(true);
        }
    }, [checkResult]);
    
    // table pagination onChange 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
    const paginationCurrentChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    // table change
    const tableDataChange = (pagination, filters, sorter, extra) => {
        setSortedInfo({
            columnKey: sorter.columnKey,
            order: sorter.order
        });
    };

    // table pagination Total records 所有数据总数
    const showTotal = (total) => `${language["emailAddress.Pagination.Total.records"]} ${total} ${language["emailAddress.Pagination.Total.items"]}`;

    return (
        <>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <div style={{textAlign: 'center',fontSize: '28px',fontWeight: 'bold'}}>Email Address Management</div>
                </Col>
                <Col span={24}>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {handleAdd()}}>{language["emailAddress.button.add"]}</Button>
                </Col>
                <Col span={24}>
                    <Table
                        dataSource={dataSource}
                        columns={columns} 
                        rowKey={(record) => record.addressID}
                        scroll={{ x: 1300, y: 600 }}
                        loading={isTableLoading}
                        rowClassName={(record) => {
                            return record.isActive == 0 ? "row-disable" : ""
                        }}
                        onChange={tableDataChange}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            total: total,
                            showTotal: showTotal,
                            pageSizeOptions: ["5", "50", "100"],
                            showSizeChanger: true,
                            onChange: paginationCurrentChange
                        }}
                    />
                </Col>
            </Row>
            <Modal
                title={modalType === "add" ? language["emailAddress.modal.title.add"] : language["emailAddress.modal.title.edit"]}
                visible={isModalVisible}
                cancelText={language["emailAddress.Modal.cancelText"]}
                okText={language["emailAddress.Modal.okText"]}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: isSubmit,
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Form.Item
                        label={language["emailAddress.form.label.email"]}
                        name="email"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckEmail
                            }
                        ]}
                    >
                        <Input placeholder={language["emailAddress.form.label.email"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailAddress.form.label.clientID"]}
                        name="clientID"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckClientID
                            }
                        ]}
                    >
                        <Input placeholder={language["emailAddress.form.label.clientID"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailAddress.form.label.clientSecret"]}
                        name="clientSecret"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckClientSecret
                            }
                        ]}
                    >
                        <Input placeholder={language["emailAddress.form.label.clientSecret"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailAddress.form.label.redirectURI"]}
                        name="redirectURI"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckRedirectURI
                            }
                        ]}
                    >
                        <Input placeholder={language["emailAddress.form.label.refreshToken"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailAddress.form.label.refreshToken"]}
                        name="refreshToken"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckRefreshToken
                            }
                        ]}
                    >
                        <Input placeholder={language["emailAddress.form.label.refreshToken"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailAddress.form.label.isActive"]}
                        name="isActive"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Select
                            placeholder={language["emailAddress.form.label.isActive"]}
                            onChange={handleIsActiveChange}
                        >
                            <Option value="0" key="0">0</Option>
                            <Option value="1" key="1">1</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
  );
}

export default EmailAddresspage;