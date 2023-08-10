import { useEffect, useState } from "react";
import {Form, Button, Container} from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { getAppleId, getHeaders } from '../utils/utils';
import axios from 'axios';
import { useTranslation } from '../i18n';
import Layout from '../components/SubpageLayout';
import styles from '../styles/Test.module.css';

const TestArtwork = () => {
  const { t, locale } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const [loading, setLoading] = useState(false);
  const [appleId, setAppleId] = useState();
  const [formData, setFormData] = useState({
    eventId: '',
    type: 'fish',
    artistMessage: '',
    extraInfo: '',
    ifHomepage: '0',
    uploadYourFile: '',
    createTime: '2021-01-01 00:00:00',
    updateTime: '2023-06-15 23:58:42'
  });
  const [formErrors, setFormErrors] = useState({
    eventId: false,
    type: false,
    artistMessage: false,
    extraInfo: false,
    ifHomepage: false,
    uploadYourFile: false,
  });
  const [errorNameType, setErrorNameType] = useState(1); //1：空值
  const [errorTypeType, setErrorTypeType] = useState(1); //1：空值
  const [errorDescriptionType, setErrorDescriptionType] = useState(1); //1：空值
  const [errorExtraInfoType, setErrorExtraInfoType] = useState(1); //1：空值
  const [errorIfHomepageType, setErrorIfHomepageType] = useState(1); //1：空值
  const [errorUploadYourFileType, setErrorUploadYourFileType] = useState(1); //1：空值
  // const regURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

  useEffect(() => {
    setAppleId(getAppleId());
  }, []);

  const resetForm = () => {
    const data = {
      eventId: '',
      type: 'fish',
      artistMessage: '',
      extraInfo: '',
      ifHomepage: '0',
      uploadYourFile: '',
      createTime: '',
      updateTime: ''
    }
    setFormData(data);
    
    const dataError = {
      eventId: false,
      type: false,
      artistMessage: false,
      extraInfo: false,
      ifHomepage: false,
      uploadYourFile: false
    }
    setFormErrors(dataError);
  };

  const handleChangeFile = async (e) => {
    setLoading(true);
    const fileLength = e.target.files.length;
    //const fileFullPath = e.target.value.replace(/C:\\fakepath\\/i, "http://127.0.0.1:3001/mindfulapi/app/artworkfile/");
    setFormData({
      ...formData,
      uploadYourFile: e.target.value
      //uploadYourFile: fileFullPath
    })
    setFormErrors({
      ...formErrors,
      uploadYourFile: fileLength ? false : true
    });
    setErrorUploadYourFileType(fileLength ? 0 : 1);

    if(fileLength == 0){
      setLoading(false);
      return;
    }

    const headers = {
      ...getHeaders()
    }
    const file = e.target.files[0];
    const newFormData = new FormData();
    newFormData.append('file', file);
    // return;
    await axios.post(`${apiPort}/mindfulapi/app/artworkfile`, newFormData, {headers})
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
        }
        setLoading(false);
      }
    })
    .catch(err => {
      console.log(err)
      setLoading(false);
    })
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

  const submitArtwork = async (event) => {
    event.preventDefault();
    // 从 formData 对象中获取表单的值
    const { eventId, type, artistMessage, extraInfo, ifHomepage, uploadYourFile, createTime, updateTime } = formData;
    let crossName = true;
    let crossType = true;
    let crossDescription = true;
    let crossExtraInfo = true;
    let crossIfHomepage = true;
    let crossUploadYourFile = true;
    
    // name 规则
    if(!eventId){
      setErrorNameType(1);
      crossName = true;
    }else{
      setErrorNameType(0);
      crossName = false;
    }

    if(!type){
      setErrorTypeType(1);
      crossType = true;
    }else{
      setErrorTypeType(0);
      crossType = false;
    }

    if(!artistMessage){
      setErrorDescriptionType(1);
      crossDescription = true;
    }else{
      setErrorDescriptionType(0);
      crossDescription = false;
    }

    if(!extraInfo){
      setErrorExtraInfoType(1);
      crossExtraInfo = true;
    }else{
      setErrorExtraInfoType(0);
      crossExtraInfo = false;
    }

    if(ifHomepage === ''){
      setErrorIfHomepageType(1);
      crossIfHomepage = true;
    }else{
      setErrorIfHomepageType(0);
      crossIfHomepage = false;
    }

    if(!uploadYourFile){
      setErrorUploadYourFileType(1);
      crossUploadYourFile = true;
    }else{
      setErrorUploadYourFileType(0);
      crossUploadYourFile = false;
    }

    const newFormErrors = {
      eventId: crossName,
      type: crossType,
      artistMessage: crossDescription,
      extraInfo: crossExtraInfo,
      ifHomepage: crossIfHomepage,
      uploadYourFile: crossUploadYourFile
    };
    setFormErrors(newFormErrors);
    if(crossName || crossType || crossDescription || crossExtraInfo || crossIfHomepage || crossUploadYourFile) return;
    
    setLoading(true);
    const params = [{
      appleId,
      eventId,
      type,
      artistMessage,
      extraInfo,
      ifHomepage: +ifHomepage,
      ifMinted: 0,
      ifRedeemed: 0,
      isActive: 1,
      URL: uploadYourFile.replace(/C:\\fakepath\\/i, "http://127.0.0.1:3001/mindfulapi/app/artworkfile/"),
      createTime,
      updateTime
    }];
    await axios.post(`${apiPort}/mindfulapi/app/artwork`, params, {headers: getHeaders()})
    .then(res => {
      if(res.status === 200){
        const {data} = res;
        toast.success('Success', {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-success',
          hideProgressBar: true,
        });
        resetForm();
        setLoading(false);
      }
    })
    .catch(err => {
      console.log(err)
      toast.error(err.message, {
        autoClose: 3000,
        position: 'top-center',
        className: 'custom-toast-success',
        hideProgressBar: true,
      });
      setLoading(false);
    })
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
      <Form onSubmit={submitArtwork}>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="appleId">
          <Form.Label className={styles.form_label}>appleId</Form.Label>
          <Form.Control
            className={styles.form_control}
            type="text"
            placeholder=""
            name="appleId"
            value={appleId}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="eventId">
          <Form.Label className={styles.form_label}>eventId</Form.Label>
          <Form.Control
            className={styles.form_control}
            type="text"
            placeholder=""
            name="eventId"
            value={formData.eventId}
            isInvalid={formErrors.eventId}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback
            className={styles.form_feedback}
            type="invalid"
          >
            {errorNameType === 1 ? 
                'eventId can not empty'
              : ''
            }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="type">
          <Form.Label className={styles.form_label}>type</Form.Label>
          <Form.Control
            className={styles.form_control}
            as="select"
            placeholder=""
            name="type"
            value={formData.type}
            isInvalid={formErrors.type}
            onChange={handleChange}
            required
          >
            <option value='fish'>fish</option>
            <option value='dolphin'>dolphin</option>
            <option value='shark'>shark</option>
          </Form.Control>
          <Form.Control.Feedback
            className={styles.form_feedback}
            type="invalid"
          >
            {errorTypeType === 1 ? 
                'type can not empty'
              : ''
            }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="artistMessage">
          <Form.Label className={styles.form_label}>{t('page.userProfile.artistMessage')}</Form.Label>
          <Form.Control
            className={styles.form_control}
            type="text"
            placeholder=""
            name="artistMessage"
            value={formData.artistMessage}
            isInvalid={formErrors.artistMessage}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback
            className={styles.form_feedback}
            type="invalid"
          >
            {errorDescriptionType === 1 ? 
                t('error.info.artistMessageCannotBeEmpty')
              : ''
            }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="extraInfo">
          <Form.Label className={styles.form_label}>extraInfo</Form.Label>
          <Form.Control
            className={styles.form_control}
            type="text"
            placeholder=""
            name="extraInfo"
            value={formData.extraInfo}
            isInvalid={formErrors.extraInfo}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback
            className={styles.form_feedback}
            type="invalid"
          >
            {errorExtraInfoType === 1 ? 
                'extraInfo can not empty'
              : ''
            }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="ifHomepage">
          <Form.Label className={styles.form_label}>ifHomepage</Form.Label>
          <Form.Control
            className={styles.form_control}
            as="select"
            placeholder=""
            name="ifHomepage"
            value={formData.ifHomepage}
            isInvalid={formErrors.ifHomepage}
            onChange={handleChange}
            required
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
          </Form.Control>
          <Form.Control.Feedback
            className={styles.form_feedback}
            type="invalid"
          >
            {errorIfHomepageType === 1 ? 
                'ifHomepage can not empty'
              : ''
            }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="uploadYourFile">
          <Form.Label className={styles.form_label}>Upload your file</Form.Label>
          <Form.Control
            className={styles.form_control}
            type="file"
            placeholder=""
            name="uploadYourFile"
            value={formData.uploadYourFile}
            isInvalid={formErrors.uploadYourFile}
            onChange={handleChangeFile}
            required
          />
          <Form.Control.Feedback
            className={styles.form_feedback}
            type="invalid"
          >
            {errorUploadYourFileType === 1 ? 
                'Upload your file can not empty'
              : ''
            }
          </Form.Control.Feedback>
        </Form.Group>
        <div style={{ clear: 'both' }}>
          <Button variant="primary" type="button" className={styles.btn_save} onClick={submitArtwork}>
            {t('button.submit')}
          </Button>
        </div>
      </Form>
    </Container>
  )
}

//per-page layout
TestArtwork.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default TestArtwork;