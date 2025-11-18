import { Row, Col, Image, Button } from 'react-bootstrap';

const Part12 = ({ t }) => {

  return (
    <div class="part_box" id="game">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <Row>
            <Col lg={{ span: 6, order: 'last' }} md={{ span: 6, order: 'last' }} sm={{ span: 12, order: 'first' }} xs={{ span: 12, order: 'first' }}>
              <Image src="/part12_img.png" width="100%" />
            </Col>
            <Col lg={{ span: 6, order: 'first' }} md={{ span: 6, order: 'first' }} sm={{ span: 12, order: 'last' }} xs={{ span: 12, order: 'last' }}>
              <div className='part_title'>{t('home.part12.title')}</div>
              <div className='part_text'>
                {t('home.part12.text')}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part12;