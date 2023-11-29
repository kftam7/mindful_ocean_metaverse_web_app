import { useState } from "react";
import { Row, Col, Image, Button } from 'react-bootstrap';
import Router from 'next/router';
import ModalIsMobile from '../../components/modalIsMobile/ModalIsMobile';

const Part8 = ({ t }) => {
  const [show, setShow] = useState(false);

  const determine = () => {
    const isMobile = /Mobile/.test(navigator.userAgent);
    if (isMobile) {
      setShow(true);
    } else {
      Router.push({
        pathname: '/authentication',
      });
    }
  };

  return (
    <div class="part_box" id="mintpass">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Image src="/mintpass_512.gif" width="100%" />
            </Col>
            <Col lg={8} md={6} sm={12}>
              <div className='part_title2'>{t('home.part8.title1')}</div>
              <div className='part_text'>
                {t('home.part8.text1')}
              </div>
              <div className='part_btn'><Button variant="outline-primary" onClick={determine}>{t('button.submit')}</Button></div>
            </Col>
          </Row>
        </div>
      </div>
      <ModalIsMobile setShow={setShow} show={show} />
    </div>
  )
}

export default Part8;