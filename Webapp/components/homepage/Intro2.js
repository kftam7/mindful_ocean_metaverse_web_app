import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import styles from '../../styles/Intro.module.css';
import homeStyles from '../../styles/Home.module.css';

const Intro2 = ({ t }) => {

  return (
    <>
      <div className={styles.intro}>
        <Container className={styles.introText}>
          <Row xs={12} md={8} lg={8}>
            <Col xs={12}><h3>{t('main.text.NFTs')}</h3></Col>
          </Row>
          <Row>
            <Col lg={8} md={9} sm={12}>
              <p className="mt-2">{t('main.text.NFTsDes')}</p>
            </Col>
            <Col lg={4} md={3} sm={12} style={{ textAlign: 'center' }}>
              <Image className={styles.Intro_mintpass} src="/mintPass.gif" alt="mintpass" />
            </Col>
          </Row>
        </Container>
        <div className={styles.imgDiv}>
          <Image className={styles.bgpart5} src="/measuredBoxes/5.png" alt="Ocean5" />
        </div>
      </div>
      <div class="Draw_draw" id="mobileapp">
        <div class="container">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Image src="/revised_AI_artwork.svg" alt="mintpass" class="Draw_scarcity__KXsrK" width="100%" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <h3>{t('main.text.uncoverScarcityWithAI')}</h3>
              <p class="mt-3">{t('main.text.uncoverScarcityWithAIDes')}</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Intro2;