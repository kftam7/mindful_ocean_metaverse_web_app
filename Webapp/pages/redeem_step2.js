import { getSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/RedeemStep.module.css';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';

import axios from 'axios';
import AppModal from '../components/redeem/AppModal';

//just pass the setShow and setConShow as props to children components
export default function RedeemStep2({ session, user }) {
  const apiPort = process.env.API_PORT || '/';
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  
  useEffect(async () => {
    const appleId = sessionStorage.getItem("appleId");
    if(!appleId) return;
    // artwork
    const res = await axios.get(`${apiPort}/mindfulapi/nft/mintPass/appleid/${appleId}`);
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

  return(
    <Container className='mt-5 mb-5'>
      <div className={styles.submitPage}>
          <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; Return to homepage</h6></Link></Row>
          <Row className="mt-4"><h4>Redeem Artworks</h4></Row>

          <Row className='mt-4' style={{fontSize: "1.3rem",fontWeight:'800'}}>
            <Col xs={4} className={styles.item}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>1. Authentication</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-regular fa-circle"></i><span>2. Select Mint Pass</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={styles.item}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-regular fa-circle"></i><span>3. Complete</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
          </Row>

          {data.length ? 
            <div className={styles.submitContent}>
              <Row className="gx-5">
                <Col xs={12}>
                  <div className={styles.submitTile}>Browse your Mintpass: </div>
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
                  <div className={styles.submitTile}>Information:</div>
                  <div className={styles.submitTxt3}>The below information were created when the artwork was first submitted. They will be shown in XXX</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>Description:</div>
                  <div className={styles.submitTxt2}>{obj.description}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>Personal Information:</div>
                  <div className={styles.submitTxt2}>{obj.peronsalInfo}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>Artist Apple ID:</div>
                  <div className={styles.submitTxt2}>{obj.artistAppleId}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>Event ID:</div>
                  <div className={styles.submitTxt2}>{obj.eventId}</div>
                </Col>
                <Col xs={12}>
                  <div className={styles.submitTile2}>Mintpass ID:</div>
                  <div className={styles.submitTxt2}>{obj.tokenId}</div>
                </Col>
              </Row>
              <Row className='justify-content-md-center mt-5'>
                <Col xs={12}>
                  <div className='text-center'>
                    <Button href='/redeem_step3' size="lg" className={styles.disactiveBtn} style={{width: "30%", borderRadius: "10px", fontWeight:'800'}}>Burn</Button>
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