import axios from 'axios';
import Image from 'next/image';
import { Container, Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl, Row, Col, Modal, Link } from 'react-bootstrap';
import styles from '../styles/Nav.module.css';
import { useTranslation } from '../i18n';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getBalance, grabAccount, grabBalance, disconnectAccount } from '../store/actions';
import { getPathname, getHeaders } from '../utils/utils';
import TextOverflowTips from "../components/textOverflowTips/TextOverflowTips";

// apple id login
import { parse } from 'url';
import { useRouter } from 'next/router';

// Web3Modal
import { useWeb3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
//import { configureChains, createClient, WagmiConfig, useAccount, useDisconnect } from 'wagmi'
import { configureChains, createConfig, WagmiConfig, useAccount, useDisconnect } from 'wagmi'
//import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { mainnet, optimism, polygon } from "wagmi/chains"
import { Web3Provider } from "@ethersproject/providers";
import ConfirmModal from './submission/ConfirmModal';
//const chains = [arbitrum, mainnet, polygon]
const chains = [mainnet, optimism, polygon]
const projectId = 'b66462653b390b41e66f8f03e25cfa0a'

//const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
//const wagmiClient = createClient({
const wagmiConfig = createConfig({
  autoConnect: true,
  //connectors: w3mConnectors({ projectId, version: 1, chains }),
  connectors: w3mConnectors({ version: 2, chains, projectId }),
  //provider
  publicClient,
})
//const ethereumClient = new EthereumClient(wagmiClient, chains)
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const NavBar = ({onLocaleChange}) => {
  const apiPort = process.env.API_PORT || '/';
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // apple id
  const [appleIdLoginBtn, setAppleIdLoginBtn] = useState('');
  const [appleId, setAppleId] = useState('');
  const [appleIdName, setAppleIdName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const currentUrl = router.asPath;
  const { query } = parse(currentUrl, true);
  const [isAppleIdLogin, setIsAppleIdLogin] = useState(false);

  useEffect(() => {
    const pathname = getPathname();
    if(!pathname) return;
    window.location.href= pathname;
    sessionStorage.removeItem("pathname");
  }, []);

  useEffect(() => {
    const appleId = sessionStorage.getItem("appleId");
    setIsAppleIdLogin(false);
    if(!appleId){
      setIsAppleIdLogin(false);
      if(!query.appleId) return;
      getQuery();
    }else{
      setIsAppleIdLogin(true);
      const email = sessionStorage.getItem("email");
      const appleIdName = sessionStorage.getItem("appleIdName");
      setAppleId(appleId);
      setAppleIdName(appleIdName);
      setEmail(email);
      if(!query.appleId) return;
      getQuery();
    }
  }, []);

  useEffect(() => {
    if(isModalVisible) return;
    setLoadingWallet(false);
  }, [isModalVisible]);
  
  const getQuery = () => {
    setAppleId(query.appleId);
    setAppleIdName(query.firstName + ' ' + query.lastName)
    setEmail(query.email);
    sessionStorage.setItem("access_token", query.access_token);
    sessionStorage.setItem("expires_in", query.expires_in);
    sessionStorage.setItem("email", query.email);
    sessionStorage.setItem("refresh_token", query.refresh_token);
    sessionStorage.setItem("appleId", query.appleId);
    sessionStorage.setItem("appleIdName", query.firstName + ' ' + query.lastName);
    setIsAppleIdLogin(true);
  }

  const signInOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleClose = () => {
    setIsModalVisible(false);
  }

  const handleAppleSignOut = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("expires_in");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("appleId");
    sessionStorage.removeItem("appleIdName");
    router.push('/');
    setIsAppleIdLogin(false);
  }

  // Web3Modal
  const [loadingWallet, setLoadingWallet] = useState(false);
  const { open } = useWeb3Modal();
  //const { isConnected } = useAccount();
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect(); 

  //console.log("walletn address: ", address);

  useEffect(async () => {
    if(!isConnected){
      sessionStorage.removeItem("walletAddress");
      return;
    }
    handleGetWalletInfo();
  }, [isConnected]);

  const onOpen = async () => {
    setLoadingWallet(true);
    await open();
  }

  const connectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  // 获取钱包地址信息并记录在 session 中
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const handleGetWalletInfo = async () => {
    console.log("ethereumClient: ", ethereumClient);
    console.log("address: ", address)
   
    //const { walletAddress, isConnecting, isDisconnected } = useAccount();
    //console.log("wallet address: ", walletAddress);

    //const provider = new Web3Provider(window.ethereum);
    //const instance = await web3Modal.openModal();
    //const provider = new Web3Provider(instance);
    //const signer = provider.getSigner();
    //const address = await signer.getAddress();
    setWalletAddress(address);
    sessionStorage.setItem("walletAddress", address);
    setLoadingWallet(false);
    setIsConnectingWallet(true);
  };

  useEffect(async () => {
    if(!appleId || !walletAddress) return;
    if(!isConnectingWallet) return;
    await axios.post(`${apiPort}/mindfulapi/app/updatewallet/${appleId}/${walletAddress}`, {}, {headers: getHeaders()})
    .then(res => {
      if(!res.data.message){
        if (confirm(res.data)) {
          disconnect();
        }
      }

    })
    .catch(err => {
      console.log(err)
    });
    setIsConnectingWallet(false);
  }, [appleId, walletAddress, isConnectingWallet]);

  useEffect(async () => {
    const res = await axios.get(`${apiPort}/mindfulapi/app/applelogin`);
    setAppleIdLoginBtn(res.data);
  }, []);

  // useEffect(async() => {
  //   await dispatch(getAccount());
  //   await dispatch(getBalance());
  //   window.ethereum.on("accountsChanged", (accounts) => {
  //       dispatch(getAccount());
  //       dispatch(getBalance());
  //     });
  // },[dispatch])

  // const connect = async() => {
  //   await dispatch(grabAccount());
  //   await dispatch(grabBalance());
  // }
  
  //didn't work
  // const disconnect = async() => {
  //   dispatch(disconnectAccount());
  // }

  const { t, locale } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(locale);
  const [lang, setLang] = useState('');
  const changeLanguage = (newLocale) => {
    setSelectedLanguage(newLocale);
    localStorage.setItem('lang', newLocale);
    onLocaleChange(newLocale);
    // router.reload();
  };

  useEffect(() => {
    if(locale === 'en'){
      setLang(t('lang.en'))
    }
    if(locale === 'ch'){
      setLang(t('lang.ch'))
    }
    if(locale === 'tw'){
      setLang(t('lang.tw'))
    }
  },[locale])

  return (
    <Navbar collapseOnSelect fixed="top" expand='xl' className={`p-3 ${styles.bg}`}>
    <Container fluid className={styles.container}>
    <Navbar.Brand href="/">
        <Image
            src='/logo.svg'
            width="110"
            height="30"
            className="d-inline-block align-top"
            alt="mindful ocean logo"
        />
    </Navbar.Brand>       
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse id='responsive-navbar-nav'>
      
    <Nav className="me-auto">
        <Nav.Link href="#about" className={styles.navlink}>{t('nav.about')}</Nav.Link>
        <Nav.Link href="#gallery" className={styles.navlink}>{t('nav.gallery')}</Nav.Link>
        <Nav.Link href="#mobileapp" className={styles.navlink}>{t('nav.create')}</Nav.Link>
        <Nav.Link href="#mintpass" className={styles.navlink}>{t('nav.mintpass')}</Nav.Link>
        <Nav.Link href="#redeem" className={styles.navlink}>{t('nav.redeem')}</Nav.Link>
        <Nav.Link href="#donate" className={styles.navlink}>{t('nav.donate')}</Nav.Link>
        {/* <Nav.Link href="#mindfultoken" className={`text-nowrap ${styles.navlink}`}>{t('nav.mindfulToken')}</Nav.Link> */}
    </Nav>
    <Nav>
      <Col lg={3} xl={4} className='mt-1 me-1'>
          <Form>
              <InputGroup className="">
                  <InputGroup.Text style={{color: '#005D6C', border: '1px solid #005D6C', backgroundColor: 'none'}} id="subscribe" type="submit"><i className="far fa-envelope"></i></InputGroup.Text>
                  <FormControl id="subscribe" placeholder={t('input.placeholder.email')} style={{border: '1px solid #005D6C'}} />
              </InputGroup>
          </Form>
      </Col>
      <Col lg={3} xl={4} className='mt-1 me-1'>
          <Dropdown className="">
              <Dropdown.Toggle className={styles.dropdownBtn} id="language">
                  {lang}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage('en')}>{t('lang.en')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ch')}>{t('lang.ch')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('tw')}>{t('lang.tw')}</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
      </Col>
      <Col lg={3} xl={4} className='mt-1 me-1'>
        <Button onClick={signInOpenModal} className={styles.dropdownBtn}>{t('button.signIn')}</Button> 
      </Col>
      {/* <Col lg={4} className='mt-1 ms-2'>
          {(account) ?
              <Dropdown className="">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="connect">
                      {account.slice(0,5).concat('...').concat(account.slice(-4))}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item href="#/balance">{balance} MATIC</Dropdown.Item>
                      <Dropdown.Item href="#/disconnect" onClick={disconnect}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown> :
              <Button onClick={connect} className={homeStyles.btn} style={{borderRadius: '15px'}}><Image src="/metamask.png" width="15px" height="15px" alt="metamask icon" />&nbsp;Connect wallet</Button> 
          }  
      </Col> */}
      <Modal
        show={isModalVisible}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
            <Modal.Title>{t('main.text.signIn')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='mb-12'>
                <Col xs={12} md={10} className="offset-sm-0 offset-md-1">
                  {isAppleIdLogin ? 
                      <>
                        <div>{t('main.text.apple')}</div>
                        <Button className={styles.signInBtn2} onClick={handleAppleSignOut}>
                          <Image src="/close.png" width="15px" height="15px" />&nbsp;&nbsp;
                          <TextOverflowTips text={appleIdName} />
                        </Button>
                      </>
                    : 
                    <Button className={styles.signInBtn}>
                      <div dangerouslySetInnerHTML={{__html: appleIdLoginBtn}}></div>
                    </Button>
                  }
                </Col>
                <Col xs={12} md={10} className="offset-sm-0 offset-md-1">
                  {isConnected ? 
                    <>
                      <div>{t('main.text.walletContect')}</div> 
                      <Button className={styles.signInBtn2} onClick={connectWallet}>
                        <Image src="/close.png" width="15px" height="15px" />&nbsp;&nbsp;
                        <TextOverflowTips text={walletAddress} />
                      </Button>
                    </>
                    : 
                    <Button className={styles.signInBtn} onClick={connectWallet} disabled={loadingWallet || !isAppleIdLogin}>{loadingWallet ? "Loading..." : 'Connect Wallet'}</Button>
                  }
                  {/* <Web3Button /> */}
                </Col>
                <Col xs={12} md={10} className="offset-sm-0 offset-md-1">
                    <Button href="/userProfile" className={!isConnected || !isAppleIdLogin ? styles.signInBtnDisabled : styles.signInBtn} disabled={!isConnected || !isAppleIdLogin}>{t('button.viewMyProfile')}</Button>
                </Col>
            </Row>
        </Modal.Body>
      </Modal>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}

function App({onLocaleChange}) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
          <NavBar onLocaleChange={onLocaleChange} />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-z-index': '9999'
        }}
      />
    </>
  )
}

export default App;