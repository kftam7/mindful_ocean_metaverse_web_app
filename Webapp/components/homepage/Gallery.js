import { Row, Button, Card, Col, Container, Image } from 'react-bootstrap';
import Script from 'next/script';
import Link from 'next/link';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Gallery.module.css';

import { data } from '../../data/data'
import GalleryModel from './GalleryModel';

//gallery section at home page, currently models are hardcoded
const Gallery = ({t}) => {

    return(
        <div className={styles.gallery} id="gallery">
            <Row className={styles.title}>
              <h3>{t('main.text.gallery')}</h3>
              <p className="mt-1">{t('main.text.mindfulOcean')}</p>
            </Row>
            <Row className={styles.galleryRow}>
              <Col style={{position:'relative'}}>
                <GalleryModel metadata={data[0].metadata} image={data[0].image} index="0" />
                <Image className={styles.bgpart6} src="/measuredBoxes/6.png" alt="Ocean6" />
              </Col>
              <Col>
              <GalleryModel metadata={data[1].metadata} image={data[1].image} index="1"/>
              </Col>
              <Col style={{position:'relative'}}>
              <GalleryModel metadata={data[2].metadata} image={data[2].image} index="2" />
                <div className={styles.imgDiv}>
                  <Image className={styles.bgpart7} src="/measuredBoxes/7.png" alt="Ocean7" />
                </div>
              </Col>
            </Row>
            <Row className={styles.btnRow}>
              <Button href="/gallery" className={`${styles.btn} ${homeStyles.btn}`}>{t('button.viewMore')} &rarr;</Button>
            </Row>
            <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
            <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
        </div>
    )
}

export default Gallery;