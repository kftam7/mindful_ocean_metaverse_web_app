import { Row, Col, Image } from 'react-bootstrap';

const Part1 = ({ t }) => {

  return (
    <div class="part_box" id="about">
      <div className='part_pannel'>
        <div class="container">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Image src="/part1_img1.jpg" width="100%" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part_title'>{t('home.part1.title1')}</div>
              <div className='part_text'>
                <p>{t('home.part1.text1')}</p>
                <p>{t('home.part1.text2')}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className='part1_bg'>
          <Image src="/measuredBoxes/2.png" />
        </div>
      </div>
    </div>
  )
}

export default Part1;