import React, { useEffect, useState, } from "react";
import { Form, Input, Table, Select, Row, Col, Button, notification, DatePicker, Pagination, Radio } from 'antd';
import { DownOutlined, UpOutlined, } from '@ant-design/icons';
import './index.css';

import { getIsAdmin, getUserSession } from "../../utils/utils";

import { emailLog } from "../../services/emailLog";

const { Option } = Select;
const { RangePicker } = DatePicker;

const EmailLogpage = (props) => {

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
    // 只有三列 单选框 默认值
    const [radiosValue, setRadiosValue] = useState(0);
    // table emailID 默认降序
    const [sortedInfo, setSortedInfo] = useState({columnKey: "emailID", order: "descend"});

    const columns = [
        {
            title: 'emailID',
            dataIndex: 'emailID',
            key: 'emailID',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a["emailID"] - b["emailID"],
            sortOrder: sortedInfo.columnKey === 'emailID' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150,
        },
        {
            title: 'user',
            dataIndex: 'user',
            key: 'user',
            sorter: (a, b) => {
                if (a['user']) {
                    return a['user'].localeCompare(b['user']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'user' ? sortedInfo.order : null,
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
            title: 'sendTime',
            dataIndex: 'sendTime',
            key: 'sendTime',
            sorter: (a, b) =>  new Date(a['sendTime']).getTime() - new Date(b['sendTime']).getTime(),
            sortOrder: sortedInfo.columnKey === 'sendTime' ? sortedInfo.order : null,
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
            title: 'chain',
            dataIndex: 'chain',
            key: 'chain',
            sorter: (a, b) => {
                if (a['chain']) {
                    return a['chain'].localeCompare(b['chain']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'chain' ? sortedInfo.order : null,
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
            title: 'tokenAddress',
            dataIndex: 'tokenAddress',
            key: 'tokenAddress',
            sorter: (a, b) => {
                if (a['tokenAddress']) {
                    return a['tokenAddress'].localeCompare(b['tokenAddress']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'tokenAddress' ? sortedInfo.order : null,
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
            title: 'emailTemplateID',
            dataIndex: 'emailTemplateID',
            key: 'emailTemplateID',
            sorter: (a, b) => a["emailTemplateID"] - b["emailTemplateID"],
            sortOrder: sortedInfo.columnKey === 'emailTemplateID' ? sortedInfo.order : null,
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
            title: 'emailAddress',
            dataIndex: 'emailAddress',
            key: 'emailAddress',
            sorter: (a, b) => {
                if (a['emailAddress']) {
                    return  a['emailAddress'].localeCompare(b['emailAddress']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'emailAddress' ? sortedInfo.order : null,
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
            title: 'tokenNo',
            dataIndex: 'tokenNo',
            key: 'tokenNo',
            sorter: (a, b) => a["tokenNo"] - b["tokenNo"],
            sortOrder: sortedInfo.columnKey === 'tokenNo' ? sortedInfo.order : null,
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
            title: 'expiry',
            dataIndex: 'expiry',
            key: 'expiry',
            sorter: (a, b) =>  new Date(a['expiry']).getTime() - new Date(b['expiry']).getTime(),
            sortOrder: sortedInfo.columnKey === 'expiry' ? sortedInfo.order : null,
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
            title: 'KYC',
            dataIndex: 'KYC',
            key: 'KYC',
            sorter: (a, b) => a["KYC"] - b["KYC"],
            sortOrder: sortedInfo.columnKey === 'KYC' ? sortedInfo.order : null,
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
            title: 'KYCResult',
            dataIndex: 'KYCResult',
            key: 'KYCResult',
            sorter: (a, b) => a["KYCResult"] - b["KYCResult"],
            sortOrder: sortedInfo.columnKey === 'KYCResult' ? sortedInfo.order : null,
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
            title: 'KYCResultUpdateTime',
            dataIndex: 'KYCResultUpdateTime',
            key: 'KYCResultUpdateTime',
            sorter: (a, b) =>  new Date(a['KYCResultUpdateTime']).getTime() - new Date(b['KYCResultUpdateTime']).getTime(),
            sortOrder: sortedInfo.columnKey === 'KYCResult' ? sortedInfo.order : null,
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
            title: 'uniqueKey',
            dataIndex: 'uniqueKey',
            key: 'uniqueKey',
            sorter: (a, b) => {
                if (a['uniqueKey']) {
                    return a['uniqueKey'].localeCompare(b['uniqueKey']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'uniqueKey' ? sortedInfo.order : null,
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
            title: 'sendStatus',
            dataIndex: 'sendStatus',
            key: 'sendStatus',
            sorter: (a, b) => a["sendStatus"] - b["sendStatus"],
            sortOrder: sortedInfo.columnKey === 'sendStatus' ? sortedInfo.order : null,
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
            title: 'linkClicked',
            dataIndex: 'linkClicked',
            key: 'linkClicked',
            sorter: (a, b) => a["linkClicked"] - b["linkClicked"],
            sortOrder: sortedInfo.columnKey === 'linkClicked' ? sortedInfo.order : null,
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
            title: 'whenClicked',
            dataIndex: 'whenClicked',
            key: 'whenClicked',
            sorter: (a, b) =>  new Date(a['whenClicked']).getTime() - new Date(b['whenClicked']).getTime(),
            sortOrder: sortedInfo.columnKey === 'whenClicked' ? sortedInfo.order : null,
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
            title: 'walletAddress',
            dataIndex: 'walletAddress',
            key: 'walletAddress',
            sorter: (a, b) => {
                if (a['walletAddress']) {
                    return a['walletAddress'].localeCompare(b['walletAddress']);
                }
            },
            sortOrder: sortedInfo.columnKey === 'walletAddress' ? sortedInfo.order : null,
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
            title: 'tokenSent',
            dataIndex: 'tokenSent',
            key: 'tokenSent',
            sorter: (a, b) => a["tokenSent"] - b["tokenSent"],
            sortOrder: sortedInfo.columnKey === 'tokenSent' ? sortedInfo.order : null,
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
            title: 'note',
            dataIndex: 'note',
            key: 'note',
            sorter: (a, b) =>  {
                if (a['note']) {
                    return a['note'].localeCompare(b['note'])
                }
            },
            sortOrder: sortedInfo.columnKey === 'note' ? sortedInfo.order : null,
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
        'emailID',
        'user',
        'sendTime',
        'chain',
        'tokenAddress',
        'emailTemplateID',
        'emailAddress',
        'tokenNo',
        'expiry',
        'KYC',
        'KYCResult',
        'KYCResultUpdateTime',
        'uniqueKey',
        'sendStatus',
        'linkClicked',
        'whenClicked',
        'walletAddress',
        'tokenSent',
        'note',
    ];

    const selectThreeColumnValue = [
        'walletAddress',
        'tokenNo',
        'note',
    ];

    useEffect(() => {
        emailLog(getUserSession())
        .then(response => response.json())
        .then(response => {
            let data = [];
            if (isAdmin == 1) {
                response.data.forEach((item) => {
                    if (item["sendTime"]) {
                        item["sendTime"] = timeFormat(new Date(item["sendTime"]).getTime());
                    }
                    if (item["expiry"]) {
                        item["expiry"] = timeFormat(new Date(item["expiry"]).getTime());
                    }
                    if (item["KYCResultUpdateTime"]) {
                        item["KYCResultUpdateTime"] = timeFormat(new Date(item["KYCResultUpdateTime"]).getTime());
                    }
                    if (item["whenClicked"]) {
                        item["whenClicked"] = timeFormat(new Date(item["whenClicked"]).getTime());
                    }
                    data.push(item);
                });
            } else {
                let hubArray = [];
                hubArray = response.data.filter((item) => {
                    return item.user === getUserSession();
                });
                hubArray.forEach((item) => {
                    if (item["sendTime"]) {
                        item["sendTime"] = timeFormat(new Date(item["sendTime"]).getTime());
                    }
                    if (item["expiry"]) {
                        item["expiry"] = timeFormat(new Date(item["expiry"]).getTime());
                    }
                    if (item["KYCResultUpdateTime"]) {
                        item["KYCResultUpdateTime"] = timeFormat(new Date(item["KYCResultUpdateTime"]).getTime());
                    }
                    if (item["whenClicked"]) {
                        item["whenClicked"] = timeFormat(new Date(item["whenClicked"]).getTime());
                    }
                    data.push(item);
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
                message: language["emailLog.email[GET].api.error"],
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
        console.log("changedArray", changedArray);
        setColumnsChanged(changedArray);
    };

    // 导出按钮点击事件
    const handleExport = () => {
        if (selectedRowKeys.length < 1) {
            // 没有选择 导出全部
            jsonToExcelConvertor(columnsChanged, dataSourceChanged, "emailLog");
        } else {
            if (!isExporting) {
                const selectedRowArray = [];
                setIsExporting(true);
                dataSourceChanged.forEach((itemData) => {
                    selectedRowKeys.forEach((itemSelected) => {
                        if (itemData.emailID === itemSelected) {
                            selectedRowArray.push(itemData);
                        }
                    });
                });
                jsonToExcelConvertor(columnsChanged, selectedRowArray, "emailLog");
            } else {
                notification["error"]({
                    message: language["notification.error.message"],
                    description: language["emailLog.handleExport.function.repeat.export"]
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

        // =========================按照exportTitle顺序 排序exportData=====================================
        const sortArray = [];
        exportData.forEach((itemExport) => {
            const hubObj = {};
            exportTitle.forEach((itemTitle) => {
                for (let key in itemExport) {
                    if (itemTitle["title"] === key) {
                        hubObj[key] = itemExport[key];
                    }
                }
            });
            sortArray.push(hubObj);
        });
        // ============================排序 结束==================================

        for (const item of sortArray) {
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
                description: language["emailLog.jsonToExcelConvertor.function.Data.cannot.be.null"]
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
    /**
     * 根据form获取到每个item的值,如果不为undefined证明有值需要进行检索,changedDataArray为最终要展示的table数据
     * 根据changedDataArray的length判断,
     * 如果小于等于0证明没有值,需要往changedDataArray里push进去,当changedDataArray在这个判断里没有值进来，证明不符合检索条件，后面的条件没必要继续检索了，return
     * 如果大于0证明有值,循环changedDataArray根据模糊，全等，时间范围三类,进行条件判断,每个item的值都需要判断一遍and逻辑,通过used自定义字段，为true即使用,否则不用
     * @returns 
     */
    const handleSearch = () => {
        const undefinedItemArray = [];
        const changedDataArray = [];
        const formValuesObj = form.getFieldsValue();
        delete formValuesObj.tokenNoCompare;
        delete formValuesObj.tokenSentCompare;
        setTotal(0);
        setDataSourceChanged([]);
        console.log(formValuesObj)
        // console.log(dataSource)
        for (const key in formValuesObj) {
            if (formValuesObj[key] !== undefined && formValuesObj[key] !== "") {
                if (changedDataArray.length > 0) {
                    changedDataArray.forEach((item) => {
                        if (key === "user" ||
                        key === "tokenAddress" ||
                        key === "emailAddress" ||
                        key === "uniqueKey" ||
                        key === "walletAddress" ||
                        key === "note") {
                            if (item[key].indexOf(formValuesObj[key]) !== -1) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === "KYC" ||
                        key === "KYCResult" ||
                        key === "sendStatus" ||
                        key === "linkClicked") {
                            if (item[key] === formValuesObj[key]) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === "emailTemplateID") {
                            if (item[key] == formValuesObj[key]) {
                                console.log(item[key])
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === "chain") {
                            if (item[key].toLowerCase() === formValuesObj[key].toLowerCase()) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === "sendTime" ||
                        key === "expiry" ||
                        key === "KYCResultUpdateTime" ||
                        key === "whenClicked") {
                            if (new Date(item[key]).getTime() >= new Date(formValuesObj[key][0]).getTime() &&
                            new Date(item[key]).getTime() <= new Date(formValuesObj[key][1]).getTime()) {
                                item.used = true;
                            } else {
                                item.used = false;
                            }
                        }
                        if (key === 'tokenNo') {
                            if (form.getFieldValue("tokenNoCompare") > 0) {
                                if (Number(item[key]) > Number(formValuesObj[key])) {
                                    item.used = true;
                                } else {
                                    item.used = false;
                                }
                            } else if (form.getFieldValue("tokenNoCompare") < 0) {
                                if (Number(item[key]) < Number(formValuesObj[key])) {
                                    item.used = true;
                                } else {
                                    item.used = false;
                                }
                            } else {
                                if (Number(item[key]) === Number(formValuesObj[key])) {
                                    item.used = true;
                                } else {
                                    item.used = false;
                                }
                            }
                        }
                        if (key === 'tokenSent') {
                            if (form.getFieldValue("tokenSentCompare") > 0) {
                                if (Number(item[key]) > Number(formValuesObj[key])) {
                                    item.used = true;
                                } else {
                                    item.used = false;
                                }
                            } else if (form.getFieldValue("tokenSentCompare") < 0) {
                                if (Number(item[key]) < Number(formValuesObj[key])) {
                                    item.used = true;
                                } else {
                                    item.used = false;
                                }
                            } else {
                                if (Number(item[key]) === Number(formValuesObj[key])) {
                                    item.used = true;
                                } else {
                                    item.used = false;
                                }
                            }
                        }
                    });
                } else {
                    dataSource.forEach((item) => {
                        if (key === "user" ||
                        key === "tokenAddress" ||
                        key === "emailAddress" ||
                        key === "uniqueKey" ||
                        key === "walletAddress" ||
                        key === "note") {
                            if (item[key].indexOf(formValuesObj[key]) !== -1) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === "KYC" ||
                        key === "KYCResult" ||
                        key === "sendStatus" ||
                        key === "linkClicked") {
                            if (item[key] === formValuesObj[key]) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === "emailTemplateID") {
                            if (item[key] == formValuesObj[key]) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === "chain") {
                            if (item[key].toLowerCase() === formValuesObj[key].toLowerCase()) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === "sendTime" ||
                        key === "expiry" ||
                        key === "KYCResultUpdateTime" ||
                        key === "whenClicked") {
                            if (new Date(item[key]).getTime() >= new Date(formValuesObj[key][0]).getTime() &&
                            new Date(item[key]).getTime() <= new Date(formValuesObj[key][1]).getTime()) {
                                item.used = true;
                                changedDataArray.push(item);
                            }
                        }
                        if (key === 'tokenNo') {
                            item.used = true;
                            if (form.getFieldValue("tokenNoCompare") > 0) {
                                if (Number(item[key]) > Number(formValuesObj[key])) {
                                    item.used = true;
                                    changedDataArray.push(item);
                                }
                            } else if (form.getFieldValue("tokenNoCompare") < 0) {
                                if (Number(item[key]) < Number(formValuesObj[key])) {
                                    item.used = true;
                                    changedDataArray.push(item);
                                }
                            } else {
                                if (Number(item[key]) === Number(formValuesObj[key])) {
                                    item.used = true;
                                    changedDataArray.push(item);
                                }
                            }
                        }
                        if (key === 'tokenSent') {
                            item.used = true;
                            if (form.getFieldValue("tokenSentCompare") > 0) {
                                if (Number(item[key]) > Number(formValuesObj[key])) {
                                    item.used = true;
                                    changedDataArray.push(item);
                                }
                            } else if (form.getFieldValue("tokenSentCompare") < 0) {
                                if (Number(item[key]) < Number(formValuesObj[key])) {
                                    item.used = true;
                                    changedDataArray.push(item);
                                }
                            } else {
                                if (Number(item[key]) === Number(formValuesObj[key])) {
                                    item.used = true;
                                    changedDataArray.push(item);
                                }
                            }
                        }
                    });
                    if (changedDataArray.length < 1) return;
                }
            } else {
                undefinedItemArray.push(key);
            }
        }
        // console.log(changedDataArray)
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
    const showTotal = (total) => `${language["emailLog.Pagination.Total.records"]} ${total} ${language["emailLog.Pagination.Total.items"]}`;

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

    const onChangeRadios = (e) => {
        setRadiosValue(e.target.value);
        if (e.target.value === 0) {
            setSelectValue(selectDefaultValue);
            handleSelectChange(selectDefaultValue.join(","));
        } else {
            setSelectValue(selectThreeColumnValue);
            handleSelectChange(selectThreeColumnValue.join(","));
        }
    };

    return (
        <>
            <Row gutter={[16, 32]}>
                <Col span={24} className="emailLog-outterBox">
                    <Row justify="space-between" style={{marginBottom: 10}}>
                        <Col>{language["emailLog.col.content.SelectColumns"]}</Col>
                        <Col>
                            {
                                isShowSelect ? <UpOutlined onClick={() => {handleIsShowSelect(false)}}  /> : <DownOutlined onClick={() => {handleIsShowSelect(true)}}  />
                            }
                        </Col>
                    </Row>
                    {
                        isShowSelect ?
                        <Col>
                            <Row gutter={[0,8]}>
                                <Col span={24}>
                                    <Radio.Group onChange={onChangeRadios} value={radiosValue}>
                                        <Radio value={0}>{language["emailLog.radio.allColumn"]}</Radio>
                                        <Radio value={1}>{language["emailLog.radio.threeColumn"]}</Radio>
                                    </Radio.Group>
                                </Col>
                                <Col span={24}>
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
                                </Col>
                            </Row>
                        </Col>
                        : ""
                    }
                </Col>
                <Col span={24} className="emailLog-outterBox">
                    <Row justify="space-between">
                        <Col>{language["emailLog.col.content.SearchCriteria"]}</Col>
                        <Col>
                            {
                                isShowForm ? <UpOutlined onClick={() => {handleIsShowForm(false)}} /> : <DownOutlined onClick={() => {handleIsShowForm(true)}} />
                            }
                        </Col>
                    </Row>
                    {
                        isShowForm ?
                        <Form
                            form={form}
                            style={{
                                marginTop: 10,
                            }}
                            name="search"
                        >
                            <Row gutter={[32, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="user"
                                        name="user"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="sendTime"
                                        name="sendTime"
                                    >
                                        <RangePicker style={{ width: '100%', }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="chain"
                                        name="chain"
                                    >
                                        <Select allowClear={true}>
                                            <Option value="BSC" key="BSC">BSC</Option>
                                            <Option value="POLYGON" key="POLYGON">POLYGON</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="tokenAddress"
                                        name="tokenAddress"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="emailTemplateID"
                                        name="emailTemplateID"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="emailAddress"
                                        name="emailAddress"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Row>
                                        <Col span={10}>
                                            <Form.Item
                                                label="tokenNo"
                                                name="tokenNoCompare"
                                                initialValue={0}
                                            >
                                                <Select allowClear={true} defaultValue={0}>
                                                    <Option value={-1} key={-1}>{"<"}</Option>
                                                    <Option value={0} key={0}>{"="}</Option>
                                                    <Option value={1} key={1}>{">"}</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={13} offset={1}>
                                            <Form.Item
                                                label="&nbsp;"
                                                colon={false}
                                                name="tokenNo"
                                            >
                                                <Input type="text" allowClear={true} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="expiry"
                                        name="expiry"
                                    >
                                        <RangePicker style={{ width: '100%', }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="KYC"
                                        name="KYC"
                                    >
                                        <Select allowClear={true}>
                                            <Option value={0} key="0">0</Option>
                                            <Option value={1} key="1">1</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="KYCResult"
                                        name="KYCResult"
                                    >
                                        <Select allowClear={true}>
                                            <Option value={0} key="0">0</Option>
                                            <Option value={1} key="1">1</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="KYCResultUpdateTime"
                                        name="KYCResultUpdateTime"
                                    >
                                        <RangePicker style={{ width: '100%', }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="uniqueKey"
                                        name="uniqueKey"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="sendStatus"
                                        name="sendStatus"
                                    >
                                        <Select allowClear={true}>
                                            <Option value={0} key="0">0</Option>
                                            <Option value={1} key="1">1</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="linkClicked"
                                        name="linkClicked"
                                    >
                                        <Select allowClear={true}>
                                            <Option value={0} key="0">0</Option>
                                            <Option value={1} key="1">1</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="whenClicked"
                                        name="whenClicked"
                                    >
                                        <RangePicker style={{ width: '100%', }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="walletAddress"
                                        name="walletAddress"
                                    >
                                        <Input type="text" allowClear={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Row>
                                        <Col span={10}>
                                            <Form.Item
                                                label="tokenSent"
                                                name="tokenSentCompare"
                                                initialValue={0}
                                            >
                                                <Select allowClear={true} defaultValue={0}>
                                                    <Option value={-1} key={-1}>{"<"}</Option>
                                                    <Option value={0} key={0}>{"="}</Option>
                                                    <Option value={1} key={1}>{">"}</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={13} offset={1}>
                                            <Form.Item
                                                label="&nbsp;"
                                                colon={false}
                                                name="tokenSent"
                                            >
                                                <Input type="text" allowClear={true} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item
                                        label="note"
                                        name="note"
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
                        rowKey={(record) => record.emailID}
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
                            cancelSort: language["emailLog.Table.locale.cancelSort"],
                            triggerAsc: language["emailLog.Table.locale.triggerAsc"],
                            triggerDesc: language["emailLog.Table.locale.triggerDesc"]
                        }}
                    />
                </Col>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            <Button type="primary" onClick={() => {handleExport()}} >{language["emailLog.button.Export"]}</Button>
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

export default EmailLogpage;