import { Row, Col, Image } from 'react-bootstrap';

const Part1 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Image src="/part1_img1.jpg" width="100%" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part_title'>Mindful Ocean Metaverse<br />
                aims at answering the following questions.</div>
              <div className='part_text'>
                <p>1. How can we cultivate empathy to save marine life?</p>
                <p>2. How can we empower more people to support ocean conservation?</p>
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