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
import ModalFormEmailverification from "./modalFormEmailverification";
import ModalFormEmailverificationExpired from "./modalFormEmailverificationExpired";
import ModalFormEmailverificationNotfound from "./modalFormEmailverificationNotfound";
import ModalFormAccountDisabled from "./modalFormAccountDisabled";

// apple id login
import { parse } from 'url';
import { useRouter } from 'next/router';

// Web3Modal
import { useWeb3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { configureChains, createConfig, WagmiConfig, useAccount, useDisconnect } from 'wagmi'
import { polygon, polygonMumbai } from "viem/chains"
import ConfirmModal from './submission/ConfirmModal';

var chains; 

if (process.env.chain == "PolygonMainnet"){
  chains = [polygon];
} else if (process.env.chain == "MumbaiTestnet"){
  chains = [polygonMumbai];
}

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
  const apiPort = process.env.APIBaseUrl || '/';
  const { query: { from } } = useRouter();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [visibleFormEmailverification, setVisibleFormEmailverification] = useState(false);
  const [visibleFormEmailverificationExpired, setVisibleFormEmailverificationExpired] = useState(false);
  const [visibleFormEmailverificationNotfound, setVisibleFormEmailverificationNotfound] = useState(false);
  const [visibleFormAccountDisabled, setVisibleFormAccountDisabled] = useState(false);

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
    if (!from || from !== 'emailverification') return
    setVisibleFormEmailverification(true)
  }, [from])

  useEffect(() => {
    if (!from || from !== 'emailverificationexpired') return
    setVisibleFormEmailverificationExpired(true)
  }, [from])

  useEffect(() => {
    if (!from || from !== 'emailverificationnotfound') return
    setVisibleFormEmailverificationNotfound(true)
  }, [from])

  useEffect(() => {
    if (!from || from !== 'accountdisabled') return
    setVisibleFormAccountDisabled(true)
  }, [from])  

  useEffect(() => {
    const pathname = getPathname();
    if (!pathname) return;
    window.location.href = pathname;
    localStorage.removeItem("pathname");
  }, []);

  useEffect(() => {
    const appleId = localStorage.getItem("appleId");
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
      const email = localStorage.getItem("email");
      const appleIdName = localStorage.getItem("appleIdName");
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
    localStorage.setItem("access_token", query.access_token);
    localStorage.setItem("expires_in", query.expires_in);
    localStorage.setItem("email", query.email);
    localStorage.setItem("refresh_token", query.refresh_token);
    localStorage.setItem("appleId", query.appleId);
    localStorage.setItem("appleIdName", query.firstName + ' ' + query.lastName);
    localStorage.setItem("appleIdFristName", query.firstName);
    localStorage.setItem("appleIdLastName", query.lastName);
    setIsAppleIdLogin(true);
  }

  const signInOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleClose = () => {
    setIsModalVisible(false);
  }

  const handleAppleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("email");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("appleId");
    localStorage.removeItem("appleIdName");
    localStorage.removeItem("appleIdFristName");
    localStorage.removeItem("appleIdLastName");
    router.push('/');
    setIsAppleIdLogin(false);
    setAppleIdName('')
  }

  // Web3Modal
  const [loadingWallet, setLoadingWallet] = useState(false);
  const { open, isOpen } = useWeb3Modal();
  //const { isConnected } = useAccount();
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect();

  //console.log("walletn address: ", address);

  useEffect(async () => {
    if (!isConnected) {
      localStorage.removeItem("walletAddress");
      return;
    }
    handleGetWalletInfo();
  }, [isConnected]);

  useEffect(async () => {
    if (isOpen) return
    setLoadingWallet(false);
  }, [isOpen]);


  const onOpen = async () => {
    setIsModalVisible(false);
    //setLoadingWallet(true);
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
    console.log("address: ", address)
    setWalletAddress(address);
    localStorage.setItem("walletAddress", address);
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
    handleAppleSignOut();
  }

  const handleEmailCancel = () => {
    setVisibleEmail(false);
  }

  const handleFormEmailverificationOk = () => {
    setVisibleFormEmailverification(false);
    signInOpenModal();
  }

  const handleFormEmailverificationCancel = () => {
    setVisibleFormEmailverification(false);
  }

  const handleFormEmailverificationExpiredOk = () => {
    setVisibleFormEmailverificationExpired(false);
    signInOpenModal();
  }

  const handleFormEmailverificationNotfoundOk = () => {
    setVisibleFormEmailverificationNotfound(false);
    signInOpenModal();
  }

  const handleFormAccountDisabledOk = () => {
    setVisibleFormAccountDisabled(false);
  }

  const handleFormAccountDisabledCancel = () => {
    setVisibleFormAccountDisabled(false);
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
          <Nav className="me-auto">
            <Nav.Link href="#about" className={styles.navlink}>{t('nav.about')}</Nav.Link>
            <Nav.Link href="#gallery" className={styles.navlink}>{t('nav.gallery')}</Nav.Link>
            <Nav.Link href="#game" className={styles.navlink} style={{ position: 'relative' }}> {t('nav.game')} <span className={styles.newBadge}>NEW</span> </Nav.Link>
            <Nav.Link href="#mintpass" className={styles.navlink}>{t('nav.mintpass')}</Nav.Link>
            <Nav.Link href="#redeem" className={styles.navlink}>{t('nav.redeem')}</Nav.Link>
            <Nav.Link href="/faq" className={styles.navlink}>{t('nav.faq')}</Nav.Link>
          </Nav>
          <Row className='nav_right'>
            <Col lg={6} md={6} style={{ textAlign: 'right' }}>
            /*
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
            */
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
                      <Button className={styles.signInBtn} onClick={connectWallet} disabled={loadingWallet || !isAppleIdLogin}>{loadingWallet ? "Loading..." : t('main.text.connectWallet')}</Button>
                    }
                    {/* <Web3Button /> */}
                  </Col>
                  <Col xs={12} md={10} className="offset-sm-0 offset-md-1">
                    <Button href="/userProfile" className={!isConnected || !isAppleIdLogin ? styles.signInBtnDisabled : styles.signInBtn} disabled={!isConnected || !isAppleIdLogin}>{t('button.viewMyProfile')}</Button>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
            <ModalFirstLogin
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
            />
            <ModalFormEmailverification
              t={t}
              show={visibleFormEmailverification}
              onOk={handleFormEmailverificationOk}
              onCancel={handleFormEmailverificationCancel}
            />
            <ModalFormEmailverificationExpired
              t={t}
              show={visibleFormEmailverificationExpired}
              onOk={handleFormEmailverificationExpiredOk}
            />
            <ModalFormEmailverificationNotfound
              t={t}
              show={visibleFormEmailverificationNotfound}
              onOk={handleFormEmailverificationNotfoundOk}
            />
            <ModalFormAccountDisabled
              t={t}
              show={visibleFormAccountDisabled}
              onOk={handleFormAccountDisabledOk}
              onCancel={handleFormAccountDisabledCancel}
            />
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
      <ComponentsCookieConsent />
    </>
  )
}

export default App;
