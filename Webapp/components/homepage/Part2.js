import { Row, Col, Image, Button } from 'react-bootstrap';

const Part2 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <Row>
            <Col lg={{ span: 6, order: 'last' }} md={{ span: 6, order: 'last' }} sm={{ span: 12, order: 'first' }} xs={{ span: 12, order: 'first' }}>
              <Image src="/part2_img1.jpg" width="100%" />
            </Col>
            <Col lg={{ span: 6, order: 'first' }} md={{ span: 6, order: 'first' }} sm={{ span: 12, order: 'last' }} xs={{ span: 12, order: 'last' }}>
              <div className='part_title'>What is Mindful Ocean Metaverse? <Button variant="outline-primary">{t('button.whitePaper')}</Button></div>
              <div className='part_text'>
                Mindful Ocean Metaverse is a community art project with a mission to save our ocean. We use blockchain, AI, and AR technology to empower anyone to take part in ocean conservation by making art. Our NFT art creation events nurture mindfulness and promote creativity, enabling anyone to easily create NFT artworks that simulate marine life in a co-created virtual space - the Mindful Ocean Metaverse.
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part2;