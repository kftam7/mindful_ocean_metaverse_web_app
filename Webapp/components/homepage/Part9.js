import { useState } from "react";
import { Row, Col, Image, Button } from 'react-bootstrap';
import Router from 'next/router';
import ModalIsMobile from '../../components/modalIsMobile/ModalIsMobile';

const Part9 = ({ t }) => {
  const [show, setShow] = useState(false);

  const determine = () => {
    const isMobile = /Mobile/.test(navigator.userAgent);
    if (isMobile) {
      setShow(true);
    } else {
      Router.push({
        pathname: '/redeem_step1',
      });
    }
  };

  return (
    <div class="part_box" id="redeem">
      <div className='part_pannel'>
        <div class="container">
          <Row>
            <Col lg={{ span: 6, order: 'last' }} md={{ span: 6, order: 'last' }} sm={{ span: 12, order: 'first' }} xs={{ span: 12, order: 'first' }}>
              <Image src="/part9_img1.png" width="100%" />
            </Col>
            <Col lg={{ span: 6, order: 'first' }} md={{ span: 6, order: 'first' }} sm={{ span: 12, order: 'last' }} xs={{ span: 12, order: 'last' }}>
              <div className='part_title2'>Redeem</div>
              <div className='part_text'>
                Redeem and reveal your own artwork NFT if you own a Mint Pass. You can get a Mint Pass by submitting an artwork on Mindful Ocean App or purchase directly on OpenSea.
              </div>
              <div className='part_btn'><Button variant="outline-primary" onClick={determine}>{t('button.redeem')}</Button></div>
            </Col>
          </Row>
        </div>
      </div>
      <div className='part9_bg'>
        <Image src="/measuredBoxes/18.png" />
      </div>
      <ModalIsMobile setShow={setShow} show={show} />
    </div>
  )
}

export default Part9;