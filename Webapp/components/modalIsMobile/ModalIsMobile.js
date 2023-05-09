import { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Collapse, Card } from 'react-bootstrap';
import { useTranslation } from '../../i18n';

const ModalIsMobile = ({show, setShow}) => {
  const { t, locale } = useTranslation();
 const handleClose = () => setShow(false);

 return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
        <Modal.Body>
          <div className="text-center">
              <div className="modal_title">{t('main.text.submitThroughComputer')}</div>
              <div className=""><img src="./img1.jpg" /></div>
              <div className="">{t('main.text.loginFromYourComputerForABetterExperience')}</div>
            </div>
        </Modal.Body>
  </Modal>
 )
}

export default ModalIsMobile;