import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Radio, Space, Upload, Modal, Table, Row, Col, notification, DatePicker, Tooltip } from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import { getUserSession, setChainNameSession, getChainNameSession, getCredentialID } from "../../utils/utils";

import bnbImg from '../../assets/bnb_logo.png';
import polygonImg from '../../assets/polygon_logo.png';
import cryptoAddress from "../../utils/crypto_address.json";
import maxLength from "../../utils/parameter_config.json";

import { email, getUseremailtemplate, sendEmail } from "../../services/email";
import { Link } from "react-router-dom"
import './index.css';

const { Option } = Select;
const { TextArea } = Input;

const Emailpage = (props) => {

  const language = props.language;

  const [form] = Form.useForm();
  const [requiredByCsv, setRequiredByCsv] = useState(false);
  const [requiredByCsvValue, setRequiredByCsvValue] = useState(language["sendToolEmail.verify.by.CSV"]);
  const [RadiosValueOne, setRadiosValueOne] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEmailContent, setIsModalVisibleEmailContent] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chainList, setChainList] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [formData, setFormData] = useState({});
  const [imgUrl, setImgUrl] = useState(bnbImg);
  const [isSendDisable, setIsSendDisable] = useState(true);
  const [sourceDataRecords, setSourceDataRecords] = useState(0);
  const [sourceDataSumNo, setSourceDataSumNo] = useState(0);
  const [chainValue, setChainValue] = useState("bsc");
  const [isHandleChange, setIsHandleChange] = useState(false);
  const [radiosValueKYC, setRadiosValueKYC] = useState(1);
  const [radiosValueEmailContent, setRadiosValueEmailContent] = useState();
  const [dateValue, setDateValue] = useState(moment().add(3, "d").format("YYYY-MM-DD HH:mm:ss"));
  const [radiosEmailContnt, setRadiosEmailContnt] = useState([]);
  const [emailContentItem, setEmailContentItem] = useState();
  const [dataFile, setDataFile] = useState([]);
  const [isEmailSending, setIsEmailSending] = useState(false);

  const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regDate = /(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/;

  useEffect(() => {
    if (!isHandleChange) {
      if (getChainNameSession()) {
        setChainValue(getChainNameSession());
        form.setFieldsValue({ chain: getChainNameSession() });
        if (getChainNameSession() === "bsc") {
          setImgUrl(bnbImg);
        } else if (getChainNameSession() === "polygon") {
          setImgUrl(polygonImg);
        }
      } else {
        form.setFieldsValue({ chain: "bsc" });
      }
    }
  });

  /**
   * chain默认值是BSC,首次加载从utils/crypto_address.json配置文件中把BSC的token address取出来
   */
  useEffect(() => {
    const cryptoChainAddressKey = `${chainValue.toLowerCase()}_token_address`;
    const cryptoChainAddressValue = cryptoAddress[cryptoChainAddressKey];
    form.setFieldsValue({ tokenAddress: cryptoChainAddressValue });
  });

  useEffect(() => {
    const list = [
      {value: 'bsc', name: 'bsc'},
      {value: 'polygon', name: 'polygon'}
    ]
    setChainList(list);
    setChainNameSession('bsc');
  },[]);

  useEffect(() => {
    // const tableColumns = [
    //   {title: 'Email', dataIndex: 'email', key: 'email',},
    //   {title: 'Amount.', dataIndex: 'amount', key: 'amount',},
    //   {title: 'Date', dataIndex: 'date', key: 'date',},
    //   {title: 'KYC', dataIndex: 'kyc', key: 'kyc',},
    //   {title: 'Notes', dataIndex: 'notes', key: 'notes',},
    //   {title: 'var1', dataIndex: 'var1', key: 'var1',},
    //   {title: 'var2', dataIndex: 'var2', key: 'var2',},
    //   {title: 'var3', dataIndex: 'var3', key: 'var3',},
    //   {title: 'var4', dataIndex: 'var4', key: 'var4',},
    // ];

    if(!sourceData.length) return;
    const columnsDefault = [
      {title: 'Email', dataIndex: 'email', key: 'email',},
      {title: 'Amount.', dataIndex: 'amount', key: 'amount',},
      {title: 'Date', dataIndex: 'date', key: 'date',},
      {title: 'KYC', dataIndex: 'kyc', key: 'kyc',},
      {title: 'Notes', dataIndex: 'notes', key: 'notes',}
    ];
    const maxItem = getFileMaxItem();
    const columnsVars = maxItem.map((item, key) => {
      const index = key-4;
      if(key > 4) return {title: 'var' + index, dataIndex: 'var' + index, key: 'var' + index};
      return undefined;
    }).filter(item => item);
    const columnsAll = [...columnsDefault, ...columnsVars];
    setTableColumns(columnsAll);
  },[sourceData]);

  useEffect(() => {
    if(sourceData.length === 0) return;
    // const data = sourceData.map((item, key) => {
    //   return {
    //     key: key,
    //     email: item[0],
    //     amount: item[1],
    //     date: item[2],
    //     kyc: item[3],
    //     notes: item[4],
    //     var1: item[5],
    //     var2: item[6],
    //     var3: item[7],
    //     var4: item[8],
    //   }
    // });
    const maxItem = getFileMaxItem();
    const dataAll = sourceData.map((item, key) => {
      const ObjDefault = {
        key: key,
        email: item[0],
        amount: item[1],
        date: item[2],
        kyc: item[3],
        notes: item[4]
      }
      let objVars = {};
      maxItem.map((target, key) => {
        const index = key-4;
        if(key > 4) return objVars['var'+index] = item[key] ? item[key] : '';
        return undefined;
      });
      return Object.assign(ObjDefault, objVars)
    });
    setTableData(dataAll);
  },[sourceData]);

  //文件数据取长度最大行
  const getFileMaxItem = () => {
    let b = 0;
    let max=sourceData[b].length;
    for (let i = 0; i < sourceData.length; i++) {
        if (max<sourceData[i].length) {
            max=sourceData[i].length;
            b=i;
        }
    };

    return sourceData[b];
  };

  useEffect(() => {
    if(!getCredentialID()) return;
    if(!getChainNameSession()) return;
    setRadiosEmailContnt([]);
    setRadiosValueEmailContent(null);
    getUseremailtemplate(getCredentialID(), getChainNameSession())
    .then(response => response.json())
    .then(response => {
      const {data} = response;
      if(!data || !data.length) return;
      const result = data.map(item => {
        return {
          value: item.emailTemplateID,
          label: item.name,
          email: item.email,
          subject: item.subject,
          content: item.content
        }
      });
      form.setFieldsValue({})
      setRadiosEmailContnt(result);
      setRadiosValueEmailContent(result[0].value);
      form.setFieldsValue({'emailContnt': result[0].value});
    })
    .catch(err => {
        console.log(err);
    });
  },[getCredentialID(), getChainNameSession()]);

  const chainView = chainList.map((item, key) => {
    return <Option value={item.value} key={key}>{item.name}</Option>
  });

  // 表单未通过校验事件
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);

  };
  // 表单下拉change事件
  const handleChange = (value) => {
    setChainNameSession(value);
    setIsHandleChange(true);
    const cryptoChainAddressKey = `${value.toLowerCase()}_token_address`;
    const cryptoChainAddressValue = cryptoAddress[cryptoChainAddressKey];
    setTimeout(()=>{
      form.setFieldsValue({ chain: value, tokenAddress: cryptoChainAddressValue });
    }, 0);
    if (value === "bsc") {
      setImgUrl(bnbImg);
    } else if (value === "polygon") {
      setImgUrl(polygonImg);
    }
  };
  // 第一个单选change事件
  const onChangeRadiosOne = (e) => {
    setSourceData([]);
    form.setFieldsValue({ textarea: '' });
    setRadiosValueOne(e.target.value);
    setIsSendDisable(true);
  };
  // KYC单选change事件
  const onChangeRadiosKYC = (e) => {
    setRadiosValueKYC(e.target.value);
    if (sourceData.length > 0) {
      sourceData.forEach((item) => {
        if (item.length === 5) {
          item.splice(3, 1, e.target.value);
        }
      });
      const data = sourceData.map((item, key) => {
        return {
          key: key,
          email: item[0],
          amount: item[1],
          date: item[2],
          kyc: item[3],
          notes: item[4],
        }
      });
      setTableData(data);
    }
  };
  //Email Content单选change事件
  const onChangeRadiosEmailContent = (e) => {
    setRadiosValueEmailContent(e.target.value);
  };
  // 上传文件
  const uploadArmProps = {
    name: 'file',
    headers: {},// 请求头
    showUploadList: true,
    maxCount: 1,
    beforeUpload: file => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (result) => {
        setIsSendDisable(true);
        let targetNum = result.target.result;
        const data = targetNum.split(`\n`);
        const dataFilter = data.map((item, index) => {
          if(index === 0){
            return undefined;
          }
          return item;
        }).filter(item => item).join('\r\n');
        const sortingFormatResult = sortingFormat(dataFilter);
        if (sortingFormatResult.length > 0) {
          if (sortingFormatResult.length <= maxLength.maxLengthByCSVEmail) {
            for (let i = 0; i < sortingFormatResult.length; i++) {
              for (let j = 0; j < sortingFormatResult.length; j++) {
                if (i !== j && sortingFormatResult[i][0] === sortingFormatResult[j][0]) {
                  setRequiredByCsvValue(language["sendToolEmail.verify.email.address.same"]);
                  setRequiredByCsv(true);
                  return;
                }
              }
              // if (sortingFormatResult[i].length > 5) {
              //   setRequiredByCsvValue(language["sendToolEmail.verify.all.column.fail.byCSV"]);
              //   setRequiredByCsv(true);
              //   return;
              // }
              if (!regEmail.test(sortingFormatResult[i][0])) {
                setRequiredByCsvValue(language["sendToolEmail.verify.first.column.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (Object.is(NaN, Number(sortingFormatResult[i][1]))) {
                setRequiredByCsvValue(language["sendToolEmail.verify.second.column.notNumber.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (Number(sortingFormatResult[i][1]) < 1 || Number(sortingFormatResult[i][1]) > maxLength.maxTokenToSend) {
                setRequiredByCsvValue(language["sendToolEmail.verify.second.column.offLimits.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (sortingFormatResult[i][4]) {
                if (sortingFormatResult[i][4].length > maxLength.maxNoteLength) {
                  setRequiredByCsvValue(language["sendToolEmail.verify.third.column.offLimits.fail.byCSV"]);
                  setRequiredByCsv(true);
                  return;
                }
              }
            }
          } else {
            setRequiredByCsvValue(maxLength.maxLengthByCSVEmail + language["sendToolEmail.verify.maxLength50.column.fail"]);
            setRequiredByCsv(true);
            return;
          }
        } else {
          setRequiredByCsvValue(language["sendToolEmail.verify.all.column.fail.byCSV"]);
          setRequiredByCsv(true);
          return;
        }
        setRequiredByCsv(false);
        setIsSendDisable(false);
      }
      return false;
    },
    onRemove: file => {
      setRequiredByCsv(true);
      setSourceData([]);
      setTableData([]);
    }
  };

  const sortingFormat = (targetNum) => {
    let sum = 0;
    const csvData = targetNum.split(/\n/).map(item => {
      return item.split('|')
    }).filter(item => {
      return item[0].length !== 0;
    });
    csvData.forEach(item => {
      sum += Number(item[1]);
      if (RadiosValueOne === 1) {
        item.splice(2, 0, dateValue, radiosValueKYC);
      }
    })
    setSourceData(csvData);
    setSourceDataRecords(csvData.length);
    setSourceDataSumNo(sum);
    return csvData;
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

  const handleOk = async () => {
    // 调用API
    // let params = [];
    // sourceData.forEach(item => {
    //   const itemData = {};
    //   itemData.user = getUserSession();
    //   itemData.sendTime = timeFormat(new Date().getTime());
    //   itemData.chain = formData.chain;
    //   itemData.tokenAddress = formData.tokenAddress;
    //   itemData.emailAddress = item[0];
    //   itemData.tokenNo = item[1];
    //   itemData.expiry = item[2];
    //   //itemData.KYC = item[3];
    //   itemData.KYC = parseInt(item[3]);
    //   itemData.sendStatus = 1;
    //   itemData.linkClicked = 0;
    //   itemData.note = item[4];
    //   params.push(itemData);
    // })
    // email(getUserSession(), params)
    // .then(response => response.json())
    // .then(response => {
    //   notification["success"]({
    //     message: language["notification.success.message"],
    //     description: language["sendToolEmail.email[POST].api.success.pass"]
    //   });
    // })
    // .catch(err => {
    //   notification["error"]({
    //     message: language["sendToolEmail.email[POST].api.error"],
    //     description: err.toString(),
    //   });
    // })
    
    setIsEmailSending(true);
    const maxItem = getFileMaxItem();
    const dataFile = sourceData.map((item, key) => {
      const ObjDefault = {
        emailAddress: item[0],
        tokenNo: item[1],
        note: item[4]
      }
      let objVars = {};
      maxItem.map((target, key) => {
        const index = key-4;
        if(key > 4) return objVars['var'+index] = item[key] ? item[key].replace(/\r/g,''): '';
        return undefined;
      });
      return Object.assign(ObjDefault, objVars)
    });
    const expire = dateValue.replace(/\s+/g,"").replace(/-/g,"").replace(/:/g,"");
    const params = {
      admin: getUserSession(),
      templateID: radiosValueEmailContent,
      chain: getChainNameSession(),
      tokenAddress: form.getFieldValue('tokenAddress'),
      ifKYC: radiosValueKYC,
      expire
    };
    sendEmail(params, dataFile)
    .then(response => response.json())
    .then(response => {
      if(response.message === 'Email sending operations completed'){
        setIsModalVisible(false);
        setIsEmailSending(false);
        notification["success"]({
          message: '',
          description: response.message
        });
      }else{
        notification["error"]({
          message: '',
          description: response.message
        });
      }
    })
    .catch(err => {
        console.log(err);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 表单通过校验事件
  const onFinish = (values) => {
    if (requiredByCsv) return;
    setFormData(values);
    if (values.radioOne === 2) {
      const sortingFormatResult = sortingFormat(values.textarea);
      if(sortingFormatResult.length === 0) return
      setRequiredByCsv(false);
    }
    if (values.radioOne === 1) {
      setRequiredByCsv(true);
      if (sourceData.length === 0) return;
      setRequiredByCsv(false);
    }
    setIsModalVisible(true);
  };

  // Textatea vlaue 校验
  const handleConfirmTextarea = async (rule, value, callback) => {
    const sortingFormatResult = sortingFormat(value);
    if (sortingFormatResult.length > 0) {
      if (sortingFormatResult.length <= maxLength.maxLengthByInputEmail) {
        for (let i = 0; i < sortingFormatResult.length; i++) {
          for (let j = 0; j < sortingFormatResult.length; j++) {
            if (i !== j && sortingFormatResult[i][0] === sortingFormatResult[j][0]) {
              setIsSendDisable(true);
              return Promise.reject(language["sendToolEmail.verify.email.address.same"]);
            }
          }
          if (sortingFormatResult[i].length > 5) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolEmail.verify.all.column.fail"]);
          }
          if (!regEmail.test(sortingFormatResult[i][0])) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolEmail.verify.first.column.fail"]);
          }
          if (Object.is(NaN, Number(sortingFormatResult[i][1]))) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolEmail.verify.second.column.notNumber.fail"]);
          }
          if (Number(sortingFormatResult[i][1]) < 1 || Number(sortingFormatResult[i][1]) > maxLength.maxTokenToSend) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolEmail.verify.second.column.offLimits.fail"]);
          }
          if (!regDate.test(sortingFormatResult[i][2])) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolEmail.verify.third.column.offLimits.fail"]);
          }
          if (sortingFormatResult[i][3] !== "0" && sortingFormatResult[i][3] !== "1") {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolEmail.verify.fourth.column.offLimits.fail"]);
          }
          if (sortingFormatResult[i][4]) {
            if (sortingFormatResult[i][4].length > maxLength.maxNoteLength) {
              setIsSendDisable(true);
              return Promise.reject(language["sendToolEmail.verify.fifth.column.offLimits.fail"]);
            }
          }
        }
        setIsSendDisable(false);
        return Promise.resolve();
      } else {
        setIsSendDisable(true);
        return Promise.reject(maxLength.maxLengthByInputEmail + language["sendToolEmail.verify.maxLength50.column.fail"]);
      }
      
    } else {
      setIsSendDisable(true);
      return Promise.reject(language["sendToolEmail.verify.all.column.fail"]);
    }
  }

  const onChangeDatePicker = (value, dateString) => {
    setDateValue(dateString);
    if (sourceData.length > 0) {
      sourceData.forEach((item) => {
        if (item.length === 5) {
          item.splice(2, 1, dateString);
        }
      });
      const data = sourceData.map((item, key) => {
        return {
          key: key,
          email: item[0],
          amount: item[1],
          date: item[2],
          kyc: item[3],
          notes: item[4],
        }
      });
      setTableData(data);
    }
  };

  const disabledDate = (current) => {
    return current && current < moment().subtract(0, "days").endOf("day");
  };

  // Upload 组件 上传中、完成、失败都会调用这个函数
  const onChangeUpload = (info) => {
    if (info.fileList.length !== 1) {
      setIsSendDisable(true);
    }
  };

  const modalEmailContent = (item) => {
    setEmailContentItem(item);
    setIsModalVisibleEmailContent(true)
  };

  return (
    <div className="mainContainer">
      <Form
        form={form}
        className="login-ant-form"
        name="basic"
        layout="vertical"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          chain: '',
          tokenAddress: '',
          radioOne: 1,
          textarea: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row align="middle">
          <Col span={6}>
            <Form.Item
              label={language["sendToolEmail.form.label.Chain"]}
              name="chain"
            >
              <Select
                placeholder="Please Select"
                onChange={handleChange}
              >
                {chainView}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <img src={imgUrl} alt="" className="chain-img"></img>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item
              label={language["sendToolEmail.form.label.TokenAddress"]}
              name="tokenAddress"
              tooltip={{ title: language["sendToolEmail.tooltip.tokenAddress"], icon: <InfoCircleOutlined /> }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        {
          RadiosValueOne === 1 &&
          <>
            <Row>
              <Col xs={24}>
                <Form.Item
                  label='Email Template'
                  name="emailTemplate"
                  tooltip={{ title: language["sendToolEmail.template.tooltip"], icon: <InfoCircleOutlined /> }}
                >
                  <Radio.Group
                    name="radiogroupEmailContent"
                    defaultValue={radiosValueEmailContent}
                    value={radiosValueEmailContent}
                    onChange={onChangeRadiosEmailContent}
                  >
                    <Space direction="vertical">
                      {radiosEmailContnt.map((item, key) => {
                        return <div className='checkboxGroup'>
                            <Radio value={item.value} key={key}>
                              <span className='checkboxLink'><Link to={'/users/contentDetail/'+item.value} target='_blank'>{item.label}</Link></span>
                            </Radio>
                          </div>
                      })}
                    </Space>
                  </Radio.Group>
                  <Radio.Group>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                <Form.Item
                  label={language["sendToolEmail.form.label.KYC"]}
                  name="KYC"
                  tooltip={{ title: language["sendToolEmail.tooltip.KYC"], icon: <InfoCircleOutlined /> }}
                >
                  <Radio.Group name="radiogroupKYC" defaultValue={1} onChange={onChangeRadiosKYC} value={radiosValueKYC}>
                    <Space>
                      <Radio value={0}>No</Radio>
                      <Radio value={1}>Yes</Radio>
                    </Space>  
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                <Form.Item
                  label={language["sendToolEmail.form.label.Expiry"]}
                  name="Expiry"
                  tooltip={{ title: language["sendToolEmail.tooltip.Expiry"], icon: <InfoCircleOutlined /> }}
                >
                   <Space direction="vertical">
                    <DatePicker
                      disabledDate={disabledDate}
                      showTime
                      allowClear={false}
                      format="YYYY-MM-DD HH:mm:ss"
                      defaultValue={moment(dateValue, 'YYYY-MM-DD HH:mm:ss')}
                      onChange={onChangeDatePicker}
                    />
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row align="middle">
                <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                  <Upload {...uploadArmProps} onChange={onChangeUpload}>
                    <Button type="params" icon={<UploadOutlined />}>{language["sendToolEmail.buttom.content.ChooseFile"]}</Button>
                  </Upload>
                  {requiredByCsv ? (<div style={{color: '#ff4d4f', marginTop: '10px'}}>{requiredByCsvValue}</div>) : ''}
                </Col>
                <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                  <a href="/sample_email.csv" style={{ color: '#012FF8', fontWeight: '600', textDecoration: 'underline',}}>
                    {language["sendToolEmail.buttom.content.DownloadSampleFile"]}
                  </a>
                </Col>
              </Row>
            </Form.Item>
          </>
        }

        {
          RadiosValueOne === 2 &&
          <Form.Item
            name="textarea"
            rules={[
              { required: true },
              {
                validator: handleConfirmTextarea
              }
            ]}
          >
            <TextArea
              rows={4}
              placeholder="aaa@gmail.com|1|2022-09-18 01:30:31|0|Promotion for ABC company &#13;&#10;bbb@yahoo.com|45|2022-12-10 11:02:11|1|deposit for XZY &#13;&#10;ccf@163.com|930|2023-01-30 07:11:23|0|After lockup period"
            />
          </Form.Item>
        }
        
        <Form.Item>
          <Row align="bottom">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit" disabled={isSendDisable ? true : false}>{language["sendToolEmail.buttom.content.Send"]}</Button>
              </Space>
            </Col>
            <Col>
              {
                isSendDisable ?
                <Col style={{marginLeft: 30}}>
                  <Row>
                    <Col span={24}>{language["sendToolEmail.send.tooltip.available.when"]}</Col>
                    <Col span={24}>{language["sendToolEmail.send.tooltip.CSV.or.inputted"]}</Col>
                  </Row>
                </Col>
                : ""
              }
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Modal
        title="&nbsp;"
        maskClosable={false}
        width="calc(100% - 200px)"
        visible={isModalVisible}
        cancelText={language["sendToolEmail.Modal.cancelText"]}
        okText={language["sendToolEmail.Modal.okText"]}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isEmailSending }}
      >
          <div className="table-view">
            <Table columns={tableColumns} dataSource={tableData} pagination={false} scroll={true}/>
          </div>
          <Row>
            <Col span={12}>
              <p className="table-view-statistics">
                Total no. of records: {sourceDataRecords}
              </p>
            </Col>
            <Col span={12}>
              <p className="table-view-statistics">
                Total no. of tokens: {sourceDataSumNo}
              </p>
            </Col>
          </Row>
      </Modal>

      <Modal
        title="&nbsp;"
        maskClosable={false}
        width={600}
        visible={isModalVisibleEmailContent}
        cancelText={language["button.cancel"]}
        okText={language["button.ok"]}
        okButtonProps={{ style: { display: 'none' } }} 
        onCancel={() => setIsModalVisibleEmailContent(false)}
      >
        <Form
            className="login-ant-form"
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
          >
            <Form.Item
                label='email'
                name="email"
            >
              {emailContentItem?.email}
            </Form.Item>
            <Form.Item
                label='subject'
                name="subject"
            >
              {emailContentItem?.subject}
            </Form.Item>
            <Form.Item
                label='content'
                name="content"
            >
              {emailContentItem?.content}
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default Emailpage;