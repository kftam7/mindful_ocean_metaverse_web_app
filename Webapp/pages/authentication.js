import { signIn, signOut, getSession } from 'next-auth/react';
import { getAccount, grabAccount, disconnectAccount, postUser } from '../store/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, OverlayTrigger, Button, Tooltip, Container } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from '../i18n';
import { getHeaders } from '../utils/utils';
import { Cookies } from "react-cookie-consent";
import Layout from '../components/SubpageLayout';

// Web3Modal
import { useWeb3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { configureChains, createConfig, WagmiConfig, useAccount, useDisconnect } from 'wagmi'
import { polygon } from "viem/chains"

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

const AuthPage = ({ session }) => {
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const [walletAddress, setWalletAddress] = useState('');
  const [appleId, setAppleId] = useState('');
  const [appleIdLoginBtn, setAppleIdLoginBtn] = useState('');
  const { t } = useTranslation();

  useEffect(async () => {
    await dispatch(getAccount())
  }, [dispatch]);

  const connect = async () => {
    await dispatch(grabAccount());
    // await dispatch(postUser());
  }

  // //didn't work
  const disconnectWallet = () => {
    dispatch(disconnectAccount());
  }

  // Web3Modal
  const { open } = useWeb3Modal();
  //const { isConnected } = useAccount();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(async () => {
    if (!isConnected) {
      localStorage.removeItem("walletAddress");
      setWalletAddress('');
      return;
    }
    handleGetWalletInfo();
  }, [isConnected]);

  const onOpen = async () => {
    await open();
  }

  const connectWallet = async () => {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  // 获取钱包地址信息并记录在 session 中
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const handleGetWalletInfo = async () => {
    setWalletAddress(address);
    localStorage.setItem("walletAddress", address);
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

  // apple id  
  useEffect(async () => {
    const res = await axios.get(`${apiPort}/mindfulapi/app/applelogin`);
    setAppleIdLoginBtn(res.data);
  }, []);

  useEffect(() => {
    const appleId = localStorage.getItem("appleId");
    if (!appleId) {
      setAppleId('');
    } else {
      setAppleId(appleId);
    }
  }, []);

  const connectApple = () => {
    const pathname = window.location.pathname;
    localStorage.setItem("pathname", pathname);
    // Cookies.set("pathname", pathname);
  }

  const disconnectApple = async () => {
    setAppleId('');
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("email");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("appleId");

  }

  return (
    <Container className='mt-5 mb-5' style={{}}>
      {/* <Button onClick={connect}>connect</Button>
      <Button onClick={disconnectWallet}>disconnect Wallet</Button> */}
      <div className={styles.submitPage}>
        <Row><Link href="/"><h6 style={{ cursor: "pointer" }}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
        <Row className="mt-4"><h4>{t('page.mintpass.submitArtwork')}</h4></Row>

        <Row className='mt-4' style={{ fontWeight: '800' }} >
          <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.mintpass.authentication')}</span></div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.mintpass.submission')}</span></div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.mintpass.getMintpas')}</span></div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
        </Row>

        {/* <Row className="mt-5 mb-5">
            <h5 className="mt-1">1. Connect Social</h5>
            {
              session &&
              <Row>
              <Col xs={6}>
                <Button size="lg" className={styles.disactiveBtn}>
                  <i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>
                  <span style={{ fontWeight:'800'}}>&nbsp;Twitter Connected</span>
                </Button>
              </Col>
              <Col xs={6} className='d-flex justify-content-center'>
                <OverlayTrigger overlay={<Tooltip>Disconnect</Tooltip>}>
                  <Button className={styles.activeBtn} onClick={ () => signOut() }>
                  <i className="fa-solid fa-xmark"></i>
                  <span style={{ fontWeight:'800'}}>&nbsp;{session.user.name ?? session.user.email}</span>
                  </Button>
                </OverlayTrigger>
                </Col>
              </Row>
              }
            {
              !session &&
              <Row>
              <Col xs={6}>
                <Button size="lg" className={styles.disactiveBtn} onClick={ () => signIn() }>
                  <Image src="/twitter.png" width="15px" height="15px" alt="twitter icon" />
                  <span style={{ fontWeight:'800'}}>&nbsp;Connect Twitter</span>
                </Button>
              </Col>
              <Col xs={6}>
                <h5 className="mt-2" style={{color: "grey", textAlign: "center"}}>&nbsp;&nbsp;&nbsp;Twitter not connected</h5>
              </Col>
              </Row>
            }
            <Row className='mt-3'>
              <Col xs={6}>
                <OverlayTrigger overlay={<Tooltip>You will need to access images created from Mindful Ocean app which saved under your twitter ID</Tooltip>}>
                  <h6 style={{textDecoration: "underline"}}>Why should I link my twitter account?</h6>
                </OverlayTrigger>
              </Col>
            </Row>
          </Row>
          <hr /> */}

        <Row className='mt-5'>
          <h5>1. {t('main.text.connectSocial')}</h5>
          {(appleId) ?
            <Row>
              <Col xs={12} md={6}>
                <Button size="lg" className={styles.disactiveBtn}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i>
                  <span style={{ fontWeight: '800', marginLeft: '8px' }}>{t('main.text.appleConnected')}</span>
                </Button>
              </Col>
              <Col xs={12} md={6} className='d-flex justify-content-center connect_code'>
                <OverlayTrigger overlay={<Tooltip>{t('main.text.disconnect')}</Tooltip>}>
                  <Button className={styles.activeBtn} onClick={disconnectApple}>
                    <i className="fa-solid fa-xmark"></i>
                    <span style={{ fontWeight: '800', marginLeft: '8px' }}>{appleId.slice(0, 5).concat('...').concat(appleId.slice(-4))}</span>
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
            :
            <Row className="mt-1">
              <Col xs={12} md={6}>
                <Button size="lg" className="signInWithApple2" onClick={connectApple}>
                  <Image src="/apple_white.png" width="15px" height="15px" style={{ marginTop: '-3px' }} />
                  <span style={{ fontWeight: '800' }}>
                    <span dangerouslySetInnerHTML={{ __html: appleIdLoginBtn }}></span>
                  </span>
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <h5 className="mt-2 connect_txt">{t('main.text.appleNotConnected')}</h5>
              </Col>
            </Row>
          }
          <Row className='mt-3'>
            <Col xs={12}>
              <span style={{ display: 'inline-block' }}>
                <OverlayTrigger overlay={<Tooltip>{t('page.mintpass.youWillNeedToAccessImages')}</Tooltip>}>
                  <h6 style={{ textDecoration: "underline" }}>{t('page.mintpass.whyShouldILinkMyAppleAccount')}</h6>
                </OverlayTrigger>
              </span>
            </Col>
          </Row>
        </Row>

        <hr />

        <Row className='mt-5 mb-5'>
          <h5>2. {t('main.text.connectWallet')}</h5>
          {(walletAddress) ?
            <Row>
              <Col xs={12} md={6}>
                <Button size="lg" className={styles.disactiveBtn}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i>
                  <span style={{ fontWeight: '800', marginLeft: '8px' }}>{t('main.text.walletConnected')}</span>
                </Button>
              </Col>
              <Col xs={12} md={6} className='d-flex justify-content-center connect_code'>
                <OverlayTrigger overlay={<Tooltip>{t('main.text.disconnect')}</Tooltip>}>
                  <Button className={styles.activeBtn} onClick={connectWallet}>
                    <i className="fa-solid fa-xmark"></i>
                    <span style={{ fontWeight: '800', marginLeft: '8px' }}>{walletAddress.slice(0, 5).concat('...').concat(walletAddress.slice(-4))}</span>
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
            :
            <Row className="mt-1">
              <Col xs={12} md={6}>
                <Button size="lg" className={styles.disactiveBtn} onClick={connectWallet} disabled={!appleId}>
                  <Image src="/metamask.png" width="15px" height="15px" style={{ marginTop: '-3px' }} />
                  <span style={{ fontWeight: '800', marginLeft: '8px' }}>{t('main.text.connectWallet')}</span>
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <h5 className="mt-2 connect_txt">{t('main.text.walletNotConnected')}</h5>
              </Col>
            </Row>
          }
        </Row>

        <Row className='justify-content-md-center mt-5'>
          <Col xs={12} className='text-center'>
            {walletAddress && appleId ?
              <Button href="/submission" size="lg" className={styles.disactiveBtn} style={{ width: "30%", borderRadius: "10px", fontWeight: '800' }}>{t('button.next')}&nbsp;&rarr;</Button>
              :
              <Button size="lg" variant="secondary" className={styles.nextBtn} style={{ width: "30%", borderRadius: "10px", fontWeight: '800' }} disabled>{t('button.next')}&nbsp;&rarr;</Button>
            }
          </Col>
        </Row>
      </div>
    </Container>
  )
}

function App() {
  return (
    <Layout>
      <WagmiConfig config={wagmiConfig}>
        <AuthPage />
      </WagmiConfig>
    </Layout>
  )
}

export default App;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}
