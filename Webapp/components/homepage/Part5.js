import { Row, Col, Image } from 'react-bootstrap';

const Part5 = ({ t }) => {

  return (
    <div class="part_box_default">
      <div className='part_pannel'>
        <div class="container">
          <div className='part_title2'>{t('home.part5.title1')}</div>
          <div className='part_title3'>{t('home.part5.title2')}</div>
          <Row>
            <Col lg={4} md={4} sm={12}>
              <div className=''><Image src="/part5_img1.png" width="100%" /></div>
              <div className='part_title'>{t('home.part5.subTitle1')}</div>
              <div className='part_text'>
                {t('home.part5.subText1')}
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className=''><Image src="/part5_img2.png" width="100%" /></div>
              <div className='part_title'>{t('home.part5.subTitle2')}</div>
              <div className='part_text'>
                {t('home.part5.subText2')}
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className=''><Image src="/part5_img3.png" width="100%" /></div>
              <div className='part_title'>{t('home.part5.subTitle3')}</div>
              <div className='part_text'>
                {t('home.part5.subText3')}
              </div>
            </Col>
          </Row>
        </div>
        <div className='part5_bg'>
          <Image src="/measuredBoxes/16.png" />
        </div>
      </div>
    </div>
  )
}

export default Part5;