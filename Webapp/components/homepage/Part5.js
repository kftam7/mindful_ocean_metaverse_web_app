import { Row, Col, Image } from 'react-bootstrap';

const Part5 = ({ t }) => {

  return (
    <div class="part_box_default">
      <div className='part_pannel'>
        <div class="container">
          <div className='part_title2'>How can we support more people to make art and save our ocean?</div>
          <div className='part_title3'>Proceeds generated from this project will be used in the following major areas:</div>
          <Row>
            <Col lg={4} md={4} sm={12}>
              <div className=''><Image src="/part5_img1.png" width="100%" /></div>
              <div className='part_title'>Make Donations</div>
              <div className='part_text'>
                To support organizations active in ocean conservation, sustainability education, and art education to carry out their projects.
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className=''><Image src="/part5_img2.png" width="100%" /></div>
              <div className='part_title'>Reward Artists</div>
              <div className='part_text'>
                To encourage more people to make art.
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className=''><Image src="/part5_img3.png" width="100%" /></div>
              <div className='part_title'>Fund Our Project</div>
              <div className='part_text'>
                For development and operation.
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