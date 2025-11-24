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
              <div className='part_title'><a href='https://youtu.be/s0-hbokoUk4' target='_blank'>{t('home.part13.title')}</a></div>
              <div className='part_text'>
                {t('home.part13.text1')}
              </div>
              <div className='part_text'>
              {t('home.part13.text2')}<u><a href='https://www.mindful-ocean.org/event?eventId=33' target='_self'>{t('home.part13.text3')}</a></u>{t('home.part13.text4')}<u><a href='https://www.mindful-ocean.org/event?eventId=34' target='_self'>{t('home.part13.text5')}</a></u>{t('home.part13.text6')}
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