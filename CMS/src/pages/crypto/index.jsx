import React, { useEffect, useState } from "react";
import {useNavigate,} from 'react-router';
import { Form, Input, Button, Select, Radio, Space, Upload, Modal, Table, Row, Col, notification } from 'antd';
import { UploadOutlined, InfoCircleOutlined, } from '@ant-design/icons';
import { ethers } from "ethers";

import abi from "../../utils/Airdrop.json";
import tokenabi from "../../utils/token.json";
import cryptoAddress from "../../utils/crypto_address.json";
import maxLength from "../../utils/parameter_config.json";

import { getUserSession, setChainNameSession, getChainNameSession, } from "../../utils/utils";

import { crypto } from "../../services/home";

import bnbImg from '../../assets/bnb_logo.png';
import polygonImg from '../../assets/polygon_logo.png';

import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";

const { Option } = Select;
const { TextArea } = Input;

const web3Modal = new Web3Modal({
  //network: "binance",
  //network: "matic",
  cacheProvider: true, // optional
  providerOptions // required
});


const Cryptopage = (props) => {

  const language = props.language;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [requiredByCsv, setRequiredByCsv] = useState(false);
  const [requiredByCsvValue, setRequiredByCsvValue] = useState(language["sendToolCrypto.verify.by.CSV"]);
  const [RadiosValueOne, setRadiosValueOne] = useState(1);
  const [RadiosValueTwo, setRadiosValueTow] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chainList, setChainList] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [feeOptionsBSC, setFeeOptionsBSC] = useState({gasLimit: maxLength.highGasLimitBSC, gasPrice: ethers.utils.parseUnits(maxLength.highGasPriceBSC, 'gwei')});
  const [feeOptionsPolygon, setFeeOptionsPolygon] = useState({gasLimit: maxLength.highGasLimitPolygon, gasPrice: ethers.utils.parseUnits(maxLength.highGasPricePolygon, 'gwei')});
  const [formData, setFormData] = useState({});
  const [imgUrl, setImgUrl] = useState(bnbImg);
  const [isSendDisable, setIsSendDisable] = useState(true);
  const [sourceDataRecords, setSourceDataRecords] = useState(0);
  const [sourceDataSumNo, setSourceDataSumNo] = useState(0);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isChainId, setIsChainId] = useState(false);
  const [isBalance, setIsBalance] = useState(false);
  const [chainValue, setChainValue] = useState("polygon");
  const [isAirDrop, setIsAirDrop] = useState(false);
  const [isHandleChange, setIsHandleChange] = useState(false);

  const [signer, setSigner] = useState("");
  const [chainId, setChainId] = useState("");

  const [airdropContract, setAirdropContract] = useState("");
  const [tokenContract, setTokenContract] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const contractABI = abi.result;
  const tokencontractABI = tokenabi.result;

  const [web3Provider, setweb3Provider] = useState();
  const [provider, setProvider] = useState();

  let Addresses = new Array();
  let Amounts = new Array();
  let feeOptions = new Array();

  // set the ChainValue
  useEffect(() => {
    if (!isHandleChange) {
      console.log("setChainValue");
      if (getChainNameSession()) {
        setChainValue(getChainNameSession());
        form.setFieldsValue({ chain: getChainNameSession() });
        if (getChainNameSession() === "bsc") {
          setImgUrl(bnbImg);
        } else if (getChainNameSession() === "polygon") { 
          setImgUrl(polygonImg);
        }
      } else {
        form.setFieldsValue({ chain: "polygon" });
      }
    }
  });

  /**
   * chain默认值是BSC,首次加载从utils/crypto_address.json配置文件中把BSC的token address取出来
   * set BSC or Polygon on web display
   */
  useEffect(() => {
    let valueParam = "";
    if (getChainNameSession()) {
      valueParam = getChainNameSession();
    } else {
      valueParam = "polygon";
    }
    const cryptoChainAddressKey = `${valueParam.toLowerCase()}_token_address`;
    const cryptoChainAddressValue = cryptoAddress[cryptoChainAddressKey];
    form.setFieldsValue({ tokenAddress: cryptoChainAddressValue });
  });

  // set chainList & TableColumns
  useEffect(() => {
    const list = [
      {value: 'polygon', name: 'polygon'},
      {value: 'bsc', name: 'bsc'}
    ]
    setChainList(list);
        
    const tableColumns = [
      {title: 'Address', dataIndex: 'address', key: 'address',},
      {title: 'No.', dataIndex: 'no', key: 'no',},
      {title: 'Notes', dataIndex: 'notes', key: 'notes',}
    ];
    setTableColumns(tableColumns);
  },[]);

  //set sourceData
  useEffect(() => {
    if(sourceData.length === 0) return;
    const data = sourceData.map((item, key) => {
      return {
        key: key,
        address: item[0],
        no: item[1],
        notes: item[2]
      }
    });
    setTableData(data);
    
  },[sourceData]);

  // const for chainview options
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
      form.setFieldsValue({ tokenAddress: cryptoChainAddressValue });
    }, 100);
    //checkIfWalletIsConnected(value, false);
    console.log("handleChange");
    connectWallet()
    //window.location.reload();
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

  // 第二个单选change事件
  const onChangeRadiosTwo = (e) => {
    setRadiosValueTow(e.target.value);
    if (e.target.value === 1) {
      const optionBSC = {
        gasLimit: maxLength.highGasLimitBSC,
        gasPrice: ethers.utils.parseUnits(maxLength.highGasPriceBSC, 'gwei')
      };
      setFeeOptionsBSC(optionBSC);
      const optionPolygon = {
        gasLimit: maxLength.highGasLimitBSCPolygon,
        gasPrice: ethers.utils.parseUnits(maxLength.highGasPricePolygon, 'gwei')
      };
      setFeeOptionsPolygon(optionPolygon);
    } else {
      const optionBSC = {
        gasLimit: maxLength.lowGasLimitBSC,
        gasPrice: ethers.utils.parseUnits(maxLength.lowGasPriceBSC, 'gwei')
      };
      setFeeOptionsBSC(optionBSC);
      const optionPolygon = {
        gasLimit: maxLength.lowGasLimitPolygon,
        gasPrice: ethers.utils.parseUnits(maxLength.lowGasPricePolygon, 'gwei')
      };
      setFeeOptionsPolygon(optionPolygon);
    }
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
        const sortingFormatResult = sortingFormat(targetNum);
        if (sortingFormatResult.length > 0) {
          if (sortingFormatResult.length <= maxLength.maxLengthByCSVCrypto) {
            for (let i = 0; i < sortingFormatResult.length; i++) {
              for (let j = 0; j < sortingFormatResult.length; j++) {
                if (i !== j && sortingFormatResult[i][0] === sortingFormatResult[j][0]) {
                  setRequiredByCsvValue(language["sendToolCrypto.verify.wallet.addressfail.same"]);
                  setRequiredByCsv(true);
                  return;
                }
              }
              if (sortingFormatResult[i].length > 3) {
                setRequiredByCsvValue(language["sendToolCrypto.verify.all.column.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (sortingFormatResult[i][0].trim().substr(0, 2) != "0x" || sortingFormatResult[i][0].trim().length != 42) {
                setRequiredByCsvValue(language["sendToolCrypto.verify.first.column.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (Object.is(NaN, Number(sortingFormatResult[i][1]))) {
                setRequiredByCsvValue(language["sendToolCrypto.verify.second.column.notNumber.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (Number(sortingFormatResult[i][1]) < 1 || Number(sortingFormatResult[i][1]) > maxLength.maxTokenToSend) {
                setRequiredByCsvValue(language["sendToolCrypto.verify.second.column.offLimits.fail"]);
                setRequiredByCsv(true);
                return;
              }
              if (sortingFormatResult[i][2]) {
                if (sortingFormatResult[i][2].length > maxLength.maxNoteLength) {
                  setRequiredByCsvValue(language["sendToolCrypto.verify.third.column.offLimits.fail"]);
                  setRequiredByCsv(true);
                  return;
                }
              }
            }
          } else {
            setRequiredByCsvValue(maxLength.maxLengthByCSVCrypto + language["sendToolCrypto.verify.maxLength50.column.fail"]);
            setRequiredByCsv(true);
            return;
          }
        } else {
          setRequiredByCsvValue(language["sendToolCrypto.verify.all.column.fail"]);
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

  // handle CSV file
  const sortingFormat = (targetNum) => {
    let sum = 0;
    const csvData = targetNum.split(/\n/).map(item => {
      return item.split('|')
    }).filter(item => {
      return item[0].length !== 0;
    });
    csvData.forEach(item => {
      sum += Number(item[1]);
    })
    setSourceData(csvData);
    setSourceDataRecords(csvData.length);
    setSourceDataSumNo(sum);
    return csvData;
  };

  // Connect Wallet
  const connectWallet = async () => {
      try {
        const web3Provider = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(web3Provider);
        const signer = provider.getSigner();
        const chainId = await provider.getNetwork();
        const accounts = await provider.listAccounts();
        setweb3Provider(web3Provider);
        setProvider(provider);
        setSigner(signer);
        setChainId(chainId);

        if (accounts.length !== 0) {
          let valueParam = "";
          if (getChainNameSession()) {
            valueParam = getChainNameSession();
          } else {
            valueParam = "polygon";
          }
          const account = accounts[0];
          setCurrentAccount(account);
          //const tokenAddressKey = `${chainValue.toLowerCase()}_token_address`;
          const tokenAddressKey = `${valueParam.toLowerCase()}_token_address`;
          const tokenAddress = cryptoAddress[tokenAddressKey];
          setTokenAddress(tokenAddress);

          //const contractAddressKey = `${chainValue.toLowerCase()}_sc_address`;
          const contractAddressKey = `${valueParam.toLowerCase()}_sc_address`;
          const contractAddress = cryptoAddress[contractAddressKey];

          const cryptoChainIdKey = `${valueParam.toLowerCase()}_chain_id`;
          const cryptoChainIdValue = cryptoAddress[cryptoChainIdKey];

          console.log("chainValue, %s", chainValue);
          console.log("chainId, %s", chainId.chainId);
          console.log("valueParam, %s", valueParam);
          console.log("tokenAddress, %s", tokenAddress);
          console.log("contractAddress, %s", contractAddress);
          console.log("cryptoChainIdValue, %s", cryptoChainIdValue);
          console.log("account, %s", account);

          //var str = JSON.stringify(signer);
          console.log(signer);


          if (chainId.chainId != cryptoChainIdValue) {
            setIsChainId(false);
            notification["error"]({
              message: language["notification.error.message"],
              description: language["sendToolCrypto.connectWallet.function.MetamaskChainID&chainId.inconformity"]
            });
          } else {
            setIsChainId(true);
          }
          
          const airdropContract = new ethers.Contract(contractAddress, contractABI, signer);
          setAirdropContract(airdropContract);
          const tokenContract = new ethers.Contract(tokenAddress, tokencontractABI, signer);
          setTokenContract(tokenContract);

          console.log("tokenContract, %s", tokenContract.inputs);

          setCurrentBalance(0);
          setIsBalance(false);
          const balance = await tokenContract.balanceOf(account);
          setCurrentBalance(Number(balance.toString()) / 1000000000000000000); 
          if (Number(balance.toString()) / 1000000000000000000 <= 0) {
            notification["error"]({
              message: language["notification.error.message"],
              description: language["sendToolCrypto.connectWallet.function.balanceNotZero"]
            });
          } else {
            setIsBalance(true);
          }

          console.log("balance, %s", balance);

          const allowance = await tokenContract.allowance(account,contractAddress);
          if (allowance == 0) {
              const approve_result = await tokenContract.approve(
                  contractAddress,
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                );
          }

        } else {
          console.log("No authorized account found")
        }
      } catch (error) {
        console.log(error);
      }
  };

  // refreshState for WalletConnect
  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  // disconnect for WalletConnect
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  // ConnectWallet after refresh window
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);


  // detect for walletconnect changes
  useEffect(() => {  
    if (web3Provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("account changed");
        window.location.reload();
      };

      const handleChainChanged = (_hexChainId) => {
        console.log("chain changed");
        console.log ("Chain ID: %s", (parseInt(_hexChainId, 16)));
        window.location.reload();
      };

      const handleDisconnect = () => {
        //console.log("disconnect", error);
        console.log("Disconnect");
        disconnect();
      };

      web3Provider.on("accountsChanged", handleAccountsChanged);
      web3Provider.on("chainChanged", handleChainChanged);
      web3Provider.on("disconnect", handleDisconnect);

      return () => {
        if (web3Provider.removeListener) {
          web3Provider.removeListener("accountsChanged", handleAccountsChanged);
          web3Provider.removeListener("chainChanged", handleChainChanged);
          web3Provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  // init data
  const init = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        for (var i = 0; i < sourceData.length; i++) {
          Addresses.push(sourceData[i][0]);
          //Amounts.push(sourceData[i][1]); 
          Amounts.push(ethers.utils.parseUnits(sourceData[i][1], 18));              
        }
         console.log("Addresses: ",Addresses);
         console.log("Amounts: ", Amounts);
      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // set time format
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

  // airdrop actions
  const airDrop = async () => {
    await init();
    console.log('From Airdrop', await airdropContract.owner()); 
    try {
      console.log('Airdrop started');
      console.log("Airdrop tokenAddress:",  tokenAddress);
      console.log("Airdrop Addresses:",  Addresses);
      console.log("Airdrop Amounts:",  Amounts);
      if (formData.chain.toLowerCase() === "bsc")
      {
        feeOptions = {...feeOptionsBSC};
      }else{
        feeOptions = {...feeOptionsPolygon};
      }
      console.log("Airdrop feeOptions:",  feeOptions);
      let r = await airdropContract.dropTokens(tokenAddress,Addresses,Amounts,feeOptions);
      console.log(r);
      if (r.hash !== "") {
      //if (1){
        let params = [];
        sourceData.forEach(item => {
          const itemData = {};
          itemData.user = getUserSession();
          itemData.sendTime = timeFormat(new Date().getTime());
          itemData.chain = formData.chain;
          itemData.tokenAddress = formData.tokenAddress;
          itemData.walletAddress = item[0];
          itemData.tokenNo = parseInt(item[1]);
          itemData.gasPrice = feeOptions.gasPrice._hex.toString(16)/1000000000;
          itemData.gasLimit = feeOptions.gasLimit;
          itemData.note = item[2];
          itemData.txnHash = r.hash;
          itemData.success = "1";
          params.push(itemData);
        })
        crypto(getUserSession(), params)
        .then(response => response.json())
        .then(response => {
          const hubRadiosValueOne = RadiosValueOne;
          setRadiosValueOne(-1);
          setRadiosValueOne(hubRadiosValueOne);
          setSourceData([]);
          setTableData([]);
          setIsSendDisable(true);
          form.setFieldsValue({ textarea: '' });

          notification["success"]({
            message: language["notification.success.message"],
            description: language["sendToolCrypto.crypto[POST].api.success.pass"]
          });
        })
        .catch(err => {
          notification["error"]({
            message: language["sendToolCrypto.crypto[POST].api.error"],
            description: err.toString(),
          });
        })
        setIsAirDrop(false);
        notification["success"]({
          message: language["notification.success.message"],
          description: language["sendToolCrypto.airDrop.function.success"]
        });
      } else {
        notification["error"]({
          message: language["notification.error.message"],
          description: language["sendToolCrypto.airDrop.function.error"]
        });
      }
      setIsModalVisible(false);
      console.log("Allocation + transfer was successful.", r.gasUsed, "gas used. Spent:", r.gasUsed * gasPrice, "wei");
      // write records on DB
    }
    catch (err) {
      console.log(err);
      //not handle for this error
      if (err != "ReferenceError: gasPrice is not defined"){
        
        navigate("/");
        notification["error"]({
          message: language["sendToolCrypto.airDrop.function.AirdropContract.dropTokens.api.error"],
          description: err.toString(),
        });
      }
      setIsModalVisible(false);
    }
    Addresses.splice(0, Addresses.length);
    Amounts.splice(0, Amounts.length);
    console.log('Airdrop done.')
    return;
  }

  // handle OK button is pressed
  const handleOk = async () => {
    setIsAirDrop(true);
    airDrop();
  };

  // handle Cancel button is pressed
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
      if (sortingFormatResult.length <= maxLength.maxLengthByInputCrypto) {
        for (let i = 0; i < sortingFormatResult.length; i++) {
          for (let j = 0; j < sortingFormatResult.length; j++) {
            if (i !== j && sortingFormatResult[i][0] === sortingFormatResult[j][0]) {
              setIsSendDisable(true);
              return Promise.reject(language["sendToolCrypto.verify.wallet.addressfail.same"]);
            }
          }
          if (sortingFormatResult[i].length > 3) {
            setIsSendDisable(true);
            return Promise.reject(maxLength.maxLengthByInputCrypto + language["sendToolCrypto.verify.maxLength50.column.fail"]);
          }
          if (sortingFormatResult[i][0].trim().substr(0, 2) != "0x" || sortingFormatResult[i][0].trim().length != 42) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolCrypto.verify.first.column.fail"]);
          }
          if (Object.is(NaN, Number(sortingFormatResult[i][1]))) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolCrypto.verify.second.column.notNumber.fail"]);
          }
          if (Number(sortingFormatResult[i][1]) < 1 || Number(sortingFormatResult[i][1]) > maxLength.maxTokenToSend) {
            setIsSendDisable(true);
            return Promise.reject(language["sendToolCrypto.verify.second.column.offLimits.fail"]);
          }
          if (sortingFormatResult[i][2]) {
            if (sortingFormatResult[i][2].length > maxLength.maxNoteLength) {
              setIsSendDisable(true);
              return Promise.reject(language["sendToolCrypto.verify.third.column.offLimits.fail"]);
            }
          }
        }
        setIsSendDisable(false);
        return Promise.resolve();
      } else {
        setIsSendDisable(true);
        return Promise.reject(maxLength.maxLengthByInputCrypto + language["sendToolCrypto.verify.maxLength50.column.fail"]);
      }
    } else {
      setIsSendDisable(true);
      return Promise.reject(language["sendToolCrypto.verify.all.column.fail"]);
    }
  }

  // Upload 组件 上传中、完成、失败都会调用这个函数
  const onChangeUpload = (info) => {
    if (info.fileList.length !== 1) {
      setIsSendDisable(true);
    }
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
          radioTwo: 1,
          textarea: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row align="middle">
          <Col span={24}>{language["sendToolCrypto.col.content.LoginAccount"]} {currentAccount}</Col>
          <Col span={24} style={{marginBottom: 20}}>{language["sendToolCrypto.col.content.TokenBalance"]} {currentBalance}</Col>
          <Col span={6}>
            <Form.Item
              label={language["sendToolCrypto.form.label.Chain"]}
              name="chain"
            >
              <Select
                placeholder="Please Select"
                onChange={handleChange}
                disabled={currentAccount === "" ? true : false}
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
              label={language["sendToolCrypto.form.label.TokenAddress"]}
              name="tokenAddress"
              tooltip={{ title: language["sendToolCrypto.tooltip.tokenAddress"], icon: <InfoCircleOutlined /> }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={language["sendToolCrypto.form.label.Contents"]}
          name="radioOne"
          tooltip={{ title: language["sendToolCrypto.tooltip.Contents"], icon: <InfoCircleOutlined /> }}
        >
          <Radio.Group onChange={onChangeRadiosOne} value={RadiosValueOne}>
            <Space>
              <Radio value={1} disabled={(currentAccount === "") || !isChainId || !isBalance ? true : false}>
                {language["sendToolCrypto.send.by.CSV.prefix"] + maxLength.maxLengthByCSVCrypto + language["sendToolCrypto.send.by.CSV.suffix"]}
              </Radio>
              <Radio value={2} disabled={(currentAccount === "") || !isChainId || !isBalance ? true : false}>
                {language["sendToolCrypto.send.by.Input.prefix"] + maxLength.maxLengthByInputCrypto + language["sendToolCrypto.send.by.Input.suffix"]}
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {
          RadiosValueOne === 1 &&
          <Form.Item>
            <Row align="middle">
              <Col>
                <Upload {...uploadArmProps} onChange={onChangeUpload}>
                  <Button type="params" icon={<UploadOutlined />} disabled={(currentAccount === "") || !isChainId || !isBalance ? true : false}>
                    {language["sendToolCrypto.buttom.content.ChooseFile"]}
                  </Button>
                </Upload>
                {requiredByCsv ? (<div style={{color: '#ff4d4f', marginTop: '10px'}}>{requiredByCsvValue}</div>) : ''}
              </Col>
              <Col style={{marginLeft: 30}}>
                <a href="/sample_crypto.csv" style={{ color: '#012FF8', fontWeight: '600', textDecoration: 'underline',}}>
                  {language["sendToolCrypto.buttom.content.DownloadSampleFile"]}
                </a>
              </Col>
            </Row>
          </Form.Item>
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
              disabled={(currentAccount === "") || !isChainId || !isBalance ? true : false}
              placeholder="0x1f6A403347fd2d335d14Dc3f1AEb21D9192cF166|3|Peter rewards &#13;&#10;0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab|10|Amy compensations &#13;&#10;0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9|3|Johnny gift"
            />
          </Form.Item>
        }

        <Form.Item
          label={language["sendToolCrypto.form.label.TransactionFee"]}
          name="radioTwo"
          tooltip={{ title: language["sendToolCrypto.tooltip.TransactionFee"], icon: <InfoCircleOutlined /> }}
        >
          <Radio.Group onChange={onChangeRadiosTwo} value={RadiosValueTwo}>
            <Space>
              <Radio value={1} disabled={(currentAccount === "") || !isChainId || !isBalance ? true : false}>
                {language["sendToolCrypto.radio.content.HighGASFee"]}
              </Radio>
              <Radio value={2} disabled={(currentAccount === "") || !isChainId || !isBalance ? true : false}>
                {language["sendToolCrypto.radio.content.LowGASFee"]}
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Row align="bottom">
            <Col>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={(currentAccount === "") || !isChainId || !isBalance || isSendDisable ? true : false}
                >{language["sendToolCrypto.buttom.content.Send"]}</Button>
              </Space>
            </Col>
            {
              (currentAccount === "") || !isChainId || !isBalance || isSendDisable ?
              <Col style={{marginLeft: 30}}>
                <Row>
                  <Col span={24}>{language["sendToolCrypto.send.tooltip.available.when"]}</Col>
                  <Col span={24}>{language["sendToolCrypto.send.tooltip.metamask.connected"]}</Col>
                  <Col span={24}>{language["sendToolCrypto.send.tooltip.metamask.chain"]}</Col>
                  <Col span={24}>{language["sendToolCrypto.send.tooltip.token.balance"]}</Col>
                  <Col span={24}>{language["sendToolCrypto.send.tooltip.CSV.or.inputted"]}</Col>
                </Row>
              </Col>
              : ""
            }
          </Row>
        </Form.Item>

        {!currentAccount && (
          <Form.Item>
          <Space>
              <Button type="primary" onClick={() => connectWallet()}>
              {language["sendToolCrypto.buttom.content.ConnectWallet"]}
            </Button>
          </Space>
        </Form.Item>
        )}
      </Form>

      <Modal
        title="&nbsp;"
        maskClosable={false}
        width="calc(100% - 200px)"
        visible={isModalVisible}
        cancelText={language["sendToolCrypto.Modal.cancelText"]}
        okText={language["sendToolCrypto.Modal.okText"]}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled:( Number(sourceDataSumNo) > Number(currentBalance)) || isAirDrop }}
      >
          <div className="table-view">
            <Table columns={tableColumns} dataSource={tableData} pagination={false} scroll={true}/>
          </div>
          <Row style={{padding: "0 20%"}}>
            <Col span={12}>
              <p className="table-view-left">
                {language["sendToolCrypto.col.content.Total.records"]} {sourceDataRecords}
              </p>
            </Col>
            <Col span={12}>
              <p className="table-view-right">
                {language["sendToolCrypto.col.content.Total.balance"]} {currentBalance}
              </p>
              <p className="table-view-right">
                {language["sendToolCrypto.col.content.Total.tokens"]} {sourceDataSumNo}
              </p>
              {
                Number(sourceDataSumNo) > Number(currentBalance) ?
                <p className="table-view-rightErrorText">
                  {language["sendToolCrypto.col.content.Total.NotEnough"]}
                </p>
                : ""
              }
            </Col>
          </Row>
      </Modal>
    </div>
  );
}

export default Cryptopage