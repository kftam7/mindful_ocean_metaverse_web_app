import { useEffect, useState } from "react";
import {Row, Col, Form, Button, Image, Container, Dropdown,  Collapse, Card, Modal} from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaPlus, FaTimes, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Script from 'next/script';
import Link from 'next/link';
import styles from '../styles/UserProfilePage.module.css';

import Layout from '../components/SubpageLayout';
// import { data } from '../data/data';
import UserProfileModel from '../components/userProfile/UserProfileModal';
import EditPersonalWebsiteModel from '../components/userProfile/EditPersonalWebsiteModel';
import EditPersonalInfoModel from '../components/userProfile/EditPersonalInfoModel';
import TextOverflowTips from "../components/textOverflowTips/TextOverflowTips";
import { getWalletAddress, getAppleId, getAppleIdName, getEmail, getHeaders } from '../utils/utils';
import axios from 'axios';
import { useTranslation } from '../i18n';

const UserProfilePage = () => {
  const { t, locale } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [appleId, setAppleId] = useState();
  const [appleIdName, setAppleIdName] = useState('');
  const [email, setEmail] = useState('');
  const [activeIndex, setActiveIndex] = useState(null); // 控制展开的面板索引
  const [isChecked, setIsChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalPersonalInfoEditShow, setModalPersonalInfoEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);  
  const [dataPersonalwebsite, setDataPersonalwebsite] = useState([]); // personalwebsite
  const [dataArtwork, setDataArtwork] = useState([]); // Submitted Artworks
  const [dataJoinedEvent, setDataJoinedEvent] = useState([]); // Joined Event
  const [dataOwnedNFTs, setDataOwnedNFTs] = useState([]); // Owned NFTs
  const [dataOwnedMintpass, setDataOwnedMintpass] = useState([]); // Owned Mintpass
  const [modalData, setModalData] = useState();
  const [modalDataEdit, setModalDataEdit] = useState();
  const [formData, setFormData] = useState({
    URL: '',
    description: '',
    isActive: false
  });
  const [formErrors, setFormErrors] = useState({
    URL: false,
    description: false
  });
  const [errorUrlType, setErrorUrlType] = useState(1); //1：空值，2：不是正确的连接格式
  const [errorDescriptionType, setErrorDescriptionType] = useState(1); //1：空值，2：不能超过500字
  const [isAddPersonalwebsite, setIsAddPersonalwebsite] = useState(false);
  const [objArtWork, setObjArtWork] = useState();
  const [count, setCount] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const regURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
  const [walletAddressList, setWalletAddressList] = useState([]);
  const [personalInfo, setPersonalInfo] = useState('');

  useEffect(() => {
    setWalletAddress(getWalletAddress());
    setAppleId(getAppleId());
    setAppleIdName(getAppleIdName());
    setEmail(getEmail());
  }, []);

  useEffect(async () => {
    if(!appleId) return;
    setLoading(true);
    
    const res = await axios.get(`${apiPort}/mindfulapi/app/personalwebsite/${appleId}`, {headers: getHeaders()});
    if(res.status === 200){
      const { data: { data } } = res;
      setDataPersonalwebsite(data);
      setLoading(false);
    }
  }, [appleId, count]);

  useEffect(async () => {
    if(!appleId) return;
    const res = await axios.get(`${apiPort}/mindfulapi/app/user/${appleId}`, {headers: getHeaders()});
    if(res.status === 200){
      const { data: { data: { artwork, joinedEvent, walletAddress, personInfo } } } = res;
      // Submitted Artworks
      // console.log('Submitted Artworks', artwork)
      setDataArtwork(artwork || []);
      
      // Joined Event
      // console.log('Joined Event', joinedEvent)
      setDataJoinedEvent(joinedEvent || []);

      const wdList = walletAddress.slice(1);
      setWalletAddressList(wdList)

      setPersonalInfo(personInfo)
    }
  }, [appleId, countUser]);

  useEffect(async () => {
    if(!appleId) return;
    if(!walletAddress) return;
    setLoading(true);

    // Owned NFTs
    const dataOwnedNFTs = await axios.get(`${apiPort}/mindfulapi/app/nft/mindfulToken/appleid/${appleId}`, {headers: getHeaders()});
    if(dataOwnedNFTs.status === 200){
      const { data: { data } } = dataOwnedNFTs;
      // console.log('Owned NFTs', dataOwnedNFTs)
      setDataOwnedNFTs(data);
    }
    // Owned Mintpass
    const dataOwnedMintpass = await axios.get(`${apiPort}/mindfulapi/app/nft/mintPass/appleid/${appleId}`, {headers: getHeaders()});
    if(dataOwnedMintpass.status === 200){
      const { data: { data } } = dataOwnedMintpass;
      // console.log('Owned Mintpass', dataOwnedMintpass)
      setDataOwnedMintpass(data);
    }

    setLoading(false);
  }, [walletAddress, appleId]);

  const resetForm = () => {
    const data = {
      URL: '',
      description: '',
      isActive: false
    }
    setFormData(data);
    setIsChecked(false);
    
    const dataError = {
      URL: false,
      description: false
    }
    setFormErrors(dataError);
  };

  const handleToggle = async (index) => {
    setActiveIndex(index === activeIndex ? null : index); // 切换展开的面板索引
    resetForm();
    setIsAddPersonalwebsite(false);
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
    const { URL, description, isActive } = formData;
    let crossURL = true;
    let crossDescription = true;

    // URL 规则
    if(!URL){
      setErrorUrlType(1);
      crossURL = true;
    }else if(!regURL.test(URL)){
      setErrorUrlType(2);
      crossURL = true;
    }else{
      setErrorUrlType(0);
      crossURL = false;
    }

    // description 规则
    if(!description){
      setErrorDescriptionType(1);
      crossDescription = true;
    }else if(description.length > 500){
      setErrorDescriptionType(2);
      crossDescription = true;
    }else{
      setErrorDescriptionType(0);
      crossDescription = false;
    }

    const newFormErrors = {
      URL: crossURL,
      description: crossDescription
    };
    setFormErrors(newFormErrors);
    if(crossURL || crossDescription) return;
    
    const params = {
      URL,
      description,
      // isActive: isChecked
    };
    
    await axios.post(`${apiPort}/mindfulapi/app/personalwebsite/${appleId}`, params, {headers: getHeaders()})
    .then(res => {
      if(res.status === 200){
        const {data} = res;
        if(data.message){
          toast.success(data.message, {
            autoClose: 3000,
            position: 'top-center',
            className: 'custom-toast-success',
            hideProgressBar: true,
          });
          resetForm();
          setCount(count + 1);
        }else{
          toast.error(data, {
            autoClose: 3000,
            position: 'top-center',
            className: 'custom-toast-success',
            hideProgressBar: true,
          });
        }
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

  const addPersonalwebsite = () => {
    setIsAddPersonalwebsite(!isAddPersonalwebsite);
  };

  const handleEdit = (data) => {
    setModalEditShow(true);
    setModalDataEdit(data);
  };

  const handleDeleteConfrim = (data) => {
    setModalDeleteShow(true);
    setObjArtWork(data);
  };

  const handleDelete = async () => {
    const params = {
      isActive: 0
    }
    await axios.put(`${apiPort}/mindfulapi/app/personalwebsite/${objArtWork.websiteId}`, params, {headers: getHeaders()})
    .then(res => {
      const {data} = res;
      if(data.message){
        toast.success(data.message, {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-success',
          hideProgressBar: true,
        });
        setModalDeleteShow(false);
        setCount(count + 1);
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  const modalEditSuccess = () => {
    setModalEditShow(false);
    setCount(count + 1);
  };

  const modalEditClose = () => {
    setModalEditShow(false);
  };

  const modalPersonalInfoEditSuccess = () => {
    setModalPersonalInfoEditShow(false);
    setCountUser(countUser + 1);
  };

  const modalPersonalInfoEditClose = () => {
    setModalPersonalInfoEditShow(false);
  };

  const handlePersonalInfoEdit = () => {
    setModalPersonalInfoEditShow(true);
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
      <Row className='' ><Link href="/"><h6 style={{cursor: 'pointer'}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
      <Row className='mt-5'>
          <Col sm={12} md={12}>
            <h5>{t('page.userProfile.userProfile')}</h5>
          </Col>
          <Col sm={12} md={12} style={{ marginTop: '2rem' }}>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{t('main.text.walletConnect')}</h4>
                  </div>
                  <div className={styles.card_txt1}>
                    <TextOverflowTips text={walletAddress} />
                    {walletAddressList.length ? 
                      <div style={{textAlign: 'right'}}>
                        <span className={styles.card_txt2} style={{fontWeight: 'normal'}}>{t('page.userProfile.viewAll')} ({walletAddressList.length})</span>
                        <Button
                          className={styles.card_btn}
                          variant="link"
                          onClick={() => handleToggle(1)}
                          aria-controls="collapseExample1"
                          aria-expanded={activeIndex === 1}
                        >
                          {activeIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}
                        </Button>
                      </div> : ''
                    }
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 1}>
                <div id="collapseExample1">
                  <Card.Body className={styles.card_body}>
                    <Row className='mt-2'>
                      {walletAddressList.map((item, index) => {
                        return <Col key={index}>{item.walletAddress}</Col>
                      })}
                    </Row>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{t('main.text.appleID')}</h4>
                  </div>
                  <div className={styles.card_txt1}>
                    <TextOverflowTips text={appleIdName} />
                  </div>
              </div>
              </Card.Body>
            </Card>
            {/* <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{t('main.text.personalInfo')}</h4>
                  </div>
                  <div className={styles.card_txt1} style={{display: 'flex'}}>
                    <><TextOverflowTips text={personalInfo} /></>
                    <Button className={styles.btn_save} style={{marginLeft: '10px'}} size="sm" onClick={() => handlePersonalInfoEdit()}>
                      {personalInfo ? t("button.edit") : t("button.add")}
                    </Button>
                  </div>
              </div>
              </Card.Body>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{t('page.userProfile.personalWebsite')}</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>{t('page.userProfile.viewAll')} ({dataPersonalwebsite.length})</span>
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(3)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 3}
                    >
                      {activeIndex === 3 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 3}>
                <div id="collapseExample3">
                  <Card.Body className={styles.card_body}>
                    {dataPersonalwebsite.map((item, index) => {
                      return <Row key={index} style={{marginBottom: '10px'}}>
                        <Col xs={12} sm={4}>{t("page.userProfile.URL")}:{item.URL}</Col>
                        <Col xs={12} sm={4}>{t("main.text.description")}:{item.description}</Col>
                        <Col xs={12} sm={4} style={{textAlign: 'right'}}>
                          <Button className={styles.btn_save} size="sm" onClick={() => handleEdit(item)}>{t("button.edit")}</Button>
                          <Button className='btn_danger' size="sm" onClick={() => handleDeleteConfrim(item)}>{t("button.delete")}</Button>
                        </Col>
                      </Row>
                    })}
                    <div style={{textAlign: 'right'}}>
                      <span className={styles.card_txt2}>{t('button.addNew')}</span>
                      <Button
                        className={styles.card_btn}
                        variant="link"
                        onClick={addPersonalwebsite}
                      >
                        {isAddPersonalwebsite ? <FaTimes /> : <FaPlus />}
                      </Button>
                    </div>
                    {isAddPersonalwebsite ?                   
                      <Form onSubmit={savePersonalWebsite}>
                        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="URL">
                          <Form.Label className={styles.form_label}>{t('page.userProfile.websiteURL')}</Form.Label>
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
                            {errorUrlType === 1 ? 
                                t('error.info.websiteURLCannotBeEmpty')
                              : (errorUrlType === 2 ? 
                                  t('error.info.websiteURLIsNotRight')
                                : '')
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="description">
                          <Form.Label className={styles.form_label}>{t('page.userProfile.description')}</Form.Label>
                          <Form.Control
                            className={styles.form_control}
                            type="text"
                            as="textarea"
                            placeholder=""
                            name="description"
                            value={formData.description}
                            isInvalid={formErrors.description}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback
                            className={styles.form_feedback}
                            type="invalid"
                          >
                            {errorDescriptionType === 1 ? 
                                t('error.info.descriptionCannotBeEmpty')
                              : (errorDescriptionType === 2 ? 
                                  t('error.info.descriptionCannotExceed500Words')
                                : '')
                            }
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
                              {t('page.userProfile.automaticallyFill')}
                            </Col>
                            <Col xs={12} md={6} style={{ textAlign: 'right'}}>                      
                              <Button variant="primary" type="button" className={styles.btn_save} onClick={savePersonalWebsite}>
                                {t('button.save')}
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                      : ''
                    }
                  </Card.Body>
                </div>
              </Collapse>
            </Card> */}
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{t('page.userProfile.submittedArtworks')}</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>{t('page.userProfile.viewAll')} ({dataArtwork.length})</span>
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
                            <div className={styles.image_item} onClick={() => handleModal(t('page.userProfile.artworkInformation'), item, false)}>
                              <div className={styles.item_cover}>{t('page.userProfile.viewDetails')}</div>
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
                    <h4>{t('page.userProfile.ownedNFTs')}</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>{t('page.userProfile.viewAll')} ({dataOwnedMintpass.length})</span>
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
                      {dataOwnedMintpass.map((item, key) => {
                        return <div key={key} className={styles.list_item}><a href={"https://testnets.opensea.io/assets/mumbai/0x627721833e29dacd5ec000fe17f2d46dada19f28/"+item.tokenId} target="_blank">{item.name} <Image src="/share.gif" /></a></div>
                      })}
                    </Row>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Card style={{ border: 'none' }}>
              <Card.Body className={styles.card_item}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{t('page.userProfile.ownedMintpass')}</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>{t('page.userProfile.viewAll')} ({dataOwnedNFTs.length})</span>
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
                    <Row className='mt-2'>
                      {
                        dataOwnedNFTs.map((item, key) => (
                          <Col xs={6} sm={4} md={3} lg={2} key={key}>
                            {/* <Image src={d.image} className={styles.GalleryPageImages} /> */}
                            <div className={styles.image_item} onClick={() => handleModal(t('page.userProfile.nFTInformation'), item, true)}>
                              <div className={styles.item_cover}>{t('page.userProfile.viewDetails')}</div>
                              <Image src={item.imageURL} className={styles.item_images} />
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
                    <h4>{t('page.userProfile.joinedEvent')}</h4>
                  </div>
                  <div>
                    <span className={styles.card_txt2}>{t('page.userProfile.viewAll')} ({dataJoinedEvent.length})</span>
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
        <EditPersonalWebsiteModel show={modalEditShow} onHide={() => modalEditClose()} onOk={modalEditSuccess} modal={modalDataEdit} />
        <EditPersonalInfoModel show={modalPersonalInfoEditShow} onHide={() => modalPersonalInfoEditClose()} onOk={modalPersonalInfoEditSuccess} personalInfo={personalInfo} />
        <Modal
          show={modalDeleteShow}
          onHide={() => setModalDeleteShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title>{t("button.delete")}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{t("page.userProfile.URL")}：{objArtWork?.URL}</p>
            <p>{t("main.text.description")}：{objArtWork?.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>{t("button.delete")}</Button>
          </Modal.Footer>
        </Modal>
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