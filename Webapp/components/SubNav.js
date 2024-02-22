import axios from 'axios';
import Image from 'next/image';
import { Container, Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl, Row, Col, Modal, Link } from 'react-bootstrap';
import styles from '../styles/Nav.module.css';
import { useTranslation } from '../i18n';
import { Cookies, getCookieConsentValue } from "react-cookie-consent";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getBalance, grabAccount, grabBalance, disconnectAccount } from '../store/actions';
import { getPathname, getHeaders } from '../utils/utils';
import TextOverflowTips from "../components/textOverflowTips/TextOverflowTips";
import LongContentTooltip from "../components/longContentTooltip";
import ModalFirstLogin from "./modalFirstLogin";
import ModalCookies from "./modalCookies";
import ComponentsCookieConsent from '../components/componentsCookieConsent';
import ModalEmailVerification from "./modalEmailVerification";

// apple id login
import { parse } from 'url';
import { useRouter } from 'next/router';

// Web3Modal
import { useWeb3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { configureChains, createConfig, WagmiConfig, useAccount, useDisconnect } from 'wagmi'
import { polygon } from "viem/chains"
import ConfirmModal from './submission/ConfirmModal';

const chains = [polygon]
const projectId = process.env.WalletconnectProjectId;

const metadata = {
  name: 'MindfulOcean',
  description: 'MindfulOcean Metaverse',
  url: 'www.walletconnect.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

const NavBar = ({ onLocaleChange }) => {
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);

  // apple id
  const [appleIdLoginBtn, setAppleIdLoginBtn] = useState('');
  const [appleId, setAppleId] = useState('');
  const [appleIdName, setAppleIdName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const currentUrl = router.asPath;
  const { query } = parse(currentUrl, true);
  const [isAppleIdLogin, setIsAppleIdLogin] = useState(false);
  const [isCookies, setIsCookies] = useState(false);

  useEffect(() => {
    const pathname = getPathname();
    if (!pathname) return;
    window.location.href = pathname;
    sessionStorage.removeItem("pathname");
  }, []);

  useEffect(() => {
    const appleId = sessionStorage.getItem("appleId");
    setIsAppleIdLogin(false);
    if (!appleId) {
      console.log(query)
      setIsAppleIdLogin(false);
      if (!query.appleId) return;
      getQuery();
      // 第一次登录appleId
      if (query.firstTime === '1') {
        setIsFirstLogin(true);
        // setIsCookies(true);
      }
    } else {
      setIsAppleIdLogin(true);
      const email = sessionStorage.getItem("email");
      const appleIdName = sessionStorage.getItem("appleIdName");
      setAppleId(appleId);
      setAppleIdName(appleIdName);
      setEmail(email);
      if (!query.appleId) return;
      getQuery();
    }
  }, []);

  useEffect(() => {
    if (isModalVisible) return;
    setLoadingWallet(false);
  }, [isModalVisible]);

  const getQuery = () => {
    const firstName = query.firstName && query.firstName !== 'null' ? query.firstName : '-';
    const lastName = query.lastName && query.lastName !== 'null' ? query.lastName : '-';
    setAppleId(query.appleId);
    setAppleIdName(firstName + ' ' + lastName)
    setEmail(query.email);
    sessionStorage.setItem("access_token", query.access_token);
    sessionStorage.setItem("expires_in", query.expires_in);
    sessionStorage.setItem("email", query.email);
    sessionStorage.setItem("refresh_token", query.refresh_token);
    sessionStorage.setItem("appleId", query.appleId);
    sessionStorage.setItem("appleIdName", query.firstName + ' ' + query.lastName);
    sessionStorage.setItem("appleIdFristName", query.firstName);
    sessionStorage.setItem("appleIdLastName", query.lastName);
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
    sessionStorage.removeItem("appleIdFristName");
    sessionStorage.removeItem("appleIdLastName");
    router.push('/');
    setIsAppleIdLogin(false);
    setAppleIdName('')
  }

  // Web3Modal
  const [loadingWallet, setLoadingWallet] = useState(false);
  const { open } = useWeb3Modal();
  //const { isConnected } = useAccount();
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect();

  //console.log("walletn address: ", address);

  useEffect(async () => {
    if (!isConnected) {
      sessionStorage.removeItem("walletAddress");
      return;
    }
    handleGetWalletInfo();
  }, [isConnected]);

  const onOpen = async () => {
    //setLoadingWallet(true);
    setIsModalVisible(false);
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
    //console.log("ethereumClient: ", ethereumClient);
    console.log("address: ", address)
    setWalletAddress(address);
    sessionStorage.setItem("walletAddress", address);
    setLoadingWallet(false);
    setIsConnectingWallet(true);
  };

  useEffect(async () => {
    if (!appleId || !walletAddress) return;
    if (!isConnectingWallet) return;
    await axios.post(`${apiPort}/mindfulapi/app/updatewallet/${appleId}/${walletAddress}`, {}, { headers: getHeaders() })
      .then(res => {
        if (!res.data.message) {
          if (confirm(res.data)) {
            disconnect();
          } else {
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
    if (locale === 'en') {
      setLang(t('lang.en'))
    }
    if (locale === 'ch') {
      setLang(t('lang.ch'))
    }
    if (locale === 'tw') {
      setLang(t('lang.tw'))
    }
  }, [locale])

  const handleAccept = (isShow) => {
    setIsFirstLogin(isShow);
    setVisibleEmail(true);
  };

  const handleLogout = () => {
    setIsFirstLogin(false);
    handleAppleSignOut();
  };

  const handleCookiesAcceptAll = () => {
    setIsCookies(false);
  };

  const handleCookiesDeclineAll = () => {
    setIsCookies(false);
  };

  const handleEmailOk = () => {
    setVisibleEmail(false);
    signInOpenModal();
  }

  const handleEmailCancel = () => {
    setVisibleEmail(false);
  }

  return (
    <Navbar collapseOnSelect fixed="top" expand='xl' className={`${styles.bg}`}>
      <Container fluid className={styles.container}>
        <Navbar.Brand href="/">
          <Image
            src='/logo.png'
            width="226"
            height="60"
            className="d-inline-block align-top"
            alt="mindful ocean logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Row className='nav_right'>
            <Col lg={6} xl={6}>
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
            <Col lg={6} md={6}>
              <Button onClick={signInOpenModal} className={styles.signId}>{appleIdName ? <LongContentTooltip content={appleIdName} /> : (t('button.signIn'))}</Button>
            </Col>
            <Modal
              show={isModalVisible}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>{isAppleIdLogin ? '' : (t('main.text.signIn'))}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className='mb-12'>
                  <Col xs={12} md={10} className="offset-sm-0 offset-md-1">
                    {isAppleIdLogin ?
                      <>
                        <div>{t('main.text.appleID')}</div>
                        <Button className={styles.signInBtn2} onClick={handleAppleSignOut}>
                          <Image src="/close.png" width="15px" height="15px" />&nbsp;&nbsp;
                          <TextOverflowTips text={appleIdName} />
                        </Button>
                      </>
                      :
                      <Button className="signInWithApple">
                        <div dangerouslySetInnerHTML={{ __html: appleIdLoginBtn }}></div>
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
            {/* <ModalFirstLogin
              t={t}
              show={isFirstLogin}
              setShow={handleAccept}
              onCancel={handleLogout}
            />
            <ModalCookies
              t={t}
              show={isCookies}
              setShow={handleCookiesAcceptAll}
              onCancel={handleCookiesDeclineAll}
            />
            <ModalEmailVerification
              t={t}
              show={visibleEmail}
              onOk={handleEmailOk}
              onCancel={handleEmailCancel}
            /> */}
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function App({ onLocaleChange }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <NavBar onLocaleChange={onLocaleChange} />
      </WagmiConfig>
      {/* <ComponentsCookieConsent /> */}
    </>
  )
}

export default App;
