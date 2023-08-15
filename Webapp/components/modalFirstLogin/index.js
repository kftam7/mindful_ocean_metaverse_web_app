import { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Collapse, Card } from 'react-bootstrap';

const ModalFirstLogin = props => {
  const {t, show, setShow, onCancel} = props;
  const handleClose = () => setShow(false);

  return(
    <Modal
      size="lg"
      scrollable
      backdrop="static"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>{t('main.text.termsAndConditions')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You must read and scroll down to accept it<br /><br />
        Our Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
        This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
        This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
        This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
        This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onCancel}>{t('button.declineAndLogOut')}</Button>
        <Button onClick={handleClose}>{t('button.accept')}</Button>
      </Modal.Footer>
  </Modal>
  )
}

export default ModalFirstLogin;