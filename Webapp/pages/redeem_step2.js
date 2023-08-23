import { getSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/RedeemStep.module.css';
import { Row, Col, Form, Container, Button, Image } from 'react-bootstrap';

import axios from 'axios';
import AppModal from '../components/redeem/AppModal';
import { useTranslation } from '../i18n';
import { getHeaders } from '../utils/utils';
//import { getAccount, fetchMintpassContractNFT } from '../store/actions';
import { getAccount, fetchMintpassContract } from '../store/actions';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
import {ethers, BigNumber}  from 'ethers';
import {getMessageHashSignature} from '../utils/utils';
import { Cookies } from "react-cookie-consent";
import {FaSpinner } from 'react-icons/fa';

//智能合约2.0
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useAccount } from 'wagmi'
//import { mindfulNFTContractConfig } from '../components/contracts';
import { mintpassContractConfig } from '../components/contracts';

//just pass the setShow and setConShow as props to children components
function RedeemStep2() {
  const { t, locale } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const [show, setShow] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [obj, setObj] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [artworkId, setArtworkId] = useState("");
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  //const mintpassNFTContract = useSelector((state) => state.contractNFTState);
  const mintpassContract = useSelector((state) => state.contractState);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  //智能合约2.0
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...mintpassContractConfig,
    functionName: 'safeTransferFrom',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  useEffect(() => {
    if(!isError) return;
    if (confirm(error?.shortMessage)){
      setLoading(false);
    }else{
      setLoading(false);
    }
  },[isError])

  useEffect(() => {
    if(!isSuccess) return;
    Router.push({
      pathname: '/redeem_step4',
    });
  },[isSuccess])

  useEffect(() => {
    if(!data) return;
    console.log('write success', data)
    Router.push({
      pathname: '/redeem_step4',
    });
  },[data])
  
  useEffect(async () => {
    const appleId = Cookies.get("appleId");
    if(!appleId) return;
    setLoading(true);
    // artwork
    const res = await axios.get(`${apiPort}/mindfulapi/app/nft/mintPass/appleid/${appleId}`, {headers: getHeaders()});
    if(res.status === 200){
      const { data: { data } } = res;
      // const data = [{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "0","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null", "artworkId": "1","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "1","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null", "artworkId": "2","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "7","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds", "artworkId": "3","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "8","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra", "artworkId": "4","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "11","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra", "artworkId": "5","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "12","tokenUriRaw": "ipfs://bafyreierzjpzy576f2sqwr6yshf6wwlaan7qsh32bycmtb7l4fegi6srzm/metadata.json","name": "Sample artwork","type": "fish","description": "Sample test","extraInfo": "Sample test extra", "artworkId": "6","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "13","tokenUriRaw": "ipfs://bafyreifuvv46cghiid222of4vlr35i6jz7zgbgscw2c2zfv53epulvrony/metadata.json","name": "Sample artwork2","type": "fish","description": "Sample test","extraInfo": "Sample test extra", "artworkId": "7","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "14","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra", "artworkId": "8","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "15","tokenUriRaw": "ipfs://bafyreidaphppcdpnwtrbxy6g42uubwpcxgxo2przkocnqz4tuk7hlxe4g4/metadata.json","name": "testartwork2","type": "fish","description": "testartwork2 desc","extraInfo": "testartwork2 extra", "artworkId": "9","imageURL": "https://ipfs.io/ipfs/bafybeifsrz7fidwdb3oensdbavkx3ka4cyqglandgbrpv6kcmzox7znzve/event_B.png"}];
      if(data.length){
        setDataList(data);
        setSelectedOption(data[0].tokenId);
        setArtworkId(data[0].artworkId);
      }else{
        setShow(true);
      }
      setLoading(false);
    }
  },[]);
  
  useEffect(() => {
    if(!selectedOption) return;
    const result = dataList.find(item => item.tokenId === selectedOption);
    setObj(result);
  },[dataList, selectedOption]);

  const handleOptionChange = (event) => {
    const artworkId = dataList.find(item => item.tokenId === event.target.value).artworkId;
    setSelectedOption(event.target.value);
    setArtworkId(artworkId);
  };

  const optionMintpass = dataList.map((item, key) => {
    return <option key={key} value={item.tokenId}>Mintpass {item.tokenId}</option>
  });
  
  useEffect(async() => {
    await dispatch(getAccount());
    await dispatch(fetchMintpassContract());
  },[dispatch])

  const getIpfs = async () => {
    setLoading(true);
    await axios.post(`${apiPort}/mindfulapi/app/nftstorage/mindfultoken/${artworkId}`, {}, {headers: getHeaders()})
    .then(res => {
      if(res.status === 200){
        mint(res.data);
      }
    })
    .catch(err => {
      console.log(err)
    });
  }

  async function mint(ipfs) {
    try{
      //const contract = require("../utils/MindfulNFT.json");
      //const { messageHash, signature } = await getMessageHashSignature(contract).then(res => {
      //  return res;
      //})
      // mint the MindfulNFT
      console.log("Minting MindfulNFT...");
      console.log(mintpassContract);
      //console.log("account: ", account);
      console.log("address: ", address);
      console.log("tokenID: ", selectedOption);
      //console.log("ipfs: ", ipfs);
      //const { address } = useAccount();

      let ipfsHex = '0x';
      let tASCII, Hex;
      ipfs.split('').map( i => {
          tASCII = i.charCodeAt(0)
          Hex = tASCII.toString(16);
          ipfsHex = ipfsHex + Hex;
      });
      ipfsHex = ipfsHex.trim();
      console.log("ipfs in hex: ", ipfsHex);

      //await mintpassNFTContract.methods.mintMindfulNFT("0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab", "https://www.google.com", "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab", "100", 1, messageHash, signature).send({ from: account })
      //await mintpassContract.methods.safeTransferFrom['address,address,uint256']("0x9b39710bd511bc14fcb0f64a9d8f8e6f630751ab", "0xb5932aCe7504a7158807781e5500FE1A81078880", 7).send({ from: account})
      //await mintpassContract.methods.balanceOf(account).call({ from: account })
      //await mintpassContract.methods.safeTransferFrom(account, "0xb5932aCe7504a7158807781e5500FE1A81078880", selectedOption, ipfs).send({ from: account })

      // await mintpassContract.methods.safeTransferFrom(account, "0xF30aaF36A9637CFf42933d38B34E39EBEb770261", selectedOption, ipfsHex).send({ from: account })
      // .then(async function(){
      //     console.log('success')
      //     setLoading(false);
      //     Router.push({
      //       pathname: '/redeem_step4',
      //     });
      // })

      await write({
        //args: [account, "0xF07de37BB25395A5C0031a8c120e11B972c69eEa", selectedOption, ipfsHex]
        args: [address, "0xF07de37BB25395A5C0031a8c120e11B972c69eEa", selectedOption, ipfsHex]
      })
    }
    catch(err){
      console.log('error', err)
    }
  }

  return(
    <Container className='mt-5 mb-5'>
      {isLoading || loading ?
        <div className="overly">
          <Image src="/loading.gif" width="30px" height="30px" />
        </div>
        : ''
      }
      <div className={styles.submitPage}>
          <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
          <Row className="mt-4"><h4>{t('page.redeem.redeemArtworks')}</h4></Row>

          <Row className='mt-4' style={{fontSize: "1.3rem",fontWeight:'800'}}>
            <Col xs={4} className={styles.item}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>{t('page.redeem.authentication')}</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.redeem.selectMintPass')}</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={styles.item}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.redeem.complete')}</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
          </Row>

          {dataList.length ? 
            <div className={styles.submitContent}>
              <Row className="gx-5">
                <Col xs={12}>
                  <div className={styles.submitTile}>{t('page.redeem.browseYourMintpass')}: </div>
                  <div className={styles.submitTxt3}>
                    <Row className="gx-5">
                      <Col xs={12} sm={8} md={6}>
                          <Form className={styles.form1}>
                            <Form.Select
                              onChange={handleOptionChange}
                            >
                              {optionMintpass}
                            </Form.Select>
                          </Form>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile}>{t('page.redeem.information')}:</div>
                  <div className={styles.submitTxt3}>{t('page.redeem.theBelowInformation')}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('page.gallery.type')}:</div>
                  <div className={styles.submitTxt2}>{obj.type}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('page.redeem.eventID')}:</div>
                  <div className={styles.submitTxt2}>{obj.eventId}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('main.text.artistMessage')}:</div>
                  <div className={styles.submitTxt2}>{obj.artistMessage}</div>
                </Col>
              </Row>
              <Row className='justify-content-md-center mt-5'>
                <Col xs={12}>
                  <div className='text-center'>
                    <Button className={`${styles.burneBtn}`} onClick={getIpfs} disabled={isLoading || loading}>{t('button.burn')}</Button>
                  </div>
                </Col>
              </Row>
            </div>
           : ''}
          {/* mobile app confirm modal */}
          <AppModal setShow={setShow} show={show} />
      </div>
    </Container>
  )
}

//智能合约2.0
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { projectId, wagmiConfig, ethereumClient } from '../components/wagmi';
function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RedeemStep2 />
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-z-index': '9999'
        }}
      />
    </WagmiConfig>
  )
}

export default App;

//getServerSideProps will get static data in building page process from server before the page render
export async function getServerSideProps(context) {
  const session = await getSession(context);  
  const BASE_URL = process.env.NEXTAUTH_URL;
  if(session) {
    const res = await axios.get(
      `${BASE_URL}/api/users`,
        { params: 
          { 
            email: session.user.email, 
          }
        }
      )
    const user = res.data;
    return {
      props: {
        session,
        user
      }
    }
  }
  return {
    props: {
    }
  }
}