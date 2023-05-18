import Script from 'next/script';
import { getSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Container, Button, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { sortByFieldAsc, sortByFieldDesc } from '../utils/utils';

import axios from 'axios';
import AppModal from '../components/submission/AppModal';
import SubmitModal from '../components/submission/SubmitModal';
import EditModal from '../components/submission/EditModal';
import { useTranslation } from '../i18n';
import { getHeaders } from '../utils/utils';

//just pass the setShow and setConShow as props to children components
export default function SubmitPage({ session, user }) {
  const { t } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const [show, setShow] = useState(false);
  const [submitShow, setSubmitShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [newest, setNewest] = useState(true);

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const images = user?.images;
  const mintAllow = user?.allowSubmission;
  const mintTime = new Date(user?.submissionTime);

  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState('');
  const [dataArtworks, setDataArtworks] = useState([]);
  
  useEffect(async () => {
    const appleId = sessionStorage.getItem("appleId");
    if(!appleId) return;
    // artwork
    const res = await axios.get(`${apiPort}/mindfulapi/app/artwork/${appleId}`, {headers: getHeaders()});
    if(res.status === 200){
      const { data: { data } } = res;
      setDataArtworks(sortByFieldDesc(data, 'updateTime'));
    }
  },[])
  
  useEffect(() => {
    if(!dataArtworks.length) return setDisabled(true);
    setDisabled(false);
  },[dataArtworks]);

  const handleShow = () => setShow(true);
  const handleSubmitShow = () => setSubmitShow(true);
  const handleEditShow = () => setEditShow(true);
  function refreshPage(){ 
    window.location.reload(); 
  }

  function sortOldest() {
    setNewest(false);
    sortByFieldAsc(dataArtworks, 'updateTime');
    setImage('');
  }

  function sortNewest() {
    setNewest(true);
    sortByFieldDesc(dataArtworks, 'updateTime');
    setImage('');
  }

  function selectImage(image) {
    setImage(image);
  }

  useEffect(() => {
    if(!image) return;
    const modelViewer = document.getElementById('previewModel');
    modelViewer.addEventListener("load", () => {
      let material = modelViewer.model.materials[0];
      let newTexture = async (imageSource) => {
        return await modelViewer.createTexture(imageSource)
      }
      let initTexture = async (attr, channel, imageSource) => {
        const texture = await newTexture(imageSource);
        material[attr][channel].setTexture(texture);
      }
      let source = image;
      initTexture('pbrMetallicRoughness', 'baseColorTexture', source)            
    });
  },[image]);

  function startCountDown() {
    // const mintTime = new Date("06/09/2022 14:00:00"); //for testing only
    const waitingTime = 4 * 3600000;//users wait for 4 hours
    const interval = setInterval(() => {
      const now = new Date();
      const difference = waitingTime - (now.getTime() - mintTime.getTime());
      //in millisec
      const h = Math.floor(
        (difference % (1000 * 60 * 60 *24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      setMins(m);

      const s = Math.floor(
        (difference % (1000 * 60)) / 1000
      );
      setSecs(s);
    }, 1000);

    return () => 
    {
      allowSubmission();
      clearInterval(interval);
    };
  }

  async function allowSubmission() {
    await axios.get(
      `/api/users`,
        { params: 
          { 
            allowSubmission: true, 
          }
        }
      )
  }

  return(
    <Container className='mt-5 mb-5'>
      <div className={styles.submitPage}>
          <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
          <Row className="mt-4"><h4>{t('page.mintpass.submitArtwork')}</h4></Row>

          <Row className='mt-4' style={{fontSize: "1.3rem",fontWeight:'800'}}>
            <Col xs={4} className={styles.item}>
              <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
              <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>{t('page.mintpass.authentication')}</span></div>
              <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
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

          <div className={styles.submitContent}>
          <Row className="gx-5">
            <Col xs={12} md={6}>
              <Row>
                <Col xs={10}>
                  <div className={styles.submitTile}>{t('page.mintpass.submission.browseYourArtworks')}: </div>
                </Col>
                
                {!disabled ?
                  <Col xs={2}>
                    {
                      newest ? 
                        <OverlayTrigger overlay={<Tooltip id="">{t('page.mintpass.submission.sortOldest')}</Tooltip>}>
                          <span className="d-inline-block">
                          <Button variant="light" className={styles.sortBtn} onClick={sortOldest}><i className="fa-solid fa-arrow-down-short-wide"></i></Button>
                          </span>
                        </OverlayTrigger>
                      :
                        <OverlayTrigger overlay={<Tooltip id="">{t('page.mintpass.submission.sortNewest')}</Tooltip>}>
                          <span className="d-inline-block">
                          <Button variant="light" className={styles.sortBtn} onClick={sortNewest}><i className="fa-solid fa-arrow-down-wide-short"></i></Button>
                          </span>
                        </OverlayTrigger>
                    }  
                  </Col>
                  : ''
                }
              </Row>

              {disabled ?
                <Row  className={styles.submitLeft}>
                  <p className={styles.submitTxt1}>{t('page.mintpass.submission.noArtworkIsCreatedInThisAccount')}</p>
                  <h4 className={styles.submitAccount}>
                    <Image src="/apple.png" width="30px" />
                    <span>{t('page.mintpass.submission.appleAccount')}</span>
                  </h4>
                  <p className={styles.submitTxt1}>{t('page.mintpass.submission.download')} <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleShow}>{t('main.text.mindfulOcean')}</span> {t('page.mintpass.submission.toCreateAndSubmitArtworkOr')}</p>
                  <Link href="/authentication" passHref><span style={{textDecoration: "underline", cursor: "pointer"}}>{t('page.mintpass.submission.switchToADifferentAccount')}</span></Link>
                </Row>
              :
              <>
                <div className={`mt-1 ${styles.scrollBox}`}>
                  {dataArtworks.map((item, key) => (
                      <Form.Check className='form_check_img' style={{position: "relative"}}>
                        <Form.Check.Label htmlFor={`imageGroup${key}`} className='label_image'>
                          <Form.Check.Input
                            key={newest}
                            name="imageGroup1"
                            type="radio"
                            id={`imageGroup${key}`}
                            className={styles.imageRadio}
                            onChange={() => selectImage(item.URL)}
                          />
                          <Image src={item.URL} style={{cursor: "pointer", position: "relative"}} fluid />
                        </Form.Check.Label>
                      </Form.Check>
                    ))
                  }
                </div>

                <p>{t('page.mintpass.submission.createMoreIn')} <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleShow}>{t('page.mintpass.submission.mindfulOceanApp')}</span></p>
              </>     
              }
              <Button className={`mt-3 p-0 ${styles.activeBtn}`} size="lg" style={{width: '70%', borderRadius: '20px', fontWeight: 'bold'}} onClick={refreshPage}><i className="fa-solid fa-rotate"></i>&nbsp;{t('button.refresh')}</Button>
            </Col>
          
            <Col xs={12} md={6} className="mt-5">
                <model-viewer
                  id="previewModel"
                  key={image}
                  src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                  ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                  poster=""
                  alt="A 3D model of an ocean animal"
                  shadow-intensity="1"
                  camera-controls
                  auto-rotate autoplay ar
                  ar-modes="webxr scene-viewer quick-look"
                  style={{height: '40vh', backgroundColor: disabled ? '#aaa' : ''}}
                >
                </model-viewer>
                <Row className='d-flex justify-content-center mt-5'>
                  <Col>
                    <Button onClick={handleEditShow} className={` ${styles.submitEditBtn} mb-3`} disabled={disabled}>{t('button.editInfo')}</Button>
                    <Button onClick={handleSubmitShow} className={`${homeStyles.btn} ${styles.submitBtn}`} disabled={disabled}>{t('button.submit')} &rarr;</Button>
                  </Col>
                </Row>

                  {/* {
                    (!mintAllow) ?
                    <Row className='mt-5 text-center'>
                        <h6>Please try again later in: </h6>
                        <Row>
                          <Col xs={4}>
                            <h1 className='text-end' style={{fontWeight: "800"}}>0{hours} : </h1>
                            <h6>Hours</h6>
                          </Col>
                          {(mins <= 9) ?
                          <Col xs={4}>
                            <h1 style={{fontWeight: "800"}}>0{mins} :</h1> 
                            <h6>Minutes</h6>
                          </Col> :
                          <Col xs={4}>
                            <h1 style={{fontWeight: "800"}}>{mins} : </h1>
                            <h6>Minutes&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                          </Col>
                          }
                          {(secs <= 9) ?
                            <Col xs={4}>
                              <h1 className='text-start' style={{fontWeight: "800"}}>0{secs}</h1>
                              <h6>Seconds</h6>
                            </Col> :
                            <Col xs={4}>
                              <h1 className='text-start' style={{fontWeight: "800"}}>{secs}</h1>
                              <h6 className='text-start'>Seconds</h6>
                            </Col>
                          }
                      </Row>
                  </Row>
                  : 
                  <></>
                  } */}
                        
              </Col>

            </Row>
          </div>
          {/* mobile app confirm modal */}
          <AppModal setShow={setShow} show={show} />
          {/* submit confirm modal */}
          <SubmitModal setSubmitShow={setSubmitShow} submitShow={submitShow} />
          {/* edit modal */}
          <EditModal setEditShow={setEditShow} editShow={editShow} />
          <Script type="text/javascript" charset="utf-8" src="/js/createPreview.js" />
          <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
          <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
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