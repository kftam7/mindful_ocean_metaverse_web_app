import { useEffect, useState } from "react";
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { getHeaders } from '../../utils/utils';
import styles from '../../styles/SubmitPage.module.css';

const ModalEmailVerification = props => {
  const { t, show, onOk, onCancel } = props;
  const apiPort = process.env.APIBaseUrl || '/';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const handleSend = async (event) => {
    event.preventDefault();
    // 从 formData 对象中获取表单的值
    const { firstName, lastName, email } = formData;
    const newFormErrors = {
      firstName: !firstName,
      lastName: !lastName,
      email: !email,
    };
    setFormErrors(newFormErrors);

    if (!firstName || !lastName || !email) return;

    const params = {
      name: {
        firstName,
        lastName,
      },
      email,
    };
    
    const appleId = sessionStorage.getItem("appleId");
    await axios.post(`${apiPort}/mindfulapi/app/submitid/${appleId}`, params, { headers: getHeaders() })
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data, {
            autoClose: 3000,
            position: 'top-center',
            className: 'custom-toast-success',
            hideProgressBar: true,
          });
        }
        onOk();
      })
      .catch(err => {
        console.log(err)
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

  return (
    <>
      <ToastContainer />
      <Modal
        size="md"
        scrollable
        backdrop="static"
        show={show}
        onHide={onCancel}
      >
        <Modal.Header closeButton style={{ padding: '30px 30px 0 30px', border: 0 }}>
          <Modal.Title>{t('Email Verification')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col span={12}>
                <Form onSubmit={handleSend}>
                  <Form.Group className="align-items-center form_group" controlId="firstName">
                    <Form.Label className='form_label'>{t('First name')}:</Form.Label>
                    <Form.Control
                      className={styles.form_control}
                      type="text"
                      placeholder="First name"
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
                      {t('First name Can not Be Empty')}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Col>
              <Col span={12}>
                <Form onSubmit={handleSend}>
                  <Form.Group className="align-items-center form_group" controlId="lastName">
                    <Form.Label className='form_label'>{t('Last name')}:</Form.Label>
                    <Form.Control
                      className={styles.form_control}
                      type="text"
                      placeholder="Last name"
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
                      {t('Last name Can not Be Empty')}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col span={24}>
                <Form onSubmit={handleSend}>
                  <Form.Group className="align-items-center form_group" controlId="email">
                    <Form.Label className='form_label'>{t('Email')}:</Form.Label>
                    <Form.Control
                      className={styles.form_control}
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      isInvalid={formErrors.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      className={styles.form_feedback}
                      type="invalid"
                    >
                      {t('Email Can not Be Empty')}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center', paddingBottom: '30px', border: 0 }}>
          <Button onClick={handleSend}>{t('send')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEmailVerification;