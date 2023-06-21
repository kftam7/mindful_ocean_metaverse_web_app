import { useEffect, useState } from "react";
import { Row, Button, Modal, Form } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import { useTranslation } from '../../i18n';

const SubmitModal = ({submitShow,setSubmitShow, artworkId }) => {
  const { t, locale } = useTranslation();
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [confirmShow, setConfirmShow] = useState(false);

  useEffect(() => {
    if(!checkbox1 || !checkbox2) return setDisabled(true);
    setDisabled(false);
  },[checkbox1, checkbox2]);

  const handleConfirmClose = () => {
    setSubmitShow(false);
    resetForm();
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if(name === 'checkbox1'){
      setCheckbox1(checked);
    }
    if(name === 'checkbox2'){
      setCheckbox2(checked);
    }
  };

  const resetForm = () => {
    setCheckbox1(false);
    setCheckbox2(false);
    setDisabled(true);
  };
  
  return (
    <>
      <Modal show={submitShow} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('button.submit')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='mb-3'>
          <p>{t('page.mintpass.submission.readTheDisclaimerHere')}</p>
          <Form>
            <Form.Group className="align-items-center form_group" controlId="checkbox1">
              <Form.Check
                className='form_Check'
                type="checkbox"
                placeholder=""
                name="checkbox1"
                value={checkbox1}
                onChange={handleChange}
              />
              <Form.Label className='form_label'>{t('page.mintpass.submission.iOwnTheCopyright')}</Form.Label>
            </Form.Group>
            <Form.Group className="align-items-center form_group" controlId="checkbox2">
              <Form.Check
                className='form_Check'
                type="checkbox"
                placeholder=""
                name="checkbox2"
                value={checkbox2}
                onChange={handleChange}
              />
              <Form.Label className='form_label'>{t('page.mintpass.submission.thereIsNoInappropriateContentInMyArtwork')}</Form.Label>
            </Form.Group>
          </Form>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Button className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}} disabled={disabled} 
            onClick={() => {
              setSubmitShow(false);
              setConfirmShow(true);
              resetForm();
            }}
          >{t('button.continue')}</Button>
        </Row>
        </Modal.Body>
      </Modal>
      {/* confirm modal */}
      <ConfirmModal setConfirmShow={setConfirmShow} confirmShow={confirmShow} artworkId={artworkId} />
    </>
  )
}

export default SubmitModal;