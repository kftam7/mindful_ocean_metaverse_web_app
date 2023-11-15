import { Row, Col, Image } from 'react-bootstrap';

const Part3 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Image src="/part3_img1.png" width="100%" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part_title'>How can we save our ocean by making art?</div>
              <div className='part_text'>
                We believe art-making can cultivate mindfulness, empathy, and creativity, which can improve our well-being, empower us to make better life-changing decisions, and facilitate the development of innovative solutions for ocean conservation. Our community art project aims at nurturing peoples' empathy towards marine life, and raising funds to carry out urgent actions that can save our ocean.
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

export default Part3;