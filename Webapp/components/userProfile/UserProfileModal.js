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
                <div className='modal_title'>{t('main.text.walletAddress')}:</div>
                <div className='modal_indent'>{modal?.walletAddress}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('page.redeem.eventID')}:</div>
                <div className='modal_indent'>{modal?.eventId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.artistMessage')}:</div>
                <div className='modal_indent'>{modal?.artistMessage}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.authenticScarcity')}:</div>
                <div className='modal_indent'>{modal?.authenticScarcity}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.scarcityRank')}:</div>
                <div className='modal_indent'>{modal?.scarcityRank}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.clusterID')}:</div>
                <div className='modal_indent'>{modal?.clusterId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.clusterSize')}:</div>
                <div className='modal_indent'>{modal?.clusterSize}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.superClusterID')}:</div>
                <div className='modal_indent'>{modal?.superClusterId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>{t('main.text.superClusterSize')}:</div>
                <div className='modal_indent'>{modal?.superClusterSize}</div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {modal?.isShare ? 
        <Modal.Footer>
          <div style={{ flex: '1', textAlign: 'center' }}><a href={"https://testnets.opensea.io/assets/mumbai/0xF07de37BB25395A5C0031a8c120e11B972c69eEa/"+modal?.tokenId} target='_blank'>{t('page.userProfile.viewNFTOnOpensea')} <Image src="/share.gif" /></a></div>
        </Modal.Footer>
        : ''
      }
    </Modal>
  );
}

export default UserProfileModal;
