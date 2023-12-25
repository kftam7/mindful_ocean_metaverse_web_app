import { Row, Col, Image, Button } from 'react-bootstrap';

const Part6 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container">
          <div className='part_title2'>{t('home.part6.title1')}</div>
          <Row>
            <Col lg={3} md={4} sm={12}>
              <Image src="/part6_img1.png" width="100%" />
            </Col>
            <Col lg={9} md={8} sm={12}>
              <div className='part_title3'>{t('home.part6.title2')} <a href="https://www.linkedin.com/in/yatsiu/" target="_blank"> <Button variant="outline-primary">{t('button.linkedin')}</Button> </a> <a href="https://www.ted.com/speakers/yat_siu" target="_blank"> <Button variant="outline-primary">{t('button.tedTalk')}</Button> </a> </div>
              <div className='part_title'>{t('home.part6.subTitle1')}</div>
              <div className='part_text'>
                {t('home.part6.subText1')}
              </div>
            </Col>
          </Row>
        </div>
        <div className='part6_bg'>
          <Image src="/part6_bg1.png" />
        </div>
      </div>
    </div>
  )
}

export default Part6;