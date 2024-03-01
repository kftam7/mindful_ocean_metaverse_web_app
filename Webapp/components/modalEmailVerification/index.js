import { useEffect, useState } from "react";
import { Button, Modal, Container, Row, Col, Form, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { getHeaders } from '../../utils/utils';
import styles from '../../styles/SubmitPage.module.css';

const ModalEmailVerification = props => {
  const { t, show, onOk, onCancel } = props;
  const apiPort = process.env.APIBaseUrl || '/';
  const [isSuccess, setIsSuccess] = useState(false);
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
  var namePattern = /^[a-z ,.'-]{2,20}$/i
  var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

    if(!namePattern.test(firstName)){
      alert('Please enter the correct format')
      return
    }

    if(!namePattern.test(lastName)){
      alert('Please enter the correct format')
      return
    }

    if(!emailPattern.test(email)){
      alert('Please enter the correct format')
      return
    }

    const params = {
      name: {
        firstName,
        lastName,
      },
      email,
    };

    const appleId = localStorage.getItem("appleId");
    await axios.post(`${apiPort}/mindfulapi/app/submitid/${appleId}`, params, { headers: getHeaders() })
      .then(res => {
        if (res.status === 200) {
          // toast.success(res.data, {
          //   autoClose: 3000,
          //   position: 'top-center',
          //   className: 'custom-toast-success',
          //   hideProgressBar: true,
          // });
          // onOk();
          setIsSuccess(true);
        }
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
        {!isSuccess ? <Modal.Header style={{ padding: '30px 30px 0 30px', border: 0 }}>
          <Modal.Title>{t('main.text.emailVerification')}</Modal.Title>
        </Modal.Header> : ''
        }
        <Modal.Body>
          {isSuccess ?
            <div style={{ textAlign: 'center' }}>
              <div className="modal_text1" dangerouslySetInnerHTML={{ __html: (t('main.text.emailSent')) }} />
            </div>
            :
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
          }
        </Modal.Body>
        {isSuccess ?
          <Modal.Footer style={{ flexDirection: 'column', justifyContent: 'center', paddingBottom: '30px', border: 0 }}>
            <Button onClick={() => onOk()}>{t('button.continue')}</Button>
          </Modal.Footer>
          :
          <Modal.Footer style={{ flexDirection: 'column', justifyContent: 'center', paddingBottom: '30px', border: 0 }}>
            <Button onClick={handleSend}>{t('button.sendVerification')}</Button>
          </Modal.Footer>
        }
      </Modal>
    </>
  )
}

export default ModalEmailVerification;