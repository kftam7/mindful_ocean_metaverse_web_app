import { Container, Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from '../../i18n';

function UserProfileModal(props) {
  const { t, locale } = useTranslation();
  const { modal } = props;

  return (
    <Modal {...props}  size="md" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modal?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col sm={12}>
              <div className='modal_indent inner'><Image src={modal?.URL} className='modalImage' /></div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.description')}:</div>
                <div className='modal_indent'>{modal?.description}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('page.redeem.personalInformation')}:</div>
                <div className='modal_indent'>{modal?.peronsalInfo}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('page.redeem.artistAppleID')}:</div>
                <div className='modal_indent'>{modal?.artistAppleId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('page.redeem.eventID')}:</div>
                <div className='modal_indent'>{modal?.eventId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('page.redeem.mintpassID')}:</div>
                <div className='modal_indent'>{modal?.mintpassld}</div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {modal?.isShare ? 
        <Modal.Footer>
          <div style={{ flex: '1', textAlign: 'center' }}><a href='' target='_blank'>{t('page.userProfile.viewNFTOnOpensea')} <Image src="/share.gif" /></a></div>
        </Modal.Footer>
        : ''
      }
    </Modal>
  );
}

export default UserProfileModal;
