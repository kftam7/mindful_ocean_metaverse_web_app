import React, { useEffect, useState, } from "react";
import { Form, Input, Table, Select, Row, Col, Button, notification, DatePicker, Pagination } from 'antd';
import { DownOutlined, UpOutlined, } from '@ant-design/icons';
import './index.css';

import { getIsAdmin, getUserSession } from "../../utils/utils";

import { airdropcampaign } from "../../services/airdropcampaign";

const { Option } = Select;
const { RangePicker } = DatePicker;

const CampaignListpage = (props) => {

    const isAdmin = getIsAdmin();

    const language = props.language;

    const [form] = Form.useForm();
    // 控制select 显示或者隐藏
    const [isShowSelect, setIsShowSelect] = useState(false);
    // 控制form 显示或者隐藏
    const [isShowForm, setIsShowForm] = useState(false);
    // select value 绑定selectValue变量，为重置操作时，select也重置默认值
    const [selectValue, setSelectValue] = useState([]);
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
    // table 选中的itmes
    const [selectedRowKeysLength, setSelectedRowKeysLength] = useState(0);
    // 正在导出操作
    const [isExporting, setIsExporting] = useState(false);
    // table pagination current
    const [current, setCurrent] = useState(1);
    // table pagination pageSize
    const [pageSize, setPageSize] = useState(5);
    // table pagination total
    const [total, setTotal] = useState(0);
    // table campaignID 默认降序
    const [sortedInfo, setSortedInfo] = useState({});

    const columns = [
        {
            title: 'campaignID',
            dataIndex: 'campaignID',
            key: 'campaignID',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a["campaignID"] - b["campaignID"],
            sortOrder: sortedInfo.columnKey === 'campaignID' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return text;
                } else {
                    return "-";
                }
            }
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => {
                if (a['name']) {
                    return a['name'].localeCompare(b['name']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return text;
                } else {
                    return "-";
                }
            }
        },
        {
            title: 'startTime',
            dataIndex: 'startTime',
            key: 'startTime',
            sorter: (a, b) =>  new Date(a['startTime']).getTime() - new Date(b['startTime']).getTime(),
            sortOrder: sortedInfo.columnKey === 'startTime' ? sortedInfo.order : null,
            ellipsis: true,
            width: 200,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return text;
                } else {
                    return "-";
                }
            }
        },
        {
            title: 'endTime',
            dataIndex: 'endTime',
            key: 'endTime',
            sorter: (a, b) =>  new Date(a['endTime']).getTime() - new Date(b['endTime']).getTime(),
            sortOrder: sortedInfo.columnKey === 'endTime' ? sortedInfo.order : null,
            ellipsis: true,
            width: 200,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return text;
                } else {
                    return "-";
                }
            }
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => {
                if (a['description']) {
                    return a['description'].localeCompare(b['description']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'description' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return text;
                } else {
                    return "-";
                }
            }
        },
        {
            title: 'whitelist',
            dataIndex: 'whitelist',
            key: 'whitelist',
            sorter: (a, b) => {
                if (a['whitelist']) {
                    return a['whitelist'].localeCompare(b['whitelist']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'whitelist' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return <a href={text} target='_blank'>{text}</a>;
                } else {
                    return "-";
                }
            }
        },
        {
            title: 'merkleTree',
            dataIndex: 'merkleTree',
            key: 'merkleTree',
            sorter: (a, b) => {
                if (a['merkleTree']) {
                    return a['merkleTree'].localeCompare(b['merkleTree']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'merkleTree' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150,
            render: (text, record, index) => {
                if (String(text) !== 'null' && String(text).length > 0) {
                    return text;
                } else {
                    return "-";
                }
            }
        },
    ];


    const selectChildren = columns.map((item, key) => {
        return <Option value={item.title} key={key}>{item.title}</Option>
    });

    const selectDefaultValue = [
        'campaignID',
        'name',
        'startTime',
        'endTime',
        'description',
        'whitelist',
        'merkleTree',
    ];

    useEffect(() => {
        airdropcampaign()
        .then(response => response.json())
        .then(response => {
            let data = [];
            if (isAdmin == 1) {
                response.data.forEach((item, key) => {
                    data.push({
                        id: key+1,
                        campaignID: String(item["campaignID"]),
                        name: item["campaignName"],
                        startTime: item["startTime"] ? timeFormat(new Date(item["startTime"]).getTime()) : '-',
                        endTime: item["endTime"] ? timeFormat(new Date(item["endTime"]).getTime()) : '-',
                        whitelist: item["whitelistURL"],
                        merkleTree: item["merkleRoot"]
                    });
                });
            } else {
                let hubArray = [];
                hubArray = response.data.filter((item) => {
                    return item.name === getUserSession();
                });
                hubArray.forEach((item) => {
                    data.push({
                        id: key+1,
                        campaignID: String(item["campaignID"]),
                        name: item["campaignName"],
                        startTime: item["startTime"] ? timeFormat(new Date(item["startTime"]).getTime()) : '-',
                        endTime: item["endTime"] ? timeFormat(new Date(item["endTime"]).getTime()) : '-',
                        whitelist: item["whitelistURL"],
                        merkleTree: item["merkleRoot"]
                    });
                });
            }
            setSelectValue(selectDefaultValue);
            setDataSource(data);
            setDataSourceChanged(data);
            setTotal(data.length);
            setColumnsSource(columns);
            setColumnsChanged(columns);
        })
        .catch(err => {
            console.log(err);
            notification["error"]({
                message: language["cryptoLog.crypto[GET].api.error"],
                description: err.toString()
            });
        })
    },[]);

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

    // select 数据改变
    const handleSelectChange = (value) => {
        // 中转用到的数组
        const changedArray = [];
        // value参数返回的是已经选择的itmes，拼接成的字符串
        // 将选中的所有items拼接成字符串转换成数组
        const selectValueArray = value.toString().split(',');
        setSelectValue(selectValueArray);
        selectValueArray.forEach((itemEach) => {
            columnsSource.filter((itemFilter) => {
                return itemFilter.key === itemEach;
            });
        });
        columnsSource.forEach((itemColumn) => {
            selectValueArray.forEach((itemSelectValue) => {
                if (itemColumn.key === itemSelectValue) {
                    changedArray.push(itemColumn);
                }
            });
        });
        setColumnsChanged(changedArray);
    };

    // 导出按钮点击事件
    const handleExport = () => {
        if (selectedRowKeys.length < 1) {
           // 没有选择 导出全部
           jsonToExcelConvertor(columnsChanged, dataSourceChanged, "campaignList");
        } else {
            if (!isExporting) {
                const selectedRowArray = [];
                setIsExporting(true);
                dataSourceChanged.forEach((itemData) => {
                    selectedRowKeys.forEach((itemSelected) => {
                        if (itemData.id === itemSelected) {
                            selectedRowArray.push(itemData);
                        }
                    });
                });
                jsonToExcelConvertor(columnsChanged, selectedRowArray, "status");
            } else {
                notification["error"]({
                    message: language["notification.error.message"],
                    description: language["cryptoLog.handleExport.function.repeat.export"]
                });
            }
        }
    };

    const jsonToExcelConvertor = (exportTitle, exportData, fileName) => {
        let row = "",
            titleCsv = "",
            csvData = "";
        for (const item of exportTitle) {
            row += '"' + item.title + '",';
        }
        titleCsv += row;
        csvData += row + "\r\n"; // 添加换行符号
        for (const item of exportData ) {
            row = "";
            for (let key in item) {
                if (titleCsv.indexOf(key) !== -1) {
                    row += '"' + item[key] + '"|';
                }
            }
            row = row.slice(0,-1);
            csvData += row + "\r\n"; // 添加换行符号
        }
            
        if (csvData === '') {
            notification["error"]({
                message: language["notification.error.message"],
                description: language["cryptoLog.jsonToExcelConvertor.function.Data.cannot.be.null"]
            });
            return;
        }

        // =========================去掉【"】符号=====================================
        csvData = csvData.replace(/\"/g, '') + "";
        
        var uri = new Blob(['\ufeff' + csvData], {type:"text/csv"});
        
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
            window.navigator.msSaveOrOpenBlob(csvData, fileName + ".csv");
        } else { // for Non-IE（chrome、firefox etc.）
            var link = document.createElement("a");
            link.href = URL.createObjectURL(uri);
        
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setIsExporting(false);
        setSelectedRowKeys([]);
        setSelectedRowKeysLength(0);
    }

    // 搜索
    const handleSearch = () => {
        const undefinedItemArray = [];
        const changedDataArray = [];
        const formValuesObj = form.getFieldsValue();
        delete formValuesObj.tokenNoCompare;
        setTotal(0);
        setDataSourceChanged([]);
        for (const key in formValuesObj) {
            if (formValuesObj[key] !== undefined && formValuesObj[key] !== "") {
                if (changedDataArray.length > 0) {
                    changedDataArray.forEach((item) => {
                        if (key === "campaignID" ||
                            key === "name" ||
                            key === "startTime" ||
                            key === "description" ||
                            key === "whitelist" ||
                            key === "merkleTree"
                        ) {
                            if (item[key].indexOf(formValuesObj[key]) !== -1) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === "startTime") {
                            if (new Date(item[key]).getTime() >= new Date(formValuesObj[key][0]).getTime() &&
                            new Date(item[key]).getTime() <= new Date(formValuesObj[key][1]).getTime()) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === "endTime") {
                            if (new Date(item[key]).getTime() >= new Date(formValuesObj[key][0]).getTime() &&
                            new Date(item[key]).getTime() <= new Date(formValuesObj[key][1]).getTime()) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                    });
                } else {
                    dataSource.forEach((item) => {
                        if (key === "campaignID" ||
                            key === "name" ||
                            key === "description" ||
                            key === "whitelist" ||
                            key === "merkleTree"
                        ) {
                            if (item[key].indexOf(formValuesObj[key]) !== -1) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === "startTime") {
                            if (new Date(item[key]).getTime() >= new Date(formValuesObj[key][0]).getTime() &&
                            new Date(item[key]).getTime() <= new Date(formValuesObj[key][1]).getTime()) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === "endTime") {
                            if (new Date(item[key]).getTime() >= new Date(formValuesObj[key][0]).getTime() &&
                            new Date(item[key]).getTime() <= new Date(formValuesObj[key][1]).getTime()) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                    });
                    if (changedDataArray.length < 1) return;
                }
            } else {
                undefinedItemArray.push(key);
            }
        }
        if (Object.getOwnPropertyNames(formValuesObj).length === undefinedItemArray.length) {
            setCurrent(1);
            setTotal(dataSource.length);
            setDataSourceChanged(dataSource);
        } else {
            const changedDataResultArray = changedDataArray.filter(item => {
                if (item) return item.used;
            });
            setCurrent(1);
            setTotal(changedDataResultArray.length);
            setDataSourceChanged(changedDataResultArray);
        }
        
    };

    // 重置
    const handleReset = () => {
        form.resetFields();
        setCurrent(1);
        setTotal(dataSource.length);
        setDataSourceChanged(dataSource);
        setColumnsChanged(columnsSource);
        setSelectValue(selectDefaultValue);
    };

    // table pagination onChange 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
    const paginationCurrentChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    // table pagination Total records 所有数据总数
    const showTotal = (total) => `${language["cryptoLog.Pagination.Total.records"]} ${total} ${language["cryptoLog.Pagination.Total.items"]}`;

    // icon 控制select显示或隐藏事件
    const handleIsShowSelect = (value) => {
        setIsShowSelect(value);
    };

    // icon 控制form显示或隐藏事件
    const handleIsShowForm = (value) => {
        setIsShowForm(value);
    };

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
                    if(sorter.columnKey == columnsItem.dataIndex){
                        hubArray.push({
                            ...columnsItem,
                            sortOrder: sorter.order
                        });
                    }else{
                        hubArray.push(columnsItem);
                    }
                }
            });
        });
        setColumnsChanged(hubArray);
    };

    return (
        <>
            <Row gutter={[16, 32]}>
                <Col span={24} className="cryptoLog-outterBox">
                    <Row justify="space-between">
                        <Col>{language["cryptoLog.col.content.SelectColumns"]}</Col>
                        <Col>
                            {
                                isShowSelect ? <UpOutlined onClick={() => {handleIsShowSelect(false)}}  /> : <DownOutlined onClick={() => {handleIsShowSelect(true)}}  />
                            }
                        </Col>
                    </Row>
                    {
                        isShowSelect ?
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                                marginTop: 10,
                            }}
                            placeholder="Please select"
                            defaultValue={selectDefaultValue}
                            value={selectValue}
                            onChange={handleSelectChange}
                            >
                            {selectChildren}
                        </Select>
                        : ""
                    }
                </Col>
                <Col span={24} className="cryptoLog-outterBox">
                    <Row justify="space-between">
                        <Col>{language["cryptoLog.col.content.SearchCriteria"]}</Col>
                        <Col>
                            {
                                isShowForm ? <UpOutlined onClick={() => {handleIsShowForm(false)}} /> : <DownOutlined onClick={() => {handleIsShowForm(true)}} />
                            }
                        </Col>
                    </Row>
                    {
                        isShowForm ?
                        <Form
                            style={{
                                marginTop: 10,
                            }}
                            form={form}
                            name="search"
                        >
                            <Row gutter={[32, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="campaignID"
                                        name="campaignID"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="name"
                                        name="name"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="startTime"
                                        name="startTime"
                                    >
                                        <RangePicker style={{ width: '100%', }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="endTime"
                                        name="endTime"
                                    >
                                        <RangePicker style={{ width: '100%', }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="description"
                                        name="description"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="whitelist"
                                        name="whitelist"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="merkleTree"
                                        name="merkleTree"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" onClick={() => {handleSearch()}} style={{ marginRight: 8, }}>{language["button.search"]}</Button>
                                    <Button type="info" onClick={() => {handleReset()}} >{language["button.reset"]}</Button>
                                </Col>
                            </Row>
                        </Form>
                        : ""
                    }
                </Col>
                    
                <Col span={24}>
                    {
                        selectedRowKeysLength > 0 ?
                        `${language["emailLog.table.selected"]}${selectedRowKeysLength}${language["emailLog.table.data"]}`
                        : ""
                    }
                </Col>
                <Col span={24}>
                    <Table
                        dataSource={dataSourceChanged}
                        columns={columnsChanged}
                        rowKey={(record) => record.id}
                        scroll={{ x: 1300, y: 600 }}
                        rowSelection={rowSelection}
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
                    <Row justify="space-between">
                        <Col>
                            <Button type="primary" onClick={() => {handleExport()}} >{language["cryptoLog.button.Export"]}</Button>
                        </Col>
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
        </>
  );
}

export default CampaignListpage;