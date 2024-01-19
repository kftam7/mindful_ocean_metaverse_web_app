import { Row, Col, Image } from 'react-bootstrap';

const Part3_1 = ({ t }) => {

  return (
    <div className='part_pannel bg_blue'>
      <div class="container">
        <div className='part_title2'>{t('home.part3.event.text1')}</div>
        <div className='part_title3'>{t('home.part3.event.text2')}</div>
        <div className='part3_1_list'>
          <Row>
            <Col lg={4} md={4} sm={12} className='list_item'>
              <div className='item_step'>01</div>
              <div className='item_txt'>{t('home.part3.event.text3')}</div>
            </Col>
            <Col lg={4} md={4} sm={12} className='list_item'>
              <div className='item_step'>02</div>
              <div className='item_txt'>{t('home.part3.event.text4')}</div>
            </Col>
            <Col lg={4} md={4} sm={12} className='list_item'>
              <div className='item_step'>03</div>
              <div className='item_txt'>{t('home.part3.event.text5')}</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part3_1;