import { Row, Col, Image, Button } from 'react-bootstrap';

const Part4 = ({ t }) => {

  return (
    <div class="part_box_default">
      <div className='part_pannel'>
        <div class="container">
          <div className='part_title2'>{t('home.part4.title1')}</div>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>{t('home.part4.subTitle1')}</div>
                  <div className='part_text'>
                    {t('home.part4.subText1')}
                  </div>
                  <div className='part_btn'><Button variant="outline-primary" onClick={() => window.location.href = '/event?eventId=1'}>{t('button.learnMore')}</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img1.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>{t('home.part4.subTitle2')}</div>
                  <div className='part_text'>
                    {t('home.part4.subText2')}
                  </div>
                  <div className='part_btn'><Button variant="outline-primary" onClick={() => window.location.href = '/event?eventId=2'}>{t('button.learnMore')}</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img2.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>{t('home.part4.subTitle3')}</div>
                  <div className='part_text'>
                    {t('home.part4.subText3')}
                  </div>
                  <div className='part_btn'><Button variant="outline-primary" onClick={() => window.location.href = '/event?eventId=3'}>{t('button.learnMore')}</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img3.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>{t('home.part4.subTitle4')}</div>
                  <div className='part_text'>
                    {t('home.part4.subText4')}
                  </div>
                  <div className='part_btn'><Button variant="outline-primary" onClick={() => window.location.href = '/event?eventId=4'}>{t('button.learnMore')}</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img4.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>{t('home.part4.subTitle5')}</div>
                  <div className='part_text'>
                    {t('home.part4.subText5')}
                  </div>
                  <div className='part_btn'><Button variant="outline-primary" onClick={() => window.location.href = '/event?eventId=5'}>{t('button.learnMore')}</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img5.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>{t('home.part4.subTitle6')}</div>
                  <div className='part_text'>
                    {t('home.part4.subText6')}
                  </div>
                  <div className='part_btn'><Button variant="outline-primary" onClick={() => window.location.href = '/event?eventId=6'}>{t('button.learnMore')}</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img6.png" /></div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part4;