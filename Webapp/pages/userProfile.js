import { useEffect, useState } from "react";
import {Row, Col, Form, Button, Image, Container, Dropdown,  Collapse, Card} from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaPlus, FaTimes, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Script from 'next/script';
import Link from 'next/link';
import styles from '../styles/UserProfilePage.module.css';

import Layout from '../components/SubpageLayout';
import { data } from '../data/data';
import UserProfileModel from '../components/userProfile/UserProfileModal';
import TextOverflowTips from "../components/textOverflowTips/TextOverflowTips";
import { getWalletAddress, getAppleId, getEmail } from '../utils/utils';
import axios from 'axios';

const UserProfilePage = () => {
  const apiPort = process.env.API_PORT || '/';
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [appleId, setAppleId] = useState();
  const [email, setEmail] = useState('');
  const [activeIndex, setActiveIndex] = useState(null); // 控制展开的面板索引
  const [isChecked, setIsChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [dataArtwork, setDataArtwork] = useState([]); // Submitted Artworks
  const [dataJoinedEvent, setDataJoinedEvent] = useState([]); // Joined Event
  const [dataOwnedNFTs, setDataOwnedNFTs] = useState([]); // Owned NFTs
  const [dataOwnedMintpass, setDataOwnedMintpass] = useState([]); // Owned Mintpass
  const [modalData, setModalData] = useState();
  const [formData, setFormData] = useState({
    URL: ''
  });
  const [formErrors, setFormErrors] = useState({
    URL: false
  });

  useEffect(() => {
    setWalletAddress(getWalletAddress());
    setAppleId(getAppleId());
    setEmail(getEmail());
  }, []);

  useEffect(async () => {
    if(!appleId) return;
    setLoading(true)
    
    const res = await axios.get(`${apiPort}/mindfulapi/user/${appleId}`);
    if(res.status === 200){
      const { data: { data: { artwork, joinedEvent } } } = res
      // Submitted Artworks
      // console.log('Submitted Artworks', artwork)
      setDataArtwork(artwork);
      
      // Joined Event
      // console.log('Joined Event', joinedEvent)
      setDataJoinedEvent(joinedEvent);
    }

    setLoading(false)
  }, [appleId]);

  useEffect(async () => {
    if(!walletAddress) return;
    setLoading(true)

    // Owned NFTs
    const dataOwnedNFTs = await axios.get(`${apiPort}/mindfulapi/nft/mindfulToken/${walletAddress}`);
    if(dataOwnedNFTs.status === 200){
      const { data: { data } } = dataOwnedNFTs;
      // console.log('Owned NFTs', dataOwnedNFTs)
      setDataOwnedNFTs(data);
    }
    // Owned Mintpass
    const dataOwnedMintpass = await axios.get(`${apiPort}/mindfulapi/nft/mintPass/${walletAddress}`);
    if(dataOwnedMintpass.status === 200){
      const { data: { data } } = dataOwnedMintpass;
      // console.log('Owned Mintpass', dataOwnedMintpass)
      setDataOwnedMintpass(data);
    }

    setLoading(false)
  }, [walletAddress]);

  const resetForm = () => {
    const data = {
      URL: ''
    }
    setFormData(data);
    const dataError = {
      URL: false
    }
    setFormErrors(dataError);
  };

  const handleToggle = async (index) => {
    setActiveIndex(index === activeIndex ? null : index); // 切换展开的面板索引
    if(index === 3){
      if(index === activeIndex){
        resetForm();
      }
    }else{
      resetForm();
    }
  };

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // 更新 formData 对象中相应的表单值
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const savePersonalWebsite = async (event) => {
    event.preventDefault();
    // 从 formData 对象中获取表单的值
    const { URL } = formData;
    const newFormErrors = {
      URL: !URL,
    };
    setFormErrors(newFormErrors);

    if(!URL) return;

    const params = [{
      URL,
      description: ''
    }];

    // console.log(params)
    // return
    await axios.post(`${apiPort}/mindfulapi/personalwebsite/${appleId}`, params)
    .then(res => {
      if(res.status === 200){
        const {data: {message}} = res;
        toast.success(message, {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-success',
          hideProgressBar: true,
        });
        resetForm();
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  const handleModal = (title, item, isShare) => {
    const {description, artistAppleId, peronsalInfo, eventId, mintpassld} = item;
    const data = {
      ...item,
      title,
      isShare
    }
    setModalData(data)
    setModalShow(true)
  };

  return(
    <Container className='mt-5 mb-5'>
      <ToastContainer />
      {loading ?
        <div className="overly">
          <FaSpinner />
        </div>
        : ''
      }
      <Row><Link href="/">&larr; Return to homepage</Link></Row>
      <Row className='mt-5'>
          <Col sm={12} md={12}>
            <h5>User Profile</h5>
          </Col>
          <Col sm={12} md={12} style={{ marginTop: '2rem' }}>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Wallet Connect</h4>
                  </div>
                  <div className={styles.card_txt1}>
                    <TextOverflowTips text={walletAddress} />
                  </div>
              </div>
              </Card.Body>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Apple ID</h4>
                  </div>
                  <div className={styles.card_txt1}>
                    <TextOverflowTips text={appleId} />
                  </div>
              </div>
              </Card.Body>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Personal Website</h4>
                  </div>
                  <div>
                    {activeIndex !== 3 ?
                      <span className={styles.card_txt2}>Add new</span>
                      : ''
                    }
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(3)}
                      aria-controls="collapseExample3"
                      aria-expanded={activeIndex === 3}
                    >
                      {activeIndex === 3 ? <FaTimes /> : <FaPlus />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 3}>
                <div id="collapseExample3">
                  <Card.Body className={styles.card_body}>
                  
                  <Form onSubmit={savePersonalWebsite}>
                    <Form.Group className="align-items-center form_group" controlId="URL">
                      <Form.Label className={styles.form_label}>Website URL</Form.Label>
                      <Form.Control
                        className={styles.form_control}
                        type="text"
                        placeholder=""
                        name="URL"
                        value={formData.URL}
                        isInvalid={formErrors.URL}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback
                        className={styles.form_feedback}
                        type="invalid"
                      >
                        Website URL cannot be empty
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div style={{ clear: 'both', paddingTop: '20px' }}>
                      <Row>
                        <Col xs={12} md={6}>
                          <span
                            className={isChecked ? `${styles.custom_switch} ${styles.active}` : styles.custom_switch}
                            onClick={handleSwitchChange}
                          >
                            <span className={styles.switch_handle}></span>
                          </span>
                          Automatically fill this in when submiting artwork.
                        </Col>
                        <Col xs={12} md={6} style={{ textAlign: 'right'}}>                      
                          <Button variant="primary" type="button" className={styles.btn_save} onClick={savePersonalWebsite}>
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>

                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Submitted Artworks</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>View all ({dataArtwork.length})</span>
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(4)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 4}
                    >
                      {activeIndex === 4 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 4}>
                <div id="collapseExample4">
                  <Card.Body className={styles.card_body}>
                    <Row className='mt-2'>
                      {
                        dataArtwork.map((item, key) => (
                          <Col xs={6} sm={4} md={3} lg={2} key={key}>
                            <div className={styles.image_item} onClick={() => handleModal('Artwork information', item, false)}>
                              <div className={styles.item_cover}>View Details</div>
                              <Image src={item.URL} className={styles.item_images} />
                            </div>
                          </Col>
                        ))
                      }
                    </Row>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Owned NFTs</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>View all ({dataOwnedNFTs.length})</span>
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(5)}
                      aria-controls="collapseExample5"
                      aria-expanded={activeIndex === 5}
                    >
                      {activeIndex === 5 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 5}>
                <div id="collapseExample5">
                  <Card.Body className={styles.card_body}>
                    <Row className='mt-2'>
                      {
                        dataOwnedNFTs.map((item, key) => (
                          <Col xs={6} sm={4} md={3} lg={2} key={key}>
                            {/* <Image src={d.image} className={styles.GalleryPageImages} /> */}
                            <div className={styles.image_item} onClick={() => handleModal('NFT information', item, true)}>
                              <div className={styles.item_cover}>View Details</div>
                              <Image src={item.URL} className={styles.item_images} />
                            </div>
                          </Col>
                        ))
                      }
                    </Row>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Owned Mintpass</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>View all ({dataOwnedMintpass.length})</span>
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(6)}
                      aria-controls="collapseExample6"
                      aria-expanded={activeIndex === 6}
                    >
                      {activeIndex === 6 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 6}>
                <div id="collapseExample6">
                  <Card.Body className={styles.card_body}>
                    {dataOwnedMintpass.map((item, key) => {
                      return <div key={key} className={styles.list_item}><a href={item.URL} target="_blank">{item.peronsalInfo} <Image src="/share.gif" /></a></div>
                    })}
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Joined Event</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>View all ({dataJoinedEvent.length})</span>
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(7)}
                      aria-controls="collapseExample7"
                      aria-expanded={activeIndex === 7}
                    >
                      {activeIndex === 7 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 7}>
                <div id="collapseExample7">
                  <Card.Body>
                    {dataJoinedEvent.map((item, key) => {
                      return <div key={key} className={styles.list_item}>{item.title}</div>
                    })}
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
        <UserProfileModel show={modalShow} onHide={() => setModalShow(false)} modal={modalData} />
    </Container>
  )
}

//per-page layout
UserProfilePage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default UserProfilePage;