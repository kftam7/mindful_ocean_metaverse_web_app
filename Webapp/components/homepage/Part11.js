import { Row, Col, Image } from 'react-bootstrap';

const Part8 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container text-center">
          <Row>
            <Col lg={4} xs={4}><a href='/contactUs' className='part11_link'>{t('nav.contactUs')}</a></Col>
            <Col lg={4} xs={4}><div className='part11_logo'><Image src="/logo.png" /></div></Col>
            <Col lg={4} xs={4}><a href='/faq' className='part11_link'>{t('nav.faq')}</a></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part8;