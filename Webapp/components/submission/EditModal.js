import { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';
import axios from 'axios';
import { useTranslation } from '../../i18n';
import { getHeaders, timeFormat } from '../../utils/utils';
import { toast, ToastContainer } from "react-toastify";

const EditModal = props => {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const {data, editShow, setEditShow, onSuccess} = props;

  useEffect(() => {
    if(!data) return;
    setFormData({
      artistMessage: data.artistMessage
    })
  },[data])

  const handleEditClose = () => {
    setEditShow(false);
    resetForm();
  }
  const [formData, setFormData] = useState({
    artistMessage: '',
  });
  const [formErrors, setFormErrors] = useState({
    artistMessage: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // 更新 formData 对象中相应的表单值
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const resetForm = () => {
    const data = {
      artistMessage: '',
    }
    setFormData(data);
    const dataError = {
      artistMessage: false,
    }
    setFormErrors(dataError);
  };

  const savePersonalWebsite = async (event) => {
    event.preventDefault();
    // 从 formData 对象中获取表单的值
    const { artistMessage } = formData;
    const newFormErrors = {
      artistMessage: !artistMessage,
    };
    setFormErrors(newFormErrors);

    if(!artistMessage) return;

    const params = {
      ...data,
      artistMessage,
      createTime: timeFormat(new Date(data.createTime)),
      updateTime: timeFormat(new Date())
    };
    await axios.put(`${apiPort}/mindfulapi/app/artwork/${data.artworkId}`, params, {headers: getHeaders()})
    .then(res => {
      const {data} = res;
      if(data.message){
        onSuccess(data.message);
        resetForm();
      }else{
        toast.error(data, {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-success',
          hideProgressBar: true,
        });
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  return (
    <Modal show={editShow} onHide={handleEditClose}>
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title>{t('page.mintpass.submission.editInformation')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row className='mb-3'>
        <p>{t('page.mintpass.submission.supplementaryInformation')}</p>
        <Form onSubmit={savePersonalWebsite}>
          <Form.Group className="align-items-center form_group" controlId="artistMessage">
            <Form.Label className='form_label'>{t('main.text.artistMessage')}:</Form.Label>
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
              {t('error.info.artistMessageCannotBeEmpty')}
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group className="align-items-center form_group" controlId="description">
            <Form.Label className='form_label'>{t('main.text.description')}:</Form.Label>
            <Form.Control
              className={styles.form_control}
              type="text"
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
          <Form.Group className="align-items-center form_group" controlId="personal_information">
            <Form.Label className='form_label'>{t('page.mintpass.submission.personalInformation')}:</Form.Label>
            <Form.Control
              className={styles.form_control}
              type="text"
              placeholder=""
              name="personal_information"
              value={formData.personal_information}
              isInvalid={formErrors.personal_information}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback
              className={styles.form_feedback}
              type="invalid"
            >
              {t('error.info.personalInformationCannotBeEmpty')}
            </Form.Control.Feedback>
          </Form.Group> */}
        </Form>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Button className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}} onClick={savePersonalWebsite}>{t('button.save')}</Button>
      </Row>
      </Modal.Body>
    </Modal>
  )
}

export default EditModal;