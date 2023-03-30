import React, { useEffect, useState, } from "react";
import { Form, Input, Table, Select, Row, Col, Button, notification, Space, Modal } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

import { emailAddress } from "../../services/emailAddress";
import { emailTemplate, emailtemplateAdd, emailTemplateUpdate } from "../../services/emailTemplate";
import TextArea from "antd/lib/input/TextArea";
import {urlEncode, urlDecode} from '../../utils/utils';


const EmailTemplatepage = (props) => {

    const language = props.language;

    const [form] = Form.useForm();

    // emailAddress  data
    const [emailList, setEmailList] = useState([]);
    // Table  data
    const [dataSource, setDataSource] = useState([]);
    // Email emailTemplateID
    const [emailTemplateID, setEmailTemplateID] = useState(0);
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

    const regName = /^[a-zA-Z0-9-_=.<>()*&^#@\/]{1,45}$/;
    const regSubject = /^[a-zA-Z0-9-_=.<>()*&^#@\/]{1,100}$/;
    const regContent = /^[a-zA-Z0-9-_=.<>()*&^#@\/]{1,5000}$/;

    const columns = [
        {
            title: 'emailTemplateID',
            dataIndex: 'emailTemplateID',
            key: 'emailTemplateID',
            width: 150,
            sorter: (a, b) => a.emailTemplateID - b.emailTemplateID,
            sortOrder: sortedInfo.columnKey === 'emailTemplateID' ? sortedInfo.order : null,
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            sorter: (a, b) => a['name'].localeCompare(b['name']),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
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
            title: 'subjectBSC',
            dataIndex: 'subjectBSC',
            key: 'subjectBSC',
            width: 150,
            sorter: (a, b) => a['subjectBSC'].localeCompare(b['subjectBSC']),
            sortOrder: sortedInfo.columnKey === 'subjectBSC' ? sortedInfo.order : null,
            render: (_, record) => (
              <Space>
                {record.subjectBSC.length && record.subjectBSC.length >=18 ? record.subjectBSC.substr(0, 18)+'...' : record.subjectBSC}
              </Space>
            ),
        },
        {
            title: 'subjectPolygon',
            dataIndex: 'subjectPolygon',
            key: 'subjectPolygon',
            width: 150,
            sorter: (a, b) => a['subjectPolygon'].localeCompare(b['subjectPolygon']),
            sortOrder: sortedInfo.columnKey === 'subjectPolygon' ? sortedInfo.order : null,
            render: (_, record) => (
              <Space>
                {record.subjectPolygon.length && record.subjectPolygon.length >=18 ? record.subjectPolygon.substr(0, 18)+'...' : record.subjectPolygon}
              </Space>
            ),
        },
        {
            title: 'contentBSC',
            dataIndex: 'contentBSC',
            key: 'contentBSC',
            width: 150,
            sorter: (a, b) => a['contentBSC'].localeCompare(b['contentBSC']),
            sortOrder: sortedInfo.columnKey === 'contentBSC' ? sortedInfo.order : null,
            render: (_, record) => (
              <Space>
                {record.contentBSC.length && record.contentBSC.length >=18 ? urlDecode(record.contentBSC).substr(0, 18)+'...' : urlDecode(record.contentBSC)}
              </Space>
            ),
        },
        {
            title: 'contentPolygon',
            dataIndex: 'contentPolygon',
            key: 'contentPolygon',
            width: 150,
            sorter: (a, b) => a['contentPolygon'].localeCompare(b['contentPolygon']),
            sortOrder: sortedInfo.columnKey === 'contentPolygon' ? sortedInfo.order : null,
            render: (_, record) => (
              <Space>
                {record.contentPolygon.length && record.contentPolygon.length >=18 ? urlDecode(record.contentPolygon).substr(0, 18)+'...' : urlDecode(record.contentPolygon)}
              </Space>
            ),
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
        if (type === 'edit') {
            setModalType("edit");
            setIsModalVisible(true);
            setEmailTemplateID(item.emailTemplateID);
            setIsSubmit(false);
            setCheckResult({
                name: true,
                addressID: true,
                subjectBSC: item.subjectBSC ? true : false,
                contentBSC: item.contentBSC ? true : false,
                subjectPolygon: item.subjectPolygon ? true : false,
                contentPolygon: item.contentPolygon ? true : false,
                isActive: true
            });
           
            let hubAddressID = "";
            emailList.forEach((value) => {
                if (value.email === item.email) {
                    hubAddressID = value.addressID;
                }
            })

            form.setFieldsValue({
                name: item.name ? item.name : '',
                addressID: hubAddressID,
                subjectBSC: item.subjectBSC ? item.subjectBSC : '',
                contentBSC: item.contentBSC ? urlDecode(item.contentBSC) : '',
                subjectPolygon: item.subjectPolygon ? item.subjectPolygon : '',
                contentPolygon: item.contentPolygon ? urlDecode(item.contentPolygon) : '',
                isActive: item.isActive == 0 || item.isActive == 1 ? item.isActive : ''
            });
        }
    };

    useEffect(() => {
        getEmailAddress();
        getEmailTemplate();
    }, []);

    const emailView = emailList.map((item, key) => {
        return <Option value={item.addressID} key={key}>{item.email}</Option>
    });
    
    // 获取 EmailAddress 数据
    const getEmailAddress = () => {
        emailAddress()
        .then(response => response.json())
        .then(response => {
           setEmailList(response.data);
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: language["emailAddress.emailAddress[GET].api.error"],
                description: err.toString()
            });
        })
    };

    // 获取 EmailTemplate Table 数据
    const getEmailTemplate = () => {
        setIsTableLoading(true);
        emailTemplate()
        .then(response => response.json())
        .then(response => {
            setDataSource(response.data);
            setTotal(response.data.length);
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: language["emailTemplate.emailTemplate[GET].api.error"],
                description: err.toString()
            });
        })
        setIsTableLoading(false);
    };

    // 修改 EmailTemplate
    const editEmailTemplate = () => {
        setIsModalLoading(true);
        const dataForm = form.getFieldsValue();
        const params = {
            addressID: dataForm.addressID,
            contentBSC: dataForm.contentBSC ? urlEncode(dataForm.contentBSC) : '',
            contentPolygon: dataForm.contentPolygon ? urlEncode(dataForm.contentPolygon) : '',
            isActive: dataForm.isActive,
            name: dataForm.name,
            subjectBSC: dataForm.subjectBSC ? dataForm.subjectBSC : '',
            subjectPolygon: dataForm.subjectPolygon ? dataForm.subjectPolygon : '',    
        }
        emailTemplateUpdate(emailTemplateID, params)
        .then(response => response.json())
        .then(response => {
            console.log("response", response);
            if (response.message === "emailTemplate updated successfully") {
                handleCancel();
                getEmailTemplate();
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
                message: language["emailTemplate.emailTemplateUpdate[GET].api.error"],
                description: err.toString()
            });
        })
        setIsModalLoading(false);
    };

    // 新增 EmailTemplate
    const addEmailTemplate = () => {
        const dataForm = form.getFieldsValue();
        console.log(dataForm)
        return;
        const params = {
            addressID: dataForm.addressID,
            contentBSC: dataForm.contentBSC ? urlEncode(dataForm.contentBSC) : '',
            contentPolygon: dataForm.contentPolygon ? urlEncode(dataForm.contentPolygon) : '',
            isActive: dataForm.isActive,
            name: dataForm.name,
            subjectBSC: dataForm.subjectBSC ? dataForm.subjectBSC : '',
            subjectPolygon: dataForm.subjectPolygon ? dataForm.subjectPolygon : '',    
        }
        emailtemplateAdd(params)
        .then(response => response.json())
        .then(response => {
            console.log("response", response);
            if (response.message === "Records added susccessfully") {
                handleCancel();
                getEmailTemplate();
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
                message: language["emailTemplate.emailTemplateAdd[GET].api.error"],
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
            editEmailTemplate();
        }
        if (modalType === 'add') {
            addEmailTemplate();
        }
    };

    const handleCancel = () => {
        console.log("handleCancel");
        setIsModalVisible(false);
        setIsSubmit(true);
        setCheckResult({});
        setIsModalLoading(false);
        form.setFieldsValue({
            name: '',
            addressID: '',
            subjectBSC: '',
            contentBSC: '',
            subjectPolygon: '',
            contentPolygon: '',
            isActive: ''
        });
        form.resetFields();
    };

    const handleCheckName = async (rule, value, callback) => {
        if (regName.test(value)) {
            setCheckResult({...checkResult, "name": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "name": false});
        return Promise.reject(new Error(`${language["emailTemplate.form.name.fail"]}`));
    };

    const handleCheckAddressID = async (rule, value, callback) => {
        if (value.toString()) {
            setCheckResult({...checkResult, "addressID": true});
            return Promise.resolve();
        }
        setCheckResult({...checkResult, "addressID": false});
        return Promise.reject(new Error(`${language["emailTemplate.form.addressID.fail"]}`));
    };

    const handleCheckSubjectBSC = async (rule, value, callback) => {
        if(!value.length){
            setCheckResult({...checkResult, "subjectBSC": false});
            return Promise.reject(new Error(`'subjectBSC' is required`));
        }
        if(value.length > 100){
            setCheckResult({...checkResult, "subjectBSC": false});
            return Promise.reject(new Error(`Cannot exceed 100 characters`));
        }
        setCheckResult({...checkResult, "subjectBSC": true});
        return Promise.resolve();
    };

    const handleCheckContentBSC = async (rule, value, callback) => {
        if(!value.length){
            setCheckResult({...checkResult, "contentBSC": false});
            return Promise.reject(new Error(`'contentBSC' is required`));
        }
        if(value.length > 50000){
            setCheckResult({...checkResult, "contentBSC": false});
            return Promise.reject(new Error(`Cannot exceed 50000 characters`));
        }
        setCheckResult({...checkResult, "contentBSC": true});
        return Promise.resolve();
    };

    const handleCheckSubjectPolygon = async (rule, value, callback) => {
        if(!value.length){
            setCheckResult({...checkResult, "subjectPolygon": false});
            return Promise.reject(new Error(`'subjectPolygon' is required`));
        }
        if(value.length > 100){
            setCheckResult({...checkResult, "subjectPolygon": false});
            return Promise.reject(new Error(`Cannot exceed 100 characters`));
        }
        setCheckResult({...checkResult, "subjectPolygon": true});
        return Promise.resolve();
    };
    
    const handleCheckContentPolygon = async (rule, value, callback) => {
        if(!value.length){
            setCheckResult({...checkResult, "contentPolygon": false});
            return Promise.reject(new Error(`'contentPolygon' is required`));
        }
        if(value.length > 50000){
            setCheckResult({...checkResult, "contentPolygon": false});
            return Promise.reject(new Error(`Cannot exceed 50000 characters`));
        }
        setCheckResult({...checkResult, "contentPolygon": true});
        return Promise.resolve();
    };
    
    const handleIsActiveChange = () => {
        setCheckResult({...checkResult, "isActive": true});
    };
    
    const handleAddressIDChange = () => {
        setCheckResult({...checkResult, "addressID": true});
    };

    useEffect(() => {
        if(checkResult.subjectBSC && checkResult.contentBSC){
            form.setFields([{name: 'subjectPolygon', errors: null},{name: 'contentPolygon', errors: null}])
        }
        if(checkResult.subjectPolygon && checkResult.contentPolygon){
            form.setFields([{name: 'subjectBSC', errors: null},{name: 'contentBSC', errors: null}])
        }
    }, [checkResult]);

    useEffect(() => {
        console.log("checkResult", checkResult);
        if (checkResult.name &&
            checkResult.addressID &&
            checkResult.isActive &&
            (
                (checkResult.subjectBSC && checkResult.contentBSC)
                ||
                (checkResult.subjectPolygon && checkResult.contentPolygon)
            )
            ) {
                setIsSubmit(false);
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
    const showTotal = (total) => `${language["emailTemplate.Pagination.Total.records"]} ${total} ${language["emailTemplate.Pagination.Total.items"]}`;

    return (
        <>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <div style={{textAlign: 'center',fontSize: '28px',fontWeight: 'bold'}}>Email Template Management</div>
                </Col>
                <Col span={24}>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {handleAdd()}}>{language["emailTemplate.button.add"]}</Button>
                </Col>
                <Col span={24}>
                    <Table
                        dataSource={dataSource}
                        columns={columns} 
                        rowKey={(record) => record.emailTemplateID}
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
                title={modalType === "add" ? language["emailTemplate.modal.title.add"] : language["emailTemplate.modal.title.edit"]}
                visible={isModalVisible}
                cancelText={language["emailTemplate.Modal.cancelText"]}
                okText={language["emailTemplate.Modal.okText"]}
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
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Form.Item
                        label={language["emailTemplate.form.label.name"]}
                        name="name"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckName
                            }
                        ]}
                    >
                        <Input placeholder={language["emailTemplate.form.label.name"]} />
                    </Form.Item>

                    <Form.Item
                        label={language["emailTemplate.form.label.address"]}
                        name="addressID"
                        rules={[
                            { required: true },
                            {
                              validator: handleCheckAddressID
                            }
                        ]}
                        >
                        <Select
                            placeholder={language["emailTemplate.form.label.address"]}
                            onChange={handleAddressIDChange}
                        >
                            {emailView}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        label={language["emailTemplate.form.label.subjectBSC"]}
                        name="subjectBSC"
                        rules={[
                            { required: true, validator: handleCheckSubjectBSC }
                        ]}
                    >
                        <Input placeholder={language["emailTemplate.form.label.subjectBSC"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailTemplate.form.label.contentBSC"]}
                        name="contentBSC"
                        rules={[
                            { required: true, validator: handleCheckContentBSC }
                        ]}
                    >
                        <TextArea placeholder={language["emailTemplate.form.label.contentBSC"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailTemplate.form.label.subjectPolygon"]}
                        name="subjectPolygon"
                        rules={[
                            { required: true, validator: handleCheckSubjectPolygon }
                        ]}
                    >
                        <Input placeholder={language["emailTemplate.form.label.subjectPolygon"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailTemplate.form.label.contentPolygon"]}
                        name="contentPolygon"
                        rules={[
                            { required: true, validator: handleCheckContentPolygon }
                        ]}
                    >
                        <TextArea placeholder={language["emailTemplate.form.label.contentPolygon"]} />
                    </Form.Item>
                    <Form.Item
                        label={language["emailTemplate.form.label.isActive"]}
                        name="isActive"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Select
                            placeholder={language["emailTemplate.form.label.isActive"]}
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

export default EmailTemplatepage;