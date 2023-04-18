import axios from 'axios';
import Image from 'next/image';
import { Container, Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl, Row, Col, Modal } from 'react-bootstrap';
import styles from '../styles/Nav.module.css';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getBalance, grabAccount, grabBalance, disconnectAccount } from '../store/actions';

// apple id login
// import config from '../config/config.json';
// console.log(config)

// Web3Modal
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig, useAccount, useDisconnect } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Web3Provider } from "@ethersproject/providers";
const chains = [arbitrum, mainnet, polygon]
const projectId = 'b66462653b390b41e66f8f03e25cfa0a'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

const NavBar = () => {
  const apiPort = process.env.API_PORT || '/';
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // apple id
  const [appleIdLoginBtn, setAppleIdLoginBtn] = useState('');
  // useEffect(async () => {
  //   const res = await axios.post(`${apiPort}/mindfulapi/appleauth`, { code: '' });
  //   console.log(res)
  // }, []);

  // Web3Modal
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect Wallet" : "Connect Wallet";

  useEffect(async () => {
    console.log('Connect Wallet:', isConnected)
    if(!isConnected){
      sessionStorage.removeItem("walletAddress");
      return;
    }
    handleGetWalletInfo();
  }, [isConnected]);

  const onOpen = async () => {
    setLoading(true);
    await open();
    setLoading(false);
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
  const handleGetWalletInfo = async () => {
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    sessionStorage.setItem("walletAddress", address);
  };

  useEffect(async () => {
    const res = await axios.get(`${apiPort}/mindfulapi/applelogin`);
    console.log(res)
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

  const connect = async() => {
    await dispatch(grabAccount());
    await dispatch(grabBalance());
  }

  const signInOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleClose = () => {
    setIsModalVisible(false);
  }

  const signInWithApple = async () => {
    AppleID.auth.signIn();
  }

  const handleAppleLogin = async () => {
    const res = await axios.get(`http://localhost:3001/mindfulapi/applelogin`)
    console.log(res)
  }

  const handleAppleSignOut = async () => {
  }
  
  //didn't work
  // const disconnect = async() => {
  //   dispatch(disconnectAccount());
  // }
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
        <Nav.Link href="#about" className={styles.navlink}>About</Nav.Link>
        <Nav.Link href="#gallery" className={styles.navlink}>Gallery</Nav.Link>
        <Nav.Link href="#mobileapp" className={styles.navlink}>Create</Nav.Link>
        <Nav.Link href="#mintpass" className={styles.navlink}>Mintpass</Nav.Link>
        <Nav.Link href="#donate" className={styles.navlink}>Donate</Nav.Link>
        <Nav.Link href="#mindfultoken" className={`text-nowrap ${styles.navlink}`}>Mindful Token</Nav.Link>
    </Nav>
    <Nav>
      <Col lg={3} xl={4} className='mt-1 me-1'>
          <Form>
              <InputGroup className="">
                  <InputGroup.Text style={{color: '#005D6C', border: '1px solid #005D6C', backgroundColor: 'none'}} id="subscribe" type="submit"><i className="far fa-envelope"></i></InputGroup.Text>
                  <FormControl id="subscribe" placeholder="Subscribe here" style={{border: '1px solid #005D6C'}} />
              </InputGroup>
          </Form>
      </Col>
      <Col lg={3} xl={4} className='mt-1 me-1'>
          <Dropdown className="">
              <Dropdown.Toggle className={styles.dropdownBtn} id="language">
                  ENG&nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item href="#/lg-1">ENG</Dropdown.Item>
                  <Dropdown.Item href="#/lg-2">CN</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
      </Col>
      <Col lg={3} xl={4} className='mt-1 me-1'>
        <Button onClick={signInOpenModal} className={styles.dropdownBtn}>Sign In</Button> 
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
            <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='mb-12'>
                <Col xs={12}>
                    <Button className={styles.signInBtn} onClick={connectWallet}  disabled={loading}>{loading ? "Loading..." : label}</Button>
                    {/* <Web3Button /> */}
                </Col>
                <Col xs={12}>
                    <Button className={styles.signInBtn} onClick={handleAppleLogin}>
                      <div dangerouslySetInnerHTML={{__html: appleIdLoginBtn}}></div>
                    </Button>
                </Col>
                <Col xs={12}>
                    <Button className={styles.signInBtn2}>View My Profile</Button>
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

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
          <NavBar />
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