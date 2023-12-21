import { Row, Col, Image } from 'react-bootstrap';

const Part3_1 = ({ t }) => {

  return (
    <div className='part_pannel bg_blue'>
      <div class="container">
        <div className='part_title2'>Mindful Ocean Art-Making Events</div>
        <div className='part_title3'>Currently, we have three types of art-making events</div>
        <div className='part3_1_list'>
          <Row>
            <Col lg={4} md={4} sm={12} className='list_item'>
              <div className='item_step'>01</div>
              <div className='item_txt'>The Mindful Ocean ArtContests</div>
            </Col>
            <Col lg={4} md={4} sm={12} className='list_item'>
              <div className='item_step'>02</div>
              <div className='item_txt'>The“No Fish Tomorrow?”Social Media Contests</div>
            </Col>
            <Col lg={4} md={4} sm={12} className='list_item'>
              <div className='item_step'>03</div>
              <div className='item_txt'>The“Adopt a Fish”Crowdfunding Events forFeatured Artists</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part3_1;