import { useState, useEffect } from "react";
import { Container, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from '../../i18n';
import { getAppleId, getHeaders } from '../../utils/utils';
import styles from '../../styles/UserProfilePage.module.css';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

function EditAppleIdNameModel(props) {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const { show, firstname, lastname, onOk } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
  });
  const [errorFirstNameType, setErrorFirstNameType] = useState(1); //1：空值
  const [errorLastNameType, setErrorLastNameType] = useState(1); //1：空值
  var namePattern = /^[a-z ,.'-]{2,20}$/i
  
  useEffect(() => {
    if(!show) return;
    setFormData({
      firstName: firstname,
      lastName: lastname
    })
  },[show]);

  useEffect(() => {
    if(show) return;
    resetForm()
  },[show]);

  const resetForm = () => {
    const data = {
      firstName: '',
      lastName: ''
    }
    setFormData(data);
    const dataError = {
      firstName: false,
      lastName: false
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

  const saveUserName = async (event) => {
    event.preventDefault();
    // 从 formData 对象中获取表单的值
    const { firstName, lastName } = formData;
    let crossFirstName = true;
    let crossLastName = true;

    if(!firstName){
      setErrorFirstNameType(1);
      crossFirstName = true;
    }else{
      setErrorFirstNameType(0);
      crossFirstName = false;
    }

    if(!lastName){
      setErrorLastNameType(1);
      crossLastName = true;
    }else{
      setErrorLastNameType(0);
      crossLastName = false;
    }

    const newFormErrors = {
      firstName: crossFirstName,
      lastName: crossLastName
    };
    setFormErrors(newFormErrors);
    if(crossFirstName || crossLastName) return;    

    if(!namePattern.test(firstName)){
      alert(t('main.text.pleaseEnterTheCorrectFormat'))
      return
    }

    if(!namePattern.test(lastName)){
      alert(t('main.text.pleaseEnterTheCorrectFormat'))
      return
    }

    const params = {
      firstName,
      lastName
    };
    setLoading(true);

    await axios.put(`${apiPort}/mindfulapi/app/user/${getAppleId()}`, params, {headers: getHeaders()})
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
          {t("button.edit")} {t('main.text.appleIdName')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
        <Form onSubmit={saveUserName}>
          <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="firstName">
            <Form.Label className={styles.form_label}>{t('main.text.firstName')}</Form.Label>
            <Form.Control
              className={styles.form_control}
              type="text"
              placeholder=""
              name="firstName"
              value={formData.firstName}
              isInvalid={formErrors.firstName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback
              className={styles.form_feedback}
              type="invalid"
            >
              {errorFirstNameType === 1 ? 
                  t('error.info.firstNameCannotBeEmpty')
                : ''
              }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="align-items-center form_group mb-3 clearfix" controlId="lastName">
            <Form.Label className={styles.form_label}>{t('main.text.lastName')}</Form.Label>
            <Form.Control
              className={styles.form_control}
              type="text"
              placeholder=""
              name="lastName"
              value={formData.lastName}
              isInvalid={formErrors.lastName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback
              className={styles.form_feedback}
              type="invalid"
            >
              {errorLastNameType === 1 ? 
                  t('error.info.lastNameCannotBeEmpty')
                : ''
              }
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ clear: 'both', paddingTop: '20px' }}>
            <Row>
              <Col xs={12} style={{ textAlign: 'right'}}>                      
                <Button variant="primary" type="button" disabled={loading} className={styles.btn_save} onClick={saveUserName}>
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

export default EditAppleIdNameModel;
