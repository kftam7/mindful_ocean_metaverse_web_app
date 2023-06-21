import { useState, useEffect } from "react";
import { Container, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from '../../i18n';
import { getAppleId, getHeaders } from '../../utils/utils';
import styles from '../../styles/UserProfilePage.module.css';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

function EditPersonalInfoModel(props) {
  const { t, locale } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const { show, personalInfo, onOk } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    personInfo: "",
  });
  
  const [formErrors, setFormErrors] = useState({
    personInfo: false,
  });
  const [errorPersonalInfoType, setErrorPersonalInfoType] = useState(1); //1：空值

  useEffect(() => {
    if(!personalInfo || !show) return;
    setFormData({
      personInfo: personalInfo
    })
  },[personalInfo, show]);

  useEffect(() => {
    if(show) return;
    resetForm();
  },[show]);

  const resetForm = () => {
    const data = {
      personInfo: ''
    }
    setFormData(data);
    const dataError = {
      personInfo: false
    }
    setFormErrors(dataError);
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
    const { personInfo } = formData;
    let crossPersonalInfo = true;

    if(!personInfo){
      setErrorPersonalInfoType(1);
      crossPersonalInfo = true;
    }else{
      setErrorPersonalInfoType(0);
      crossPersonalInfo = false;
    }

    const newFormErrors = {
      personInfo: crossPersonalInfo
    };
    setFormErrors(newFormErrors);
    if(crossPersonalInfo) return;

    const params = {
      personInfo
    };
    setLoading(true);

    await axios.put(`${apiPort}/mindfulapi/app/userpersonalinfo/${getAppleId()}`, params, {headers: getHeaders()})
    .then(res => {
      const {data} = res;
      if(data.message){
        toast.success(data.message, {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-success',
          hideProgressBar: true,
        });
        onOk();
        setLoading(false);
      }else{
        toast.error(data, {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-success',
          hideProgressBar: true,
        });
        setLoading(false);
      }
    })
    .catch(err => {
      setLoading(false);
      console.log(err)
    })
  };

  return (
    <Modal {...props}  size="md" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("button.edit")} {t('main.text.personalInfo')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
        <Form onSubmit={savePersonalWebsite}>
          <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="personInfo">
            <Form.Label className={styles.form_label}>{t('main.text.personalInfo')}</Form.Label>
            <Form.Control
              className={styles.form_control}
              type="text"
              placeholder=""
              name="personInfo"
              value={formData.personInfo}
              isInvalid={formErrors.personInfo}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback
              className={styles.form_feedback}
              type="invalid"
            >
              {errorPersonalInfoType === 1 ? 
                  t('error.info.personalInfoCannotBeEmpty')
                : ''
              }
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ clear: 'both', paddingTop: '20px' }}>
            <Row>
              <Col xs={12} style={{ textAlign: 'right'}}>                      
                <Button variant="primary" type="button" disabled={loading} className={styles.btn_save} onClick={savePersonalWebsite}>
                  {t('button.save')}
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default EditPersonalInfoModel;
