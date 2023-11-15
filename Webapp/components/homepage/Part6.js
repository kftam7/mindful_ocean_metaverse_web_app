import { Row, Col, Image, Button } from 'react-bootstrap';

const Part6 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <div className='part_title2'>Mindful Ocean Metaverse is a project backed by Yat Siu</div>
          <Row>
            <Col lg={3} md={4} sm={12}>
              <Image src="/part6_img1.png" width="100%" />
            </Col>
            <Col lg={9} md={8} sm={12}>
              <div className='part_title3'>Yat Siu <Button variant="outline-primary">Linkedin</Button> <Button variant="outline-primary">TED Talk</Button></div>
              <div className='part_title'>Award-winning entrepreneur in making art and technology more accessible</div>
              <div className='part_text'>
                Member of the Government Task Force on Promoting Web3 Development in the Hong Kong SAR
                Founder and CEO, Outblaze Limited (Hong Kong Business Awards 2018)
                Chairman Of the Board, Animoca Brands Corporation Limited (One of Fortune Crypto 40)
                Member of the Advisory Board, The British Academy of Film and Television Arts
                Board Member, Asian Youth Orchestra
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Part6;