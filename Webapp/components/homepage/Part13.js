import { Row, Col, Image } from 'react-bootstrap';

const Part13 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Image src="/part13_img.png" width="100%" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part_title'>{t('home.part13.title')}</div>
              <div className='part_text'>
                {t('home.part13.text')}
              </div>
            </Col>
          </Row>
        </div>
        <div className='part3_bg'>
          <Image src="/measuredBoxes/1.png" />
        </div>
      </div>
    </div>
  )
}

export default Part13;