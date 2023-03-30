import React, { useEffect, useState} from "react";
import { Form, Table, Select, Row, Col, Button, notification, DatePicker, Pagination, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { getIsAdmin, getUserSession } from "../../utils/utils";

import { getTableList, getEmailTemplatesApi } from "../../services/users";
import AddModal from "./addModal";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Userspage = (props) => {

    const isAdmin = getIsAdmin();

    const language = props.language;

    const [form] = Form.useForm();
    // table 原始的 data
    const [dataSource, setDataSource] = useState([]);
    // table 改变之后的 data
    const [dataSourceChanged, setDataSourceChanged] = useState([]);
    // table 原始的 columns
    const [columnsSource, setColumnsSource] = useState([]);
    // table 改变之后的 columns
    const [columnsChanged, setColumnsChanged] = useState([]);
    // table 选中的itmes
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // table pagination current
    const [current, setCurrent] = useState(1);
    // table pagination pageSize
    const [pageSize, setPageSize] = useState(5);
    // table pagination total
    const [total, setTotal] = useState(0);
    // table 排序
    const [sortedInfo, setSortedInfo] = useState({});
    //add modal visible
    const [addModalVisible, setAddModalVisible] = useState(false);
    //add modal id
    const [userId, setUserId] = useState();
    //add modal user item
    const [userItem, setUserItem] = useState();
    //刷新列表数据
    const [refreshCount, setRefreshCount] = useState(0);
    //数据监听加载
    const [count, setCount] = useState(0);
    //数据监听加载最后一项
    const [dataLength, setDataLength] = useState(0);
    //table 加载
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 80,
            sorter: (a, b) => a['userId'].localeCompare(b['userId']),
            sortOrder: sortedInfo.columnKey === 'userId' ? sortedInfo.order : null,
        },
        {
            title: 'Admin',
            dataIndex: 'admin',
            key: 'admin',
            width: 50,
            sorter: (a, b) => a.admin - b.admin,
            sortOrder: sortedInfo.columnKey === 'admin' ? sortedInfo.order : null,
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: 50,
            sorter: (a, b) => a.active - b.active,
            sortOrder: sortedInfo.columnKey === 'active' ? sortedInfo.order : null,
        },
        {
            title: 'Email Templatese',
            dataIndex: 'emailTemplates',
            key: 'emailTemplates',
            width: 80,
            sorter: (a, b) => a['emailTemplates'].localeCompare(b['emailTemplates']),
            sortOrder: sortedInfo.columnKey === 'emailTemplates' ? sortedInfo.order : null,
        },
        {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (_, record) => (
              <Space>
                <Button
                    icon={<EditOutlined />}
                    type="text"
                    style={{backgroundColor: '#14C1EB', color: '#FFFFFF'}}
                    onClick={() => {handleEdit(record)}}
                >
                    Edit
                </Button>
                {/* <Button
                    icon={<DeleteOutlined />}
                    type="danger"
                    onClick={() => {handleDel(record)}}
                >
                    Delete
                </Button> */}
              </Space>
            ),
          },
          
    ];

    useEffect(() => {
        setLoading(true)
        setDataSource([]);
        getTableList()
        .then(response => response.json())
        .then(response => {
            let data = [];
            if(response.data.length){
                setDataLength(response.data.length)
                if (isAdmin == 1) {
                    response.data.forEach(async (item, index) => {
                        const tempKey = index+1;
                        item["id"] = item["credentialID"];
                        item["userId"] = item["name"];
                        item["admin"] = item["isAdmin"];
                        item["active"] = item["isActive"];
                        item["emailTemplates"] = await getEmailTemplatesData(item["credentialID"], tempKey);
                        data.push(item);
                    });
                } else {
                    let hubArray = [];
                    hubArray = response.data.filter((item) => {
                        return item.campaignName === getUserSession();
                    });
                    hubArray.forEach(async item => {
                        item["id"] = item["credentialID"];
                        item["userId"] = item["name"];
                        item["admin"] = item["isAdmin"];
                        item["active"] = item["isActive"];
                        item["emailTemplates"] = await getEmailTemplatesData(item["credentialID"]);
                        data.push(item);
                    });
                }
                setDataSource(data);
            }else{
                setDataSource(data);
                setDataSourceChanged(data);
                setTotal(data.length);
                setColumnsSource(columns);
                setColumnsChanged(columns);
                setLoading(false)
            }
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: '',
                description: err.toString()
            });
        });
    },[refreshCount]);

    useEffect(() => {
        if(!dataSource.length) return
        if(dataLength !== count) return
        const data = dataSource
        //升序排序
        const compareUp = (propertyName) => { 
            if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字  
                return function(object1, object2) {  
                    var value1 = object1[propertyName];  
                    var value2 = object2[propertyName];  
                    return value1.localeCompare(value2);  
                }  
            }  
            else {  // 属性值为数字  
                return function(object1, object2) { 
                    var value1 = object1[propertyName];  
                    var value2 = object2[propertyName];  
                    return value1 - value2;  
                }  
            }  
        };

        const result = data.sort(compareUp("id"));
        // console.log(result);
        setDataSource(result);
        setDataSourceChanged(result);
        setTotal(dataLength);
        setColumnsSource(columns);
        setColumnsChanged(columns);
        setLoading(false)
    },[dataSource, count]);

    const getEmailTemplatesData = (credentialID, tempKey) => {
        return getEmailTemplatesApi(credentialID)
        .then(response => response.json())
        .then(response => {
            setCount(tempKey);
            return response.data.map(item => item.emailTemplateID).join(',');
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: '',
                description: err.toString()
            });
        });
    };

    const handleAdd = () => {
        setUserId('');
        setAddModalVisible(true);
    };

    const handleEdit = (item) => {
        setUserId(item.id);
        setUserItem(item);
        setAddModalVisible(true);
    };

    const handleDel = (item) => {
        console.log(item)
    };
    
    const addModalOk = () => {
        setAddModalVisible(false);
        setRefreshCount(refreshCount+1);
    };

    const addModalClose = () => {
        setAddModalVisible(false);
    };

    const timeFormat = (tiemstamp) => {
        var date = new Date(tiemstamp);
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
        const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        const mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + "-" + M + "-" + D + " " + hh + ":" + mm + ":" + ss;
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRowKeysLength(newSelectedRowKeys.length);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // table pagination onChange 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
    const paginationCurrentChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    // table pagination Total records 所有数据总数
    const showTotal = (total) => `${language["cryptoLog.Pagination.Total.records"]} ${total} ${language["cryptoLog.Pagination.Total.items"]}`;


    // table 排序之后的data, 导出时按照这个顺序
    const tableDataChange = (pagination, filters, sorter, extra) => {
        setDataSourceChanged(extra.currentDataSource);
        setSortedInfo({
            columnKey: sorter.columnKey,
            order: sorter.order
        });

        let hubArray = [];
        columnsChanged.forEach((changedColumnsItem) => {
            columns.forEach((columnsItem) => {
                if (changedColumnsItem.dataIndex === columnsItem.dataIndex) {
                    hubArray.push(columnsItem);
                }
            });
        });
        setColumnsChanged(hubArray);
    };

    return (
        <>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <div style={{textAlign: 'center',fontSize: '28px',fontWeight: 'bold'}}>User Management</div>
                </Col>
                <Col span={24}>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {handleAdd()}}>{language["button.add"]}</Button>
                </Col>
                <Col span={24}>
                    <Table
                        loading={loading}
                        dataSource={dataSourceChanged}
                        columns={columns}
                        rowKey={(record) => record.id}
                        rowClassName={(record) => {
                            return record.isActive == 0 ? "row-disable" : ""
                        }}
                        scroll={{ y: 600 }}
                        onChange={tableDataChange}
                        pagination={{
                            style: {display: "none"},
                            current: current,
                            pageSize: pageSize,
                            total: total,
                            showTotal: showTotal,
                            pageSizeOptions: ["5", "50", "100"],
                            showSizeChanger: true,
                            onChange: paginationCurrentChange
                        }}
                        locale={{
                            cancelSort: language["cryptoLog.Table.locale.cancelSort"],
                            triggerAsc: language["cryptoLog.Table.locale.triggerAsc"],
                            triggerDesc: language["cryptoLog.Table.locale.triggerDesc"]
                        }}
                    />
                
                </Col>
                <Col span={24}>
                    <Row justify="end">
                        <Col>
                            <Pagination
                                current={current}
                                pageSize={pageSize}
                                total={total}
                                showTotal={showTotal}
                                pageSizeOptions={["5", "50", "100"]}
                                showSizeChanger={ true}
                                onChange={ paginationCurrentChange}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <AddModal
                {...props}
                key={addModalVisible}
                isModalVisible={addModalVisible}
                userId={userId}
                userItem={userItem}
                addModalOk={addModalOk}
                addModalClose={addModalClose}
            />
        </>
  );
}

export default Userspage;