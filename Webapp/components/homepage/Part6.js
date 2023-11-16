import { Row, Col, Image, Button } from 'react-bootstrap';

const Part6 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <div className='part_title2'>{t('home.part6.title1')}</div>
          <Row>
            <Col lg={3} md={4} sm={12}>
              <Image src="/part6_img1.png" width="100%" />
            </Col>
            <Col lg={9} md={8} sm={12}>
              <div className='part_title3'>{t('home.part6.title2')} <Button variant="outline-primary">{t('button.linkedin')}</Button> <Button variant="outline-primary">{t('button.tedTalk')}</Button></div>
              <div className='part_title'>{t('home.part6.subTitle1')}</div>
              <div className='part_text'>
                {t('home.part6.subText1')}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part6;