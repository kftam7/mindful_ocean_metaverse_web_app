import { Row, Col, Image, Button } from 'react-bootstrap';

const Part12 = ({ t }) => {

  return (
    <div class="part_box" id="game">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <Row>
            <Col lg={{ span: 6, order: 'last' }} md={{ span: 6, order: 'last' }} sm={{ span: 12, order: 'first' }} xs={{ span: 12, order: 'first' }}>
              <Image src="/part12_img.png" width="100%" />
            </Col>
            <Col lg={{ span: 6, order: 'first' }} md={{ span: 6, order: 'first' }} sm={{ span: 12, order: 'last' }} xs={{ span: 12, order: 'last' }}>
              <div className='part_title'><a href='https://youtu.be/L6gCqW7a2Vo' target='_blank'>{t('home.part12.title')}</a></div>
              <div className='part_text'>
                {t('home.part12.text1')}<br/>
              </div>
              <div className='part_text'>
              {t('home.part12.text2')}<u><a href='https://www.mindful-ocean.org/event?eventId=34' target='_self'>{t('home.part12.text3')}</a></u>{t('home.part12.text4')}<u><a href='https://www.mindful-ocean.org/event?eventId=33' target='_self'>{t('home.part12.text5')}</a></u>{t('home.part12.text6')}
              </div>              
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part12;