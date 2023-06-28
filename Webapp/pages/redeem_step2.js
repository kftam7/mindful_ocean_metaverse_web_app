import { getSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/RedeemStep.module.css';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';

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

//just pass the setShow and setConShow as props to children components
export default function RedeemStep2() {
  const { t, locale } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  //const mintpassNFTContract = useSelector((state) => state.contractNFTState);
  const mintpassContract = useSelector((state) => state.contractState);
  
  useEffect(async () => {
    const appleId = sessionStorage.getItem("appleId");
    if(!appleId) return;
    // artwork
    const res = await axios.get(`${apiPort}/mindfulapi/app/nft/mintPass/appleid/${appleId}`, {headers: getHeaders()});
    if(res.status === 200){
      const { data: { data } } = res;
      // console.log(data);
      if(data.length){
        setData(data);
        setSelectedOption(data[0].tokenId);
      }else{
        setShow(true);
      }
    }
  },[]);
  
  useEffect(() => {
    if(!selectedOption) return;
    const result = data.find(item => item.tokenId === selectedOption);
    setObj(result);
  },[data, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const optionMintpass = data.map((item, key) => {
    return <option key={key} value={item.tokenId}>Mintpass {item.tokenId}</option>
  });
  
  useEffect(async() => {
    await dispatch(getAccount());
    await dispatch(fetchMintpassContract());
  },[dispatch])

  async function mint() {
    try{
      const contract = require("../utils/MindfulNFT.json");
      const { messageHash, signature } = await getMessageHashSignature(contract).then(res => {
        return res;
      })
      // mint the MindfulNFT
      console.log("Minting MindfulNFT...");
      console.log(mintpassContract);
      console.log("tokenID: ", selectedOption);
      //await mintpassNFTContract.methods.mintMindfulNFT("0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab", "https://www.google.com", "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab", "100", 1, messageHash, signature).send({ from: account })
      //await mintpassContract.methods.safeTransferFrom['address,address,uint256']("0x9b39710bd511bc14fcb0f64a9d8f8e6f630751ab", "0xb5932aCe7504a7158807781e5500FE1A81078880", 7).send({ from: account})
      //await mintpassContract.methods.balanceOf(account).call({ from: account })
      await mintpassContract.methods.safeTransferFrom(account, "0xb5932aCe7504a7158807781e5500FE1A81078880", selectedOption).send({ from: account })
      .then(async function(){
          console.log('success')
          Router.push({
            pathname: '/redeem_step4',
          });
      })
    }
    catch(err){
      console.log('error', err)
    }
  }

  return(
    <Container className='mt-5 mb-5'>
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

          {data.length ? 
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
                  <div className={styles.submitTile2}>{t('main.text.description')}:</div>
                  <div className={styles.submitTxt2}>{obj.description}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('page.redeem.personalInformation')}:</div>
                  <div className={styles.submitTxt2}>{obj.peronsalInfo}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('page.redeem.artistAppleID')}:</div>
                  <div className={styles.submitTxt2}>{obj.artistAppleId}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('page.redeem.eventID')}:</div>
                  <div className={styles.submitTxt2}>{obj.eventId}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>{t('page.redeem.mintpassID')}:</div>
                  <div className={styles.submitTxt2}>{obj.tokenId}</div>
                </Col>
              </Row>
              <Row className='justify-content-md-center mt-5'>
                <Col xs={12}>
                  <div className='text-center'>
                    <Button size="lg" className={styles.disactiveBtn} style={{width: "30%", borderRadius: "10px", fontWeight:'800'}} onClick={mint}>{t('button.burn')}</Button>
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