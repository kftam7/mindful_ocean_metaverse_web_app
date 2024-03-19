import { Row, Col, Button, Image, Container, Carousel } from 'react-bootstrap';
import styles from '../../styles/Intro.module.css';
import homeStyles from '../../styles/Home.module.css';

const Mindfultoken = ({ t }) => {

  return (
    <>
      <div class="Draw_draw">
        <div class="container">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <h3>{t('main.text.raiseFundsforMarineConservation')}</h3>
              <p class="mt-3">{t('main.text.raiseFundsforMarineConservationDes')}</p>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Carousel pauseOnHover={false}>           
                <Carousel.Item>
                    <Image src="/oceanImage_1.jpg" width="100%" />
                </Carousel.Item>
                <Carousel.Item>
                    <Image src="/oceanImage_2.jpg" width="100%" />
                </Carousel.Item>
                <Carousel.Item>
                    <Image src="/oceanImage_3.jpg" width="100%" />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </div>
      </div>

      <div class="Team_team">
        <div class="container">
          <div class="row">
            <div class="d-flex justify-content-center col-md-6 col-12">
              <Image src="/NFT_artist.svg" alt="artist" style={{ width: "75%" }} class="mt-3" />
            </div>
            <div class="d-flex justify-content-center col-md-6 col-12">
              <Image src="/sus_dev.svg" alt="sustainable development" style={{ width: "75%" }} class="" />
            </div>
          </div>
          <div class="mt-2 row">
            <h3 class="text-center">{t('main.text.signUpNowtoSaveOurOcean')}</h3>
            <p class="mt-2">{t('main.text.signUpNowtoSaveOurOceanDes')}</p>
          </div>
        </div>
        <div class="text-center">
          <a role="button" tabindex="0" href="https://docs.google.com/forms/d/e/1FAIpQLSeyhW-B2Y7PSvIv_zfCw825HZANkugQuJqXCut413fp_WpnwQ/viewform?usp=pp_url&amp;entry.835058185=I+would+like+to+participate+in+the+beta+tests+of+the+Mindful+Ocean+Metaverse+app&amp;entry.1065046570=I+would+like+to+receive+emails+about+the+project" target="_blank" class="btn btn-primary btn_default">{t('button.signUpNow')}</a></div>
      </div>
    </>
  )
}

export default Mindfultoken;