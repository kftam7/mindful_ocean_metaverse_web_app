import { useState } from 'react';
import { Row, Col, Image, Modal } from 'react-bootstrap';

const Part8 = ({ t }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div class="part_box">
      <div className='part_pannel bg_blue'>
        <div class="container text-center">
          <Row>
            <Col lg={4} xs={12} style={{ margin: '20px 0' }}>
              {/* <a href='/contactUs' className='part11_link'>{t('nav.contactUs')}</a> */}
              <a href='https://www.iubenda.com/privacy-policy/43680858/full-legal' target='_blank' className='part11_link'>{t('nav.privacyPolicy')}</a>
              <a href='javascript: void(0)' className='part11_link' onClick={() => setShow(true)}>{t('nav.appStore')}</a>
            </Col>
            <Col lg={4} xs={12} style={{ margin: '20px 0' }}><div className='part11_logo'><Image src="/logo.png" /></div></Col>
            <Col lg={4} xs={12} style={{ margin: '20px 0' }}>
              <a href='/faq' className='part11_link'>{t('nav.faq')}</a>
              <a href='/Mindful Ocean Website TC.pdf' target='_blank' className='part11_link'>{t('nav.termsConditions')}</a>
            </Col>
          </Row>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ border: 0 }}>
        </Modal.Header>
        <Modal.Body><a href='https://apps.apple.com/app/mindful-ocean-metaverse/id6464570212?l=en-GB' target='_blank'><Image src="/appStore_new.png" width="100%" style={{ padding: '10px' }} /></a></Modal.Body>
      </Modal>
    </div>
  )
}

export default Part8;