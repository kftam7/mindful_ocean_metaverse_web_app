import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import styles from '../../styles/Intro.module.css';
import homeStyles from '../../styles/Home.module.css';

const Intro = ({ t }) => {

  return (
    <>
      <div className={styles.intro} id="about">
        <Image className={styles.bgpart3} src="/measuredBoxes/3.png" alt="Ocean3" />
        <Image className={styles.bgpart4} src="/measuredBoxes/4.png" alt="Ocean4" />
        <Container className={styles.introText}>
          {/* <Row xs={12} md={8} lg={8}>
          <Col xs={12}><h3>{t('main.text.whatIsMindfulOcean')}</h3></Col>
          <Col xs={12} md={4} lg={4} xl={4} className="ms-1"><Button className={homeStyles.btn}>{t('button.whitePaper')}</Button></Col>
        </Row> */}
          <Row>
            <Col lg={8} md={9} sm={12}>
              <h3>{t('main.text.whatIsMindfulOcean')}</h3>
              <p className="mt-2">{t('main.text.whatIsMindfulOceanDes')}</p>
            </Col>
            <Col lg={4} md={3} sm={12} style={{ textAlign: 'center' }}>
              <Image className={styles.Intro_mintpass} src="/mintPass.gif" alt="mintpass" />
            </Col>
          </Row>
        </Container>
        {/* <Row className="mt-5">
        <Button href="/create" className={`${styles.btn} ${homeStyles.btn}`}>{t('button.preview')} &rarr;</Button>
      </Row> */}
        <div className={styles.imgDiv}>
          <Image className={styles.bgpart5} src="/measuredBoxes/5.png" alt="Ocean5" />
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
      </div>
    </>
  )
}

export default Intro;