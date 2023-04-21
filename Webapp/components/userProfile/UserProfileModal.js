import { Container, Modal, Button, Row, Col, Image } from 'react-bootstrap';

function UserProfileModal(props) {
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
                <div className='modal_title'>Description:</div>
                <div className='modal_indent'>{modal?.description}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>Personal lnformation:</div>
                <div className='modal_indent'>{modal?.peronsalInfo}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>Artist Apple ID:</div>
                <div className='modal_indent'>{modal?.artistAppleId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>Event ID:</div>
                <div className='modal_indent'>{modal?.eventId}</div>
            </Col>
            <Col sm={12}>
                <div className='modal_title'>Mintpass lD:</div>
                <div className='modal_indent'>{modal?.mintpassld}</div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {modal?.isShare ? 
        <Modal.Footer>
          <div style={{ flex: '1', textAlign: 'center' }}><a href='' target='_blank'>View NFT on Opensea <Image src="/share.gif" /></a></div>
        </Modal.Footer>
        : ''
      }
    </Modal>
  );
}

export default UserProfileModal;
