import { Button, Col, Container, Modal, Row, Nav } from 'react-bootstrap';

const ModalCookies = props => {
  const {t, show, setShow, onCancel} = props;
  const handleClose = () => setShow(false);

  return(
    <Modal
      className='modal_cookies'
      size="lg"
      scrollable
      backdrop="static"
      fullscreen={true}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>{t('main.text.cookies')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col span={6}>XXXXXXXXX</Col>
            <Col span={6}><Nav.Link href="https://www.iubenda.com/privacy-policy/43680858" target='_blank' style={{textDecoration: 'underline', display: 'inline-block'}}>{t('main.text.privacyPolices')}</Nav.Link></Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}>{t('button.acceptAll')}</Button>
        <Button variant="light" onClick={handleClose}>{t('button.declineAll')}</Button>
      </Modal.Footer>
  </Modal>
  )
}

export default ModalCookies;