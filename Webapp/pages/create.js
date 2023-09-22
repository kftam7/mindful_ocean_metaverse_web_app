import {Row, Col, Image, Container, Button, Card} from 'react-bootstrap';
import Script from 'next/script';
import Link from 'next/link';
import styles from '../styles/CreatePage.module.css';
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/SubpageLayout';
import DragDrop from '../components/DragDrop';
import { useTranslation } from '../i18n';


function CreatePage() {
    const { t } = useTranslation();
    var canvas = "";
    //cause when render from frontend, there is no browser
    if(typeof window !== "undefined") {
        canvas = window.localStorage.canvas;
    } 

    return(
        <Container className={styles.createPage}>
            <Row className='' ><Link href="/"><h6 style={{cursor: 'pointer'}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
            <Row className='mt-5 mb-3 text-center d-flex justify-content-center'>
                <h6>{t('page.create.createAndColor')}</h6>
                <a href='/whale.png' target="_blank" className={`${styles.downloadBtn}`} download>
                    <h5 className={styles.downBtnText} >{t('page.create.downloadTemplate')} <Image src="/downloadIcon.png" style={{width: '10%'}} /></h5>
                </a>
            </Row>
            <Row>
                <div className={styles.card} style={{ marginLeft: 'auto', marginRight: 'auto'}} >
                    <section className="attribution">
                        <p>{t('page.create.uploadYourArtwork')}</p>
                    </section> 
                    <model-viewer
                        id="previewModel"
                        src={process.env.ModelSrc}
                        poster={process.env.ModelPoster}
                        alt="A 3D model of an ocean animal"
                        shadow-intensity="1"
                        camera-controls
                        auto-rotate autoplay ar
                        ar-modes="webxr scene-viewer quick-look"
                       >
                    </model-viewer>
                    <DragDrop />
                </div>
            </Row>
            <Row className='text-center d-flex justify-content-center mt-4'>
                <h6>{t('page.create.ifYouAreHappyWithTheResult')}</h6>
            </Row>
            <Row className='d-flex justify-content-center mt-5'>
                <Button href='/authentication' className={`${homeStyles.btn} ${styles.overlayBtn}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>{t('button.submit')} &rarr;</Button>
            </Row>
            {/* <Col>
            <Image src={`${canvas}`} id="previewImg" fluid="true" />
            </Col> */}
            <Script type="text/javascript" charset="utf-8" src="/js/createPreview.js" />
            <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
            <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
        </Container>
    )
}

//per-page layout
CreatePage.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
}

export default CreatePage;