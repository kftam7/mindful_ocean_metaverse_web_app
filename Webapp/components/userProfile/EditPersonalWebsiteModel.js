import { useState, useEffect } from "react";
import { Container, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from '../../i18n';
import { getHeaders } from '../../utils/utils';
import styles from '../../styles/UserProfilePage.module.css';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

function UserProfileModal(props) {
  const { t, locale } = useTranslation();
  const apiPort = process.env.API_PORT || '/';
  const { show, modal, onOk } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    URL: "",
    description: ""
  });
  
  const [formErrors, setFormErrors] = useState({
    URL: false,
    description: false
  });

  useEffect(() => {
    if(!modal || !show) return;
    setFormData({
      URL: modal.URL,
      description: modal.description
    })
  },[modal, show]);

  useEffect(() => {
    if(show) return;
    resetForm();
  },[show]);

  const resetForm = () => {
    const data = {
      URL: '',
      description: ''
    }
    setFormData(data);
    const dataError = {
      URL: false,
      description: false
    }
    setFormErrors(dataError);
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
    const { URL, description } = formData;
    const newFormErrors = {
      URL: !URL,
      description: !description
    };
    setFormErrors(newFormErrors);

    if(!URL || !description) return;

    const params = {
      URL,
      description,
    };

    setLoading(true);

    await axios.put(`${apiPort}/mindfulapi/app/personalwebsite/${modal.websiteId}`, params, {headers: getHeaders()})
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
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  return (
    <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("button.edit")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
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
              {t('error.info.websiteURLCannotBeEmpty')}
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
              {t('error.info.descriptionCannotBeEmpty')}
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ clear: 'both', paddingTop: '20px' }}>
            <Row>
              <Col xs={12} md={8}>
                <span
                  className={isChecked ? `${styles.custom_switch} ${styles.active}` : styles.custom_switch}
                  onClick={handleSwitchChange}
                >
                  <span className={styles.switch_handle}></span>
                </span>
                {t('page.userProfile.automaticallyFill')}
              </Col>
              <Col xs={12} md={4} style={{ textAlign: 'right'}}>                      
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

export default UserProfileModal;
